<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
    <div class="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold mb-6 text-orange-600 text-center">레시피 등록</h2>
      <form @submit.prevent="handleUpload">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="form.title" placeholder="레시피명" class="input" required />
          <input v-model="form.category" placeholder="카테고리" class="input" />
          <input v-model="form.difficulty" placeholder="난이도" class="input" />
          <input v-model="form.cooking_time" placeholder="조리시간" class="input" />
        </div>
        <textarea v-model="form.description" placeholder="설명" class="input mt-2" required />
        <textarea v-model="form.ingredients" placeholder="재료 (쉼표로 구분)" class="input mt-2" />
        <textarea v-model="form.instructions" placeholder="조리법 (쉼표로 구분)" class="input mt-2" />
        <input v-model="form.tips" placeholder="팁" class="input mt-2" />
        <input v-model="form.nutrition" placeholder="영양정보 (JSON 형식)" class="input mt-2" />
        <button type="submit" class="btn bg-orange-500 text-white px-4 py-2 rounded-md mt-4 w-full">등록하기</button>
      </form>
      <div v-if="uploadMessage" class="mt-4 text-center text-green-600">{{ uploadMessage }}</div>
      <button v-if="uploadMessage" @click="goHome" class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">홈으로 이동</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'

const router = useRouter()
const recipeStore = useRecipeStore()

const uploadMessage = ref('')
const form = ref({
  title: '',
  description: '',
  category: '',
  difficulty: '',
  cooking_time: '',
  ingredients: '',
  instructions: '',
  tips: '',
  nutrition: ''
})

const handleUpload = async () => {
  const recipe = {
    title: form.value.title,
    description: form.value.description,
    category: form.value.category,
    difficulty: form.value.difficulty,
    cooking_time: form.value.cooking_time,
    ingredients: form.value.ingredients ? form.value.ingredients.split(',').map(s => s.trim()) : [],
    instructions: form.value.instructions ? form.value.instructions.split(',').map(s => s.trim()) : [],
    tips: form.value.tips,
    nutrition: form.value.nutrition ? JSON.parse(form.value.nutrition) : null,
    image_url: null
  }
  const result = await recipeStore.addRecipe(recipe)
  if (result.success) {
    uploadMessage.value = '레시피가 성공적으로 등록되었습니다!'
    form.value = { title: '', description: '', category: '', difficulty: '', cooking_time: '', ingredients: '', instructions: '', tips: '', nutrition: '' }
  } else {
    uploadMessage.value = '등록 실패: ' + result.message
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500;
}
.btn {
  @apply font-bold;
}
</style> 