<script setup>
// 라우터가 모든 페이지를 처리합니다
</script>

<template>
  <router-view />
</template>

<style>
/* 전역 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Tailwind CSS 스타일을 위한 기본 클래스들 */
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-orange-50 {
  --tw-gradient-from: #fff7ed;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 247, 237, 0));
}

.to-red-50 {
  --tw-gradient-to: #fef2f2;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-orange-400 {
  --tw-gradient-from: #fb923c;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(251, 146, 60, 0));
}

.to-red-500 {
  --tw-gradient-to: #ef4444;
}

/* 추가 유틸리티 클래스들 */
.max-w-7xl {
  max-width: 80rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-bold {
  font-weight: 700;
}

.text-orange-600 {
  color: #ea580c;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.bg-orange-600 {
  background-color: #ea580c;
}

.text-white {
  color: #ffffff;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.hover\:bg-orange-700:hover {
  background-color: #c2410c;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.border {
  border-width: 1px;
}

.border-orange-600 {
  border-color: #ea580c;
}

.hover\:bg-orange-50:hover {
  background-color: #fff7ed;
}

/* 반응형 클래스들 */
@media (min-width: 640px) {
  .sm\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
