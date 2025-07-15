<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="text-gray-600 hover:text-gray-900"
            >
              ← 뒤로가기
            </button>
            <h1 class="text-2xl font-bold text-orange-600">🍳 Recipe Finder</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">{{ user?.nickname || user?.email }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 레시피 상세 내용 -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">레시피를 불러오는 중...</p>
      </div>

      <div v-else-if="!recipe" class="text-center py-12">
        <p class="text-gray-600 text-lg">레시피를 찾을 수 없습니다.</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- 레시피 이미지 -->
        <div class="h-64 md:h-96 bg-gray-200 flex items-center justify-center">
          <img
            v-if="recipe.image_url"
            :src="recipe.image_url"
            :alt="recipe.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-400 text-6xl">🍳</div>
        </div>

        <!-- 레시피 정보 -->
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ recipe.title }}</h1>
          
          <!-- 메타 정보 -->
          <div class="flex flex-wrap gap-4 mb-6">
            <div class="flex items-center space-x-2">
              <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ recipe.category }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ recipe.difficulty }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ recipe.cooking_time }}
              </span>
            </div>
          </div>

          <!-- 설명 -->
          <div v-if="recipe.description" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">레시피 소개</h3>
            <p class="text-gray-600">{{ recipe.description }}</p>
          </div>

          <!-- 재료 -->
          <div v-if="recipe.ingredients" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">재료</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <ul class="space-y-2">
                <li
                  v-for="(ingredient, index) in recipe.ingredients"
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span class="text-gray-700">{{ ingredient }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 조리 방법 -->
          <div v-if="recipe.instructions" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">조리 방법</h3>
            <div class="space-y-4">
              <div
                v-for="(instruction, index) in recipe.instructions"
                :key="index"
                class="flex space-x-4"
              >
                <div class="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <p class="text-gray-700">{{ instruction }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 팁 -->
          <div v-if="recipe.tips" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">조리 팁</h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p class="text-gray-700">{{ recipe.tips }}</p>
            </div>
          </div>

          <!-- 영양 정보 -->
          <div v-if="recipe.nutrition" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">영양 정보</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="(value, key) in recipe.nutrition"
                :key="key"
                class="text-center p-3 bg-gray-50 rounded-lg"
              >
                <div class="text-sm text-gray-600 capitalize">{{ key }}</div>
                <div class="text-lg font-semibold text-gray-900">{{ value }}</div>
              </div>
            </div>
          </div>

          <!-- 작성일 -->
          <div class="text-sm text-gray-500 border-t pt-4">
            작성일: {{ formatDate(recipe.created_at) }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRecipeStore } from '../stores/recipes'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const recipeStore = useRecipeStore()

const user = computed(() => authStore.user)
const loading = ref(false)
const recipe = ref(null)

const fetchRecipe = async () => {
  loading.value = true
  try {
    const recipeData = await recipeStore.fetchRecipeById(route.params.id)
    recipe.value = recipeData
  } catch (error) {
    console.error('레시피 가져오기 실패:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const goBack = () => {
  router.back()
}

const handleLogout = async () => {
  await authStore.signOut()
  router.push('/')
}

onMounted(() => {
  fetchRecipe()
})
</script> 