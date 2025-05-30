<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
  >
    <div
      class="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center"
    >
      <div class="w-full max-w-3xl">
        <div
          class="mb-8 relative w-full h-60 sm:h-80 flex justify-center overflow-hidden"
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <svg
              class="w-24 h-24 sm:w-32 sm:h-32 text-red-500 dark:text-red-600 heartbeat"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              />
            </svg>
          </div>

          <div class="absolute top-1/2 left-0 right-0 h-1 flex items-center">
            <div class="w-full h-px bg-gray-300 dark:bg-gray-700"></div>
            <svg
              class="absolute left-0 right-0 w-full h-20 text-indigo-600 dark:text-indigo-400 ecg-line"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 L100,100 L130,100 L140,85 L150,115 L160,100 L170,100 L240,100 L250,0 L260,200 L270,100 L300,100 L400,100 L430,100 L440,85 L450,115 L460,100 L470,100 L540,100 L550,0 L560,200 L570,100 L600,100 L700,100 L730,100 L740,85 L750,115 L760,100 L770,100 L840,100 L850,0 L860,200 L870,100 L900,100 L1000,100 L1030,100 L1040,85 L1050,115 L1060,100 L1070,100 L1140,100 L1150,0 L1160,200 L1170,100 L1200,100"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </div>

          <div class="absolute top-0 right-8 flex">
            <div
              class="bg-white dark:bg-gray-800 rounded-full w-20 h-20 sm:w-28 sm:h-28 border-4 border-red-500 flex items-center justify-center shadow-lg transform -rotate-12 opacity-90"
            >
              <span
                class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
                >4</span
              >
            </div>
            <div
              class="bg-white dark:bg-gray-800 rounded-full w-20 h-20 sm:w-28 sm:h-28 border-4 border-red-500 flex items-center justify-center shadow-lg transform rotate-12 -ml-3 opacity-90"
            >
              <span
                class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
                >0</span
              >
            </div>
            <div
              class="bg-white dark:bg-gray-800 rounded-full w-20 h-20 sm:w-28 sm:h-28 border-4 border-red-500 flex items-center justify-center shadow-lg transform -rotate-6 -ml-3 opacity-90"
            >
              <span
                class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
                >4</span
              >
            </div>
          </div>

          <div class="absolute bottom-4 left-8">
            <div class="relative w-16 h-16 sm:w-24 sm:h-24">
              <div
                class="absolute inset-0 bg-red-500 rounded-md transform rotate-45"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-3/5 h-1/4 bg-white rounded-md"></div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-1/4 h-3/5 bg-white rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h1
            class="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Сторінку не знайдено
          </h1>
          <p
            class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Схоже, що ви заблукали. Ми не змогли знайти сторінку, яку ви
            шукаєте.
          </p>
          <div
            class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-8"
          >
            <div class="flex gap-2 items-center mb-3">
              <div
                class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Діагноз
              </h2>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-2 italic">
              "Гострий синдром загубленої сторінки 404, без ускладнень"
            </p>
            <div
              class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"
            >
              <p class="text-gray-700 dark:text-gray-300 text-sm font-medium">
                Рекомендоване лікування:
              </p>
              <p class="text-gray-700 dark:text-gray-300 text-sm">
                Повернення на головну сторінку або перевірка введеної адреси.
              </p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                />
              </svg>
              На головну
            </router-link>
            <router-link
              to="/guide"
              class="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Навчальні матеріали
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.15);
  }
  70% {
    transform: scale(1);
  }
}

.ecg-line {
  animation: ecg 5s linear infinite;
}

@keyframes ecg {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
  
  <script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.title = "404 - Сторінку не знайдено | Rescuers.life";
});
</script>