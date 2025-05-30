<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
  >
    <transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-100"
      enter-to-class="opacity-0"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-0"
      leave-to-class="opacity-100"
    >
      <div
        v-if="false"
        class="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="relative w-24 h-24 mx-auto mb-4">
            <div
              class="absolute w-full h-full rounded-full border-4 border-indigo-200 dark:border-indigo-900"
            ></div>
            <div
              class="absolute w-full h-full rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin"
            ></div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Завантаження...</p>
        </div>
      </div>
    </transition>

    <main class="flex-1 container mx-auto px-4 py-8">
      <div v-if="!response" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="(card, index) in infoCards"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100 dark:border-indigo-800 animate-on-load opacity-0"
          :class="{ 'animate-pulse': loading && index === 0 }"
        >
          <div
            class="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
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
                :d="card.icon"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {{ card.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            {{ card.description }}
          </p>
        </div>
      </div>
      <form
        @submit.prevent="submitQuestion"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-indigo-100 dark:border-indigo-900 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700 animate-on-load opacity-0"
      >
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Задайте питання про першу допомогу
        </h2>

        <div class="relative mb-4">
          <textarea
            id="question"
            v-model="userQuestion"
            rows="3"
            class="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 transition-all duration-200 outline-none resize-none text-gray-700 dark:text-gray-200"
            placeholder="Наприклад: Що робити при кровотечі з носа?"
            :disabled="loading"
          ></textarea>
          <div
            class="absolute bottom-3 right-3 flex space-x-1 text-xs text-gray-400"
          >
            <span :class="{ 'text-indigo-500': userQuestion.length > 0 }">{{
              userQuestion.length
            }}</span>
            <span>/250</span>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-blue-600 disabled:hover:shadow-md"
            :disabled="
              loading || !userQuestion.trim() || userQuestion.length > 250
            "
          >
            <span v-if="loading" class="mr-2">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <span v-if="!loading">Отримати відповідь</span>
            <span v-else>Обробка запиту...</span>
          </button>
        </div>
      </form>

      <transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="transform -translate-y-8 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-8 opacity-0"
      >
        <div
          v-if="response"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-900 mb-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              Відповідь
            </h2>
            <button
              @click="resetResponse"
              class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 dark:text-gray-400"
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

          <div
            class="prose prose-indigo dark:prose-invert max-w-none"
            v-html="formattedResponse"
          ></div>

          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
          >
            <div
              v-if="responseLinks.length > 0"
              class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
            >
              <h3
                class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200"
              >
                Відеоінструкції:
              </h3>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="(link, index) in responseLinks"
                  :key="index"
                  :href="link.url"
                  target="_blank"
                  class="group flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all duration-300 text-sm font-medium"
                >
                  <svg
                    class="mr-2 h-4 w-4 text-indigo-500 dark:text-indigo-400 group-hover:animate-pulse"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ link.label }}
                </a>
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
      >
        <div
          v-if="error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mt-4 flex items-start"
        >
          <svg
            class="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-red-800 dark:text-red-300">
              Помилка
            </h3>
            <p class="mt-1 text-sm text-red-700 dark:text-red-400">
              {{ error }}
            </p>
            <button
              @click="error = ''"
              class="mt-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="transform translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
      >
        <div
          v-if="history.length > 0 && !response"
          class="mt-8 animate-on-load opacity-0"
        >
          <h3
            class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200"
          >
            Історія запитів
          </h3>
          <div class="space-y-3">
            <div
              v-for="(item, index) in history.slice(0, 3)"
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors"
            >
              <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
                {{ item.question }}
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  formatDate(item.date)
                }}</span>
                <button
                  @click="reuseQuestion(item.question)"
                  class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Повторити
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>

    <footer
      class="bg-white dark:bg-gray-800 border-t border-indigo-100 dark:border-indigo-900 py-6 px-4 mt-auto"
    >
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p
            class="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0 text-center md:text-left"
          >
            <span class="text-red-500">⚠️</span> Це програмне забезпечення не
            замінює професійну медичну допомогу. У екстрених випадках негайно
            зверніться до лікаря або викличте швидку допомогу за номером
            <span class="font-semibold text-red-600 dark:text-red-400">103</span
            >.
          </p>
          <div class="flex space-x-4">
            <a
              href="#"
              class="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <div class="fixed bottom-6 right-6 z-50">
      <a
        href="tel:103"
        class="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center animate-pulse hover:animate-none transition-all duration-300 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span class="sr-only">Викликати швидку допомогу</span>
      </a>
      <div
        class="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 px-3 py-1 rounded shadow text-xs font-medium text-gray-700 dark:text-gray-200 pointer-events-none"
      >
        Виклик 103
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";
import videoData from "../videos/data.json";
import axios from "axios";
const infoCards = [
  {
    title: "Екстрені ситуації",
    description:
      "Отримайте інформацію про дії в екстрених ситуаціях, таких як кровотечі, опіки, задуха або серцевий напад.",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    title: "Відеоінструкції",
    description:
      "Доступ до відеоінструкцій з першої медичної допомоги від професіоналів, які допоможуть вам діяти правильно.",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    title: "Професійні поради",
    description:
      "Консультації ґрунтуються на медичних протоколах та рекомендаціях провідних медичних організацій.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

const videosData = ref(videoData);

const userQuestion = ref("");
const response = ref("");
const responseLinks = ref([]);
const loading = ref(false);
const error = ref("");
const history = ref([]);
const formattedResponse = computed(() => {
  if (!response.value) return "";
  const cleanHtml = DOMPurify.sanitize(marked.parse(response.value));
  return cleanHtml;
});

function reuseQuestion(question) {
  userQuestion.value = question;
  document.getElementById("question").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    document.getElementById("question").focus();
  }, 500);
}

