import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)

  // 현재 사용자 가져오기
  const getCurrentUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
      return currentUser
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error)
      return null
    }
  }

  // 로그인
  const signIn = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      user.value = data.user
      return { success: true, user: data.user }
    } catch (error) {
      console.error('로그인 실패:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // 회원가입
  const signUp = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (error) throw error
      
      user.value = data.user
      return { success: true, user: data.user }
    } catch (error) {
      console.error('회원가입 실패:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      user.value = null
      return { success: true }
    } catch (error) {
      console.error('로그아웃 실패:', error)
      return { success: false, error: error.message }
    }
  }

  // 인증 상태 변경 감지
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null
  })

  return {
    user,
    loading,
    getCurrentUser,
    signIn,
    signUp,
    signOut
  }
}) 