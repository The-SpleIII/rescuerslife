<template>
  <div>
    <header
      class="sticky top-0 z-[9999] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-indigo-100 dark:border-indigo-900 shadow-sm"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/">
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="bgGradient" cx="0.3" cy="0.3">
                      <stop offset="0%" stop-color="#6366f1" />
                      <stop offset="100%" stop-color="#3730a3" />
                    </radialGradient>
                    <linearGradient
                      id="crossGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#ffffff" />
                      <stop offset="100%" stop-color="#f1f2f6" />
                    </linearGradient>
                    <filter
                      id="shadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <dropShadow
                        dx="1"
                        dy="1"
                        stdDeviation="1"
                        flood-color="#000000"
                        flood-opacity="0.3"
                      />
                    </filter>
                  </defs>

                  <circle
                    cx="16"
                    cy="16"
                    r="15"
                    fill="url(#bgGradient)"
                    filter="url(#shadow)"
                  />

                  <g fill="url(#crossGradient)">
                    <rect x="13" y="8" width="6" height="16" rx="1" />

                    <rect x="8" y="13" width="16" height="6" rx="1" />
                  </g>

                  <g transform="translate(22, 9) scale(0.4)">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="#60a5fa"
                      opacity="0.8"
                    />
                  </g>

                  <g
                    opacity="0.6"
                    stroke="#fff"
                    stroke-width="1.5"
                    fill="none"
                    transform="translate(4, 26)"
                  >
                    <path
                      d="M0 0 L3 0 L4 -3 L6 3 L8 -2 L10 0 L24 0"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </div>

              <div class="hidden sm:block">
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                  <span class="text-indigo-600 dark:text-indigo-400"
                    >Rescuers.life</span
                  >
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Ваш медичний асистент
                </p>
              </div>

              <div class="sm:hidden">
                <h1 class="text-lg font-bold text-gray-900 dark:text-white">
                  <span class="text-indigo-600 dark:text-indigo-400"
                    >Rescuers</span
                  >
                </h1>
              </div>
            </div>
          </router-link>

          <nav class="hidden lg:block">
            <div class="flex justify-center items-center gap-8 xl:gap-12">
              <router-link
                class="relative flex flex-col items-center group text-base xl:text-lg font-medium transition-all duration-300"
                to="/guide"
                v-slot="{ isActive }"
              >
                <div class="flex items-center gap-2 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
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
                  <span
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
                    class="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 whitespace-nowrap"
                    >Навчальні матеріали</span
                  >
                </div>
                <div
                  :class="
                    isActive
                      ? 'w-full bg-indigo-600 dark:bg-indigo-500'
                      : 'w-0 bg-transparent group-hover:w-full group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500'
                  "
                  class="h-0.5 rounded-full absolute -bottom-2 transition-all duration-300 ease-out"
                ></div>
              </router-link>

              <div class="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

              <router-link
                class="relative flex flex-col items-center group text-base xl:text-lg font-medium transition-all duration-300"
                to="/test"
                v-slot="{ isActive }"
              >
                <div class="flex items-center gap-2 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  <span
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
                    class="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 whitespace-nowrap"
                    >Перевірка знань</span
                  >
                </div>
                <div
                  :class="
                    isActive
                      ? 'w-full bg-indigo-600 dark:bg-indigo-500'
                      : 'w-0 bg-transparent group-hover:w-full group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500'
                  "
                  class="h-0.5 rounded-full absolute -bottom-2 transition-all duration-300 ease-out"
                ></div>
              </router-link>

              <div class="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

              <router-link
                class="relative flex flex-col items-center group text-base xl:text-lg font-medium transition-all duration-300"
                to="/map"
                v-slot="{ isActive }"
              >
                <div class="flex items-center gap-2 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span
                    :class="
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300'
                    "
                    class="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 whitespace-nowrap"
                    >Карта допомоги</span
                  >
                </div>
                <div
                  :class="
                    isActive
                      ? 'w-full bg-indigo-600 dark:bg-indigo-500'
                      : 'w-0 bg-transparent group-hover:w-full group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500'
                  "
                  class="h-0.5 rounded-full absolute -bottom-2 transition-all duration-300 ease-out"
                ></div>
              </router-link>
            </div>
          </nav>

          <div class="flex items-center gap-2">
            <button
              @click="toggleTheme"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                v-if="isDarkMode"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>

            <button
              @click.stop="toggleMobileMenu"
              class="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                v-if="!isMobileMenuOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <nav
          :class="
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          "
          class="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div class="pt-4 pb-2 space-y-1">
            <router-link
              to="/guide"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              v-slot="{ isActive }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                "
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
              <span
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300'
                "
              >
                Навчальні матеріали
              </span>
              <div
                v-if="isActive"
                class="ml-auto w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
              ></div>
            </router-link>

            <router-link
              to="/test"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              v-slot="{ isActive }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300'
                "
              >
                Перевірка знань
              </span>
              <div
                v-if="isActive"
                class="ml-auto w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
              ></div>
            </router-link>

            <router-link
              to="/map"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              v-slot="{ isActive }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span
                :class="
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300'
                "
              >
                Карта допомоги
              </span>
              <div
                v-if="isActive"
                class="ml-auto w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
              ></div>
            </router-link>
          </div>
        </nav>
      </div>
    </header>
    <router-view />

    <teleport to="body">
      <div
        v-if="activeRequest"
        class="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 px-4"
        @click="dismissNotification"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
          @click.stop
        >
          <div class="flex items-center justify-between mb-4">
            <h3
              class="text-xl font-bold text-gray-900 dark:text-white flex items-center"
            >
              <span
                class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 mr-2"
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
                    d="M12 9v2m0 4h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              Потрібна допомога!
            </h3>
            <button
              @click="dismissNotification"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{
              activeRequest.message ||
              "Хтось потребує першої медичної допомоги поблизу!"
            }}
          </p>

          <div class="mb-4 h-40 rounded-lg overflow-hidden">
            <div ref="notificationMapContainer" class="w-full h-full"></div>
          </div>

          <div class="flex space-x-3">
            <button
              @click="navigateToRequest(activeRequest)"
              class="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"
                />
              </svg>
              Допомогти
            </button>
            <button
              @click="dismissNotification"
              class="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from "vue";
