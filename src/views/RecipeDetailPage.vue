<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-orange-600">🍳 Recipe Finder</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">{{ user?.nickname || user?.email }}</span>
            <button
              @click="goHome"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              홈으로
            </button>
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
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">레시피를 불러오는 중...</p>
    </div>

    <div v-else-if="recipe" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 레시피 헤더 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="h-64 bg-gray-200 flex items-center justify-center">
          <img
            v-if="recipe.image_url"
            :src="recipe.image_url"
            :alt="recipe.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-400 text-6xl">🍳</div>
        </div>
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ recipe.title }}</h1>
          <p class="text-gray-600 text-lg mb-4">{{ recipe.description }}</p>
          <div class="flex flex-wrap gap-4 text-sm">
            <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">{{ recipe.category }}</span>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{{ recipe.difficulty }}</span>
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">{{ recipe.cooking_time }}</span>
          </div>
        </div>
      </div>

      <!-- 재료 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">📋 재료</h2>
        <ul class="space-y-2">
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient"
            class="flex items-center"
          >
            <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            <span class="text-gray-700">{{ ingredient }}</span>
          </li>
        </ul>
      </div>

      <!-- 조리법 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">👨‍🍳 조리법</h2>
        <ol class="space-y-4">
          <li
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            class="flex"
          >
            <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">{{ index + 1 }}</span>
            <span class="text-gray-700">{{ instruction }}</span>
          </li>
        </ol>
      </div>

      <!-- 팁 -->
      <div v-if="recipe.tips" class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">💡 팁</h2>
        <p class="text-gray-700">{{ recipe.tips }}</p>
      </div>

      <!-- 영양정보 -->
      <div v-if="recipe.nutrition" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">📊 영양정보</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(value, key) in recipe.nutrition"
            :key="key"
            class="text-center"
          >
            <div class="text-2xl font-bold text-orange-600">{{ value }}</div>
            <div class="text-gray-600 capitalize">{{ key }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">레시피를 찾을 수 없습니다.</p>
    </div>
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
const recipe = ref(null)
const loading = ref(true)

const goHome = () => {
  router.push('/home')
}

const handleLogout = async () => {
  await authStore.signOut()
  router.push('/')
}

onMounted(async () => {
  const recipeId = route.params.id
  recipe.value = await recipeStore.fetchRecipeById(recipeId)
  loading.value = false
})
</script> 