function formatDate(date) {
  return new Date(date).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getYoutubeId(url) {
  try {
    const urlObj = new URL(url);
    let id = urlObj.searchParams.get("v");

    if (!id) {
      const pathSegments = urlObj.pathname.split("/").filter(Boolean);
      id = pathSegments[pathSegments.length - 1];
    }

    return id || "dQw4w9WgXcQ";
  } catch (e) {
    console.error("Invalid YouTube URL:", url);
    return "dQw4w9WgXcQ";
  }
}

function resetResponse() {
  response.value = "";
  responseLinks.value = [];
  userQuestion.value = "";
}

async function submitQuestion() {
  if (!userQuestion.value.trim() || userQuestion.value.length > 250) return;

  loading.value = true;
  error.value = "";
  response.value = "";
  responseLinks.value = [];

  try {
    const VIDEO_JSON = JSON.stringify(videosData.value);

    const prompt = `
  Ти — медичний помічник, який спеціалізується виключно на темах першої медичної допомоги. Відповідай ЛИШЕ українською мовою. Не вигадуй інформацію, яка не стосується першої допомоги. Користувач ставить запитання про першу медичну допомогу. Твоя відповідь має містити: 1. Коротке, зрозуміле пояснення, що робити в такій ситуації. 2. Якщо серед наданих відео є ті, що відповідають запиту — додай їх як окремі кнопки (назва + посилання). 3. Якщо жодне відео не підходить, просто дай відповідь без посилань. Ось запитання користувача: **"${userQuestion.value}"** Ось список доступних відеоінструкцій:
  
  \`\`\`
  json
  ${VIDEO_JSON}
  \`\`\`
  
  !!!УВАГА ВІДПОВІДАЙ ПРЯМО ТІЛЬКИ ОБЄКТОМ , НЕ СПІЛКУЙСЯ ЗІ МНОЮ, ЯКЩО Є ПОСИЛАННЯ ВСТАВЛЯЙ ЙОГО В ОБЄКТ
   сам обєкт: {
    "answer": "someanswer",
    "links": [
      {
        "label": "Назва відео",
        "url": "https://..."
      }
    ]
  }
  `;

    try {
      const apiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = apiResponse.data.choices[0].message.content;

      try {
        const parsedResult = JSON.parse(result);
        response.value = parsedResult.answer;
        responseLinks.value = parsedResult.links || [];
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        response.value = result;
        responseLinks.value = [];
      }

      addToHistory(userQuestion.value);
    } catch (apiError) {
      console.error("API Error:", apiError);
      console.warn("Using fallback response instead of actual API");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fallbackResponse = {
        answer:
          "При кровотечі необхідно негайно діяти:\n\n1. Застосуйте прямий тиск на рану чистою тканиною або бинтом.\n2. Підніміть поранену кінцівку вище рівня серця, якщо це можливо.\n3. Використайте компресійну пов'язку, щільно обмотавши тканину навколо рани.\n4. При сильній кровотечі, яку не вдається зупинити, можна застосувати джгут, але тільки в крайньому випадку.\n\nВажливо! Якщо кровотеча сильна і не зупиняється, негайно викликайте швидку допомогу.",
        links: [
          {
            label: "Як зупинити кровотечу",
            url: "https://youtube.com/example1",
          },
        ],
      };

      response.value = fallbackResponse.answer;
      responseLinks.value = fallbackResponse.links;

      addToHistory(userQuestion.value);
    }
  } catch (err) {
    console.error("Error:", err);
    error.value =
      "Не вдалося отримати відповідь. Будь ласка, спробуйте пізніше.";
  } finally {
    loading.value = false;

    if (response.value) {
      setTimeout(() => {
        window.scrollTo({
          top: document.querySelector("form").offsetTop + 100,
          behavior: "smooth",
        });
      }, 300);
    }
  }
}

function addToHistory(question) {
  const newEntry = {
    question,
    date: new Date(),
  };

  history.value = [newEntry, ...history.value].slice(0, 10);

  try {
    localStorage.setItem("question_history", JSON.stringify(history.value));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

onMounted(() => {
  try {
    const savedHistory = localStorage.getItem("question_history");
    if (savedHistory) {
      history.value = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.error("Error loading from localStorage:", e);
  }

  setTimeout(() => {
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("fade-in");
      }, index * 200);
    });
  }, 300);

  videosData.value.forEach((video) => {
    const img = new Image();
    img.src = `https://i.ytimg.com/vi/${getYoutubeId(video.url)}/mqdefault.jpg`;
  });
});
</script>

<style>
.fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
  opacity: 1 !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose {
  max-width: 65ch;
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

button,
a {
  transition: all 0.2s ease;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.7);
}

html.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

html.dark ::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.5);
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(129, 140, 248, 0.7);
}
</style>
