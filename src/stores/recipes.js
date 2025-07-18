import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref([])
  const loading = ref(false)
  const filters = ref({
    search: '',
    category: '',
    difficulty: '',
    cookingTime: ''
  })

  // 모든 레시피 가져오기
  const fetchRecipes = async () => {
    loading.value = true
    try {
      let query = supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })

      // 검색 필터 적용
      if (filters.value.search) {
        query = query.ilike('title', `%${filters.value.search}%`)
      }
      
      if (filters.value.category) {
        query = query.eq('category', filters.value.category)
      }
      
      if (filters.value.difficulty) {
        query = query.eq('difficulty', filters.value.difficulty)
      }
      
      if (filters.value.cookingTime) {
        query = query.eq('cooking_time', filters.value.cookingTime)
      }

      const { data, error } = await query
      
      if (error) throw error
      
      recipes.value = data || []
      return data
    } catch (error) {
      console.error('레시피 가져오기 실패:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // 단일 레시피 가져오기
  const fetchRecipeById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('레시피 상세 정보 가져오기 실패:', error)
      return null
    }
  }

  // 레시피 추가
  const addRecipe = async (recipe) => {
    try {
      const { error } = await supabase.from('recipes').insert([recipe])
      if (error) throw error
      // 업로드 후 목록 갱신
      await fetchRecipes()
      return { success: true }
    } catch (error) {
      console.error('레시피 업로드 실패:', error)
      return { success: false, message: error.message }
    }
  }

  // 필터 업데이트
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchRecipes()
  }

  // 필터 초기화
  const clearFilters = () => {
    filters.value = {
      search: '',
      category: '',
      difficulty: '',
      cookingTime: ''
    }
    fetchRecipes()
  }

  return {
    recipes,
    loading,
    filters,
    fetchRecipes,
    fetchRecipeById,
    updateFilters,
    clearFilters,
    addRecipe
  }
}) 