import { database } from "./firebase";
import {
  ref as dbRef,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function handleClickOutside(event) {
  if (!event.target.closest("nav") && !event.target.closest("button")) {
    isMobileMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const isDarkMode = ref(
  localStorage.getItem("darkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value);

  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

const notificationMapContainer = ref(null);
const notificationMap = ref(null);
const activeRequest = ref(null);
const userPosition = ref(null);

let L = null;

function getUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userId", userId);
  }
  return userId;
}

function loadHelpRequests() {
  if (!L) {
    return;
  }

  try {
    const helpRequestsRef = query(
      dbRef(database, "helpRequests"),
      orderByChild("status"),
      limitToLast(20)
    );

    onValue(helpRequestsRef, (snapshot) => {
      if (!snapshot.exists()) return;

      snapshot.forEach((childSnapshot) => {
        const requestId = childSnapshot.key;
        const requestData = childSnapshot.val();

        if (requestData && requestData.status === "active") {
          const now = new Date().getTime();
          const requestTime = new Date(requestData.createdAt).getTime();

          if (now - requestTime < 30000 && requestData.userId !== getUserId()) {
            showNotification(requestData);
          }
        }
      });
    });
  } catch (error) {
    console.error("Помилка при завантаженні запитів:", error);
  }
}

function showNotification(requestData) {
  activeRequest.value = requestData;

  if (navigator.geolocation && !userPosition.value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userPosition.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        createNotificationMap(requestData);
      },
      (error) => {
        console.error("Помилка геолокації:", error);

        createNotificationMap(requestData);
      }
    );
  } else {
    createNotificationMap(requestData);
  }

  try {
    const audio = new Audio("/sounds/notification.mp3");
    audio.play();
  } catch (e) {
    console.log("Неможливо відтворити звук сповіщення");
  }

  if ("Notification" in window && Notification.permission === "granted") {
    const notification = new Notification("Потрібна медична допомога!", {
      body:
        requestData.message ||
        "Хтось потребує першої медичної допомоги поблизу!",
      icon: "/img/help-icon.png",
    });

    notification.onclick = function () {
      window.focus();
      this.close();
    };
  }
}

function createNotificationMap(requestData) {
  setTimeout(() => {
    if (notificationMapContainer.value && L) {
      try {
        if (notificationMap.value) {
          notificationMap.value.remove();
          notificationMap.value = null;
        }

        notificationMap.value = L.map(notificationMapContainer.value).setView(
          [requestData.latitude, requestData.longitude],
          14
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap",
        }).addTo(notificationMap.value);

        const helpIcon = L.divIcon({
          className: "custom-marker",
          html: `<div class="help-marker-icon"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        L.marker([requestData.latitude, requestData.longitude], {
          icon: helpIcon,
        }).addTo(notificationMap.value);

        if (userPosition.value) {
          const userIcon = L.divIcon({
            className: "custom-marker",
            html: `<div class="user-marker-icon"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          L.marker([userPosition.value.lat, userPosition.value.lng], {
            icon: userIcon,
          }).addTo(notificationMap.value);

          L.polyline(
            [
              [userPosition.value.lat, userPosition.value.lng],
              [requestData.latitude, requestData.longitude],
            ],
            {
              color: "#4f46e5",
              weight: 3,
              opacity: 0.7,
              dashArray: "5, 10",
            }
          ).addTo(notificationMap.value);
        }
      } catch (error) {
        console.error("Помилка при створенні міні-карти:", error);
      }
    }
  }, 100);
}

function dismissNotification() {
  if (notificationMap.value) {
    notificationMap.value.remove();
    notificationMap.value = null;
  }
  activeRequest.value = null;
}

function navigateToRequest(requestData) {
  dismissNotification();

  if (!userPosition.value) {
    alert("Неможливо визначити ваше місцезнаходження для побудови маршруту.");
    return;
  }

  const destination = `${requestData.latitude},${requestData.longitude}`;
  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${userPosition.value.lat},${userPosition.value.lng}&destination=${destination}&travelmode=driving`,
    "_blank"
  );
}

provide("showNotification", showNotification);
provide("userPosition", userPosition);

onMounted(() => {
  console.log("App component mounted");

  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  }

  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  import("leaflet")
    .then((module) => {
      console.log("Leaflet loaded in App.vue");
      L = module.default;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userPosition.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          (error) => {
            console.error("Помилка геолокації:", error);
          }
        );
      }

      loadHelpRequests();
    })
    .catch((error) => {
      console.error("Error loading Leaflet in App.vue:", error);
    });
});

onUnmounted(() => {
  console.log("App component unmounted");
  if (notificationMap.value) {
    notificationMap.value.remove();
    notificationMap.value = null;
  }
});
</script>

<style>
.user-marker-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #4f46e5;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.help-marker-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ef4444;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
