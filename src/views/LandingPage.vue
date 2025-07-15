<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-orange-600">🍳 Recipe Finder</h1>
          </div>
          <div class="flex space-x-4">
            <router-link
              to="/login"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              로그인
            </router-link>
            <router-link
              to="/register"
              class="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              회원가입
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- 히어로 섹션 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          맛있는 레시피를
          <span class="text-orange-600">찾아보세요</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          다양한 요리 레시피를 검색하고, 필터링하여 원하는 요리를 쉽게 찾을 수 있습니다.
          간단한 재료부터 복잡한 요리까지, 모든 레시피가 여러분을 기다리고 있어요.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            지금 시작하기
          </router-link>
          <router-link
            to="/login"
            class="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            로그인하기
          </router-link>
        </div>
      </div>

      <!-- 특징 섹션 -->
      <div class="mt-24 grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">스마트 검색</h3>
          <p class="text-gray-600">제목, 재료, 카테고리별로 원하는 레시피를 쉽게 찾을 수 있습니다.</p>
        </div>
        
        <div class="text-center">
          <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">상세 정보</h3>
          <p class="text-gray-600">각 레시피의 상세한 조리법과 재료 정보를 확인할 수 있습니다.</p>
        </div>
        
        <div class="text-center">
          <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">필터링</h3>
          <p class="text-gray-600">난이도, 조리시간, 카테고리별로 레시피를 필터링할 수 있습니다.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 컴포넌트 로직
</script>

<style scoped>
/* 추가 스타일 */
</style> 