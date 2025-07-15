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
            <span class="text-gray-600">{{ user?.email }}</span>
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

    <!-- 히어로 섹션 -->
    <section class="bg-gradient-to-r from-orange-400 to-red-500 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-6xl font-bold mb-6">
          맛있는 레시피를 발견하세요
        </h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          다양한 요리 레시피를 검색하고, 필터링하여 원하는 요리를 쉽게 찾을 수 있습니다.
          간단한 재료부터 복잡한 요리까지, 모든 레시피가 여러분을 기다리고 있어요.
        </p>
      </div>
    </section>

    <!-- 레시피 검색 섹션 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 검색 필터 -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">레시피 검색</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- 검색어 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">검색어</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="레시피 제목 검색..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                @input="handleSearch"
              />
            </div>
            
            <!-- 카테고리 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                v-model="selectedCategory"
                @change="handleSearch"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">전체</option>
                <option value="한식">한식</option>
                <option value="양식">양식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="디저트">디저트</option>
                <option value="음료">음료</option>
              </select>
            </div>
            
            <!-- 난이도 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">난이도</label>
              <select
                v-model="selectedDifficulty"
                @change="handleSearch"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">전체</option>
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
              </select>
            </div>
            
            <!-- 조리시간 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">조리시간</label>
              <select
                v-model="selectedCookingTime"
                @change="handleSearch"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">전체</option>
                <option value="15분 이하">15분 이하</option>
                <option value="15-30분">15-30분</option>
                <option value="30-60분">30-60분</option>
                <option value="60분 이상">60분 이상</option>
              </select>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <button
              @click="clearFilters"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        </div>

        <!-- 레시피 목록 -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">레시피를 불러오는 중...</p>
        </div>

        <div v-else-if="recipes.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">검색 결과가 없습니다.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="recipe in recipes"
            :key="recipe.id"
            @click="viewRecipe(recipe.id)"
            class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <img
                v-if="recipe.image_url"
                :src="recipe.image_url"
                :alt="recipe.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-gray-400 text-4xl">🍳</div>
            </div>
            <div class="p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ recipe.title }}</h4>
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>{{ recipe.category }}</span>
                <span>{{ recipe.difficulty }}</span>
              </div>
              <div class="mt-2 text-sm text-gray-500">
                조리시간: {{ recipe.cooking_time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 컨택트 섹션 -->
    <section class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-3xl font-bold mb-8">연락처</h3>
          <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h4 class="text-xl font-semibold mb-4">📧 이메일</h4>
              <p class="text-gray-300">recipe.finder@example.com</p>
            </div>
            <div>
              <h4 class="text-xl font-semibold mb-4">📱 연락처</h4>
              <p class="text-gray-300">010-1234-5678</p>
            </div>
          </div>
          <div class="mt-8 text-gray-400">
            <p>문의사항이나 제안사항이 있으시면 언제든 연락주세요!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRecipeStore } from '../stores/recipes'

const router = useRouter()
const authStore = useAuthStore()
const recipeStore = useRecipeStore()

const user = computed(() => authStore.user)
const recipes = computed(() => recipeStore.recipes)
const loading = computed(() => recipeStore.loading)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDifficulty = ref('')
const selectedCookingTime = ref('')

const handleSearch = () => {
  recipeStore.updateFilters({
    search: searchQuery.value,
    category: selectedCategory.value,
    difficulty: selectedDifficulty.value,
    cookingTime: selectedCookingTime.value
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDifficulty.value = ''
  selectedCookingTime.value = ''
  recipeStore.clearFilters()
}

const viewRecipe = (recipeId) => {
  router.push(`/recipe/${recipeId}`)
}

const handleLogout = async () => {
  await authStore.signOut()
  router.push('/')
}

onMounted(() => {
  recipeStore.fetchRecipes()
})
</script> 