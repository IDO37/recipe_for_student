<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-2xl font-bold text-orange-600">🍳 Admin Dashboard</h1>
          <router-link to="/home" class="text-orange-600 hover:underline">메인으로</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 대시보드 섹션 -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">대시보드</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-3xl font-bold text-orange-600">{{ recipeCount }}</div>
            <div class="text-gray-600 mt-2">전체 레시피 수</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-3xl font-bold text-orange-600">{{ userCount }}</div>
            <div class="text-gray-600 mt-2">전체 회원 수</div>
          </div>
        </div>
        <!-- 카테고리별 레시피 분포 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-2">카테고리별 레시피 분포</h3>
          <div v-for="(count, cat) in categoryStats" :key="cat" class="flex items-center mb-1">
            <span class="w-24">{{ cat }}</span>
            <div class="bg-orange-200 h-4 rounded mr-2" :style="{ width: (count * 20) + 'px' }"></div>
            <span>{{ count }}개</span>
          </div>
        </div>
        <!-- 최근 7일 회원/레시피 증가 추이 -->
        <div>
          <h3 class="text-lg font-semibold mb-2">최근 7일 회원/레시피 증가</h3>
          <div class="flex flex-col md:flex-row gap-8">
            <div>
              <div class="font-bold mb-1">회원</div>
              <div v-for="(v, i) in userTrend" :key="i" class="flex items-center mb-1">
                <span class="w-16 text-xs">{{ v.date }}</span>
                <div class="bg-blue-300 h-3 rounded mr-2" :style="{ width: (v.count * 20) + 'px' }"></div>
                <span class="text-xs">+{{ v.count }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold mb-1">레시피</div>
              <div v-for="(v, i) in recipeTrend" :key="i" class="flex items-center mb-1">
                <span class="w-16 text-xs">{{ v.date }}</span>
                <div class="bg-green-300 h-3 rounded mr-2" :style="{ width: (v.count * 20) + 'px' }"></div>
                <span class="text-xs">+{{ v.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 레시피 관리 섹션 -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">레시피 관리</h2>
        <div class="mb-4 flex gap-2">
          <input v-model="recipeSearch" type="text" placeholder="제목, 카테고리, 난이도 검색" class="border rounded px-3 py-2 w-64" />
        </div>
        <div v-if="filteredRecipes.length === 0" class="text-gray-500">등록된 레시피가 없습니다.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th class="px-4 py-2">제목</th>
                <th class="px-4 py-2">카테고리</th>
                <th class="px-4 py-2">난이도</th>
                <th class="px-4 py-2">작성일</th>
                <th class="px-4 py-2">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in filteredRecipes" :key="recipe.id">
                <td class="border px-4 py-2">{{ recipe.title }}</td>
                <td class="border px-4 py-2">{{ recipe.category }}</td>
                <td class="border px-4 py-2">{{ recipe.difficulty }}</td>
                <td class="border px-4 py-2">{{ formatDate(recipe.created_at) }}</td>
                <td class="border px-4 py-2">
                  <button @click="openRecipeEdit(recipe)" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">수정</button>
                  <button @click="deleteRecipe(recipe.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 회원 목록 섹션 -->
      <section>
        <h2 class="text-2xl font-bold mb-4">회원 목록</h2>
        <div class="mb-4 flex gap-2">
          <input v-model="userSearch" type="text" placeholder="이메일, 닉네임 검색" class="border rounded px-3 py-2 w-64" />
        </div>
        <div v-if="filteredUsers.length === 0" class="text-gray-500">등록된 회원이 없습니다.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th class="px-4 py-2">이메일</th>
                <th class="px-4 py-2">닉네임</th>
                <th class="px-4 py-2">가입일</th>
                <th class="px-4 py-2">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="border px-4 py-2">{{ user.email }}</td>
                <td class="border px-4 py-2">{{ user.nickname }}</td>
                <td class="border px-4 py-2">{{ formatDate(user.created_at) }}</td>
                <td class="border px-4 py-2">
                  <button @click="openUserEdit(user)" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">상세/수정</button>
                  <button @click="deleteUser(user.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>

  <!-- 회원 상세/수정 모달 -->
  <template v-if="showUserEditModal">
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">회원 정보 수정</h3>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">이메일</label>
          <input type="text" class="w-full border rounded px-3 py-2 bg-gray-100" :value="editingUser.email" disabled />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">닉네임</label>
          <input type="text" class="w-full border rounded px-3 py-2" v-model="editingUser.nickname" />
        </div>
        <div class="flex justify-end gap-2">
          <button @click="closeUserEdit" class="px-4 py-2 bg-gray-300 rounded">취소</button>
          <button @click="saveUserEdit" class="px-4 py-2 bg-blue-600 text-white rounded">저장</button>
        </div>
      </div>
    </div>
  </template>

  <!-- 레시피 수정 모달 -->
  <template v-if="showRecipeEditModal">
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">레시피 정보 수정</h3>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">제목</label>
          <input type="text" class="w-full border rounded px-3 py-2" v-model="editingRecipe.title" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">카테고리</label>
          <input type="text" class="w-full border rounded px-3 py-2" v-model="editingRecipe.category" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">난이도</label>
          <input type="text" class="w-full border rounded px-3 py-2" v-model="editingRecipe.difficulty" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">조리시간</label>
          <input type="text" class="w-full border rounded px-3 py-2" v-model="editingRecipe.cooking_time" />
        </div>
        <div class="flex justify-end gap-2">
          <button @click="closeRecipeEdit" class="px-4 py-2 bg-gray-300 rounded">취소</button>
          <button @click="saveRecipeEdit" class="px-4 py-2 bg-blue-600 text-white rounded">저장</button>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const recipes = ref([])
const users = ref([])
const recipeCount = ref(0)
const userCount = ref(0)

// 회원 상세/수정 모달 관련
const editingUser = ref(null)
const showUserEditModal = ref(false)

const openUserEdit = (user) => {
  editingUser.value = { ...user }
  showUserEditModal.value = true
}
const closeUserEdit = () => {
  showUserEditModal.value = false
  editingUser.value = null
}
const saveUserEdit = async () => {
  if (!editingUser.value) return
  // 닉네임만 수정 가능
  const { error } = await supabase.from('profiles').update({ nickname: editingUser.value.nickname }).eq('id', editingUser.value.id)
  if (!error) {
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) users.value[idx].nickname = editingUser.value.nickname
    alert('수정되었습니다.')
    closeUserEdit()
  } else {
    alert('수정 실패: ' + error.message)
  }
}

// 레시피 수정 모달 관련
const editingRecipe = ref(null)
const showRecipeEditModal = ref(false)

const openRecipeEdit = (recipe) => {
  editingRecipe.value = { ...recipe }
  showRecipeEditModal.value = true
}
const closeRecipeEdit = () => {
  showRecipeEditModal.value = false
  editingRecipe.value = null
}
const saveRecipeEdit = async () => {
  if (!editingRecipe.value) return
  const { id, title, category, difficulty, cooking_time } = editingRecipe.value
  const { error } = await supabase.from('recipes').update({ title, category, difficulty, cooking_time }).eq('id', id)
  if (!error) {
    const idx = recipes.value.findIndex(r => r.id === id)
    if (idx !== -1) Object.assign(recipes.value[idx], { title, category, difficulty, cooking_time })
    alert('수정되었습니다.')
    closeRecipeEdit()
  } else {
    alert('수정 실패: ' + error.message)
  }
}

const fetchRecipes = async () => {
  const { data, error } = await supabase.from('recipes').select('*').order('created_at', { ascending: false })
  if (!error) {
    recipes.value = data
    recipeCount.value = data.length
  }
}

const deleteRecipe = async (id) => {
  if (!confirm('정말로 이 레시피를 삭제하시겠습니까?')) return
  const { error } = await supabase.from('recipes').delete().eq('id', id)
  if (!error) {
    recipes.value = recipes.value.filter(r => r.id !== id)
    recipeCount.value--
    alert('삭제되었습니다.')
  } else {
    alert('삭제 실패: ' + error.message)
  }
}

const fetchUsers = async () => {
  // 회원 목록: auth.users와 profiles 조인
  const { data, error } = await supabase
    .from('profiles')
    .select('id, nickname, auth_users:auth.users(email, created_at)')
  if (!error && data) {
    users.value = data.map(u => ({
      id: u.id,
      nickname: u.nickname,
      email: u.auth_users?.email || '',
      created_at: u.auth_users?.created_at || ''
    }))
    userCount.value = users.value.length
  }
}

const deleteUser = async (userId) => {
  if (!confirm('정말로 이 회원을 삭제하시겠습니까?\n(프로필, 레시피도 함께 삭제됩니다)')) return
  // 1. 레시피 삭제
  await supabase.from('recipes').delete().eq('user_id', userId)
  // 2. 프로필 삭제
  await supabase.from('profiles').delete().eq('id', userId)
  // 3. auth.users 삭제 (서버리스 함수 필요, 여기선 안내만)
  alert('auth.users 삭제는 Supabase Admin API 또는 서버리스 함수로 처리해야 합니다.')
  users.value = users.value.filter(u => u.id !== userId)
  userCount.value--
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const categoryStats = ref({})
const userTrend = ref([])
const recipeTrend = ref([])

const fetchCategoryStats = () => {
  const stats = {}
  for (const r of recipes.value) {
    stats[r.category] = (stats[r.category] || 0) + 1
  }
  categoryStats.value = stats
}

const fetchTrends = () => {
  // 최근 7일 날짜 배열
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(5, 10)
  })
  // 회원
  const userCounts = days.map(date => users.value.filter(u => u.created_at && u.created_at.slice(5, 10) === date).length)
  userTrend.value = days.map((date, i) => ({ date, count: userCounts[i] }))
  // 레시피
  const recipeCounts = days.map(date => recipes.value.filter(r => r.created_at && r.created_at.slice(5, 10) === date).length)
  recipeTrend.value = days.map((date, i) => ({ date, count: recipeCounts[i] }))
}

const recipeSearch = ref('')
const userSearch = ref('')

const filteredRecipes = computed(() => {
  if (!recipeSearch.value) return recipes.value
  const q = recipeSearch.value.toLowerCase()
  return recipes.value.filter(r =>
    (r.title && r.title.toLowerCase().includes(q)) ||
    (r.category && r.category.toLowerCase().includes(q)) ||
    (r.difficulty && r.difficulty.toLowerCase().includes(q))
  )
})
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const q = userSearch.value.toLowerCase()
  return users.value.filter(u =>
    (u.email && u.email.toLowerCase().includes(q)) ||
    (u.nickname && u.nickname.toLowerCase().includes(q))
  )
})

onMounted(() => {
  fetchRecipes()
  fetchUsers()
  // 통계는 데이터 로드 후 watch로 갱신
})
import { watch } from 'vue'
watch([recipes, users], () => {
  fetchCategoryStats()
  fetchTrends()
})
</script> 