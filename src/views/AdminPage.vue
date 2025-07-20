<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-orange-600">🍳 Recipe Finder - 관리자</h1>
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

    <!-- 관리자 대시보드 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">관리자 대시보드</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">총 레시피 수</h3>
            <p class="text-3xl font-bold text-blue-600">{{ recipes.length }}</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-green-900 mb-2">총 사용자 수</h3>
            <p class="text-3xl font-bold text-green-600">{{ userCount }}</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-purple-900 mb-2">시스템 상태</h3>
            <p class="text-3xl font-bold text-purple-600">정상</p>
          </div>
        </div>

        <!-- 레시피 관리 -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">레시피 관리</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">난이도</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="recipe in recipes" :key="recipe.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ recipe.title }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      {{ recipe.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ recipe.difficulty }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ new Date(recipe.created_at).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="viewRecipe(recipe.id)"
                      class="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      보기
                    </button>
                    <button
                      @click="deleteRecipe(recipe.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 시스템 설정 -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">시스템 설정</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              데이터베이스 백업
            </button>
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              캐시 초기화
            </button>
            <button class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              로그 확인
            </button>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              시스템 정보
            </button>
          </div>
        </div>
      </div>
    </div>
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
const userCount = ref(0) // 실제로는 사용자 수를 가져와야 함

const goHome = () => {
  router.push('/home')
}

const handleLogout = async () => {
  await authStore.signOut()
  router.push('/')
}

const viewRecipe = (recipeId) => {
  router.push(`/recipe/${recipeId}`)
}

const deleteRecipe = async (recipeId) => {
  if (confirm('정말로 이 레시피를 삭제하시겠습니까?')) {
    // 삭제 로직 구현
    console.log('레시피 삭제:', recipeId)
  }
}

onMounted(() => {
  recipeStore.fetchRecipes()
})
</script> 