<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
  >
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Навчальні матеріали
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Тут зібрана важлива інформація про надання першої медичної допомоги в
          різних ситуаціях. Ознайомтеся з матеріалами, щоб бути готовим
          допомогти собі та іншим у екстрених випадках.
        </p>
      </div>

      <div class="mb-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-indigo-100 dark:border-indigo-900"
        >
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Пошук матеріалів..."
                  class="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 transition-all duration-200 outline-none text-gray-700 dark:text-gray-200"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex items-center">
              <span
                class="text-sm text-gray-500 dark:text-gray-400 mr-2 hidden md:inline"
                >Сортувати:</span
              >
              <select
                v-model="sortOrder"
                class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 outline-none"
              >
                <option value="titleAsc">За назвою (А-Я)</option>
                <option value="titleDesc">За назвою (Я-А)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <div class="relative w-16 h-16 mb-4">
          <div
            class="absolute w-full h-full rounded-full border-4 border-indigo-200 dark:border-indigo-900"
          ></div>
          <div
            class="absolute w-full h-full rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin"
          ></div>
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Завантаження матеріалів...
        </p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start mb-8"
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
          <p class="mt-1 text-sm text-red-700 dark:text-red-400">{{ error }}</p>
          <button
            @click="fetchPages"
            class="mt-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 mr-1"
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
            Спробувати знову
          </button>
        </div>
      </div>

      <div
        v-else-if="filteredPages.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Матеріали не знайдено
        </h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">
          {{
            searchQuery
              ? "Спробуйте змінити пошуковий запит або перевірити правильність написання."
              : "На даний момент немає доступних навчальних матеріалів."
          }}
        </p>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="mt-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
        >
          Скинути пошук
        </button>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div
          v-for="page in paginatedPages"
          :key="page.id"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100 dark:border-indigo-900 flex flex-col"
        >
          <div v-if="page.image && page.image.url" class="h-48 overflow-hidden">
            <img
              :src="page.image.url"
              :alt="page.title || 'Навчальний матеріал'"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ page.title || "Навчальний матеріал" }}
            </h2>

            <div
              class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3"
              v-html="getExcerpt(page.content.html)"
            ></div>

            <div class="mt-auto pt-4">
              <button
                @click="openMaterial(page)"
                class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
              >
                Читати більше
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex justify-center my-8">
        <div
          class="inline-flex items-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="flex items-center justify-center h-10 px-4 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="ml-1 hidden sm:inline">Попередня</span>
          </button>

          <div class="hidden sm:flex">
            <template v-for="page in displayedPageNumbers" :key="page">
              <span
                v-if="page === '...'"
                class="flex items-center justify-center h-10 w-10 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>

              <button
                v-else
                @click="goToPage(page)"
                class="flex items-center justify-center h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                :class="{
                  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium':
                    currentPage === page,
                }"
              >
                {{ page }}
              </button>
            </template>
          </div>

          <div
            class="flex sm:hidden items-center px-4 text-sm text-gray-700 dark:text-gray-300"
          >
            {{ currentPage }} з {{ totalPages }}
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center h-10 px-4 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
          >
            <span class="mr-1 hidden sm:inline">Наступна</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedMaterial"
        class="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[11000] flex items-center justify-center p-4"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop
        >
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ selectedMaterial.title || "Навчальний матеріал" }}
            </h2>
            <button
              @click="selectedMaterial = null"
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

          <div class="p-6 overflow-y-auto">
            <div
              class="prose prose-indigo dark:prose-invert max-w-none custom-html-content"
              v-html="selectedMaterial.content.html"
            ></div>
          </div>

          <div
            class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end"
          >
            <button
              @click="selectedMaterial = null"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import axios from "axios";

const pages = ref([]);
const loading = ref(false);
const error = ref("");
const searchQuery = ref("");
const sortOrder = ref("titleAsc");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const selectedMaterial = ref(null);

const filteredPages = computed(() => {
  let result = pages.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter((page) => {
      const title = (page.title || "").toLowerCase();
      const content = page.content?.html?.toLowerCase() || "";

      return title.includes(query) || content.includes(query);
    });
  }

  return result.sort((a, b) => {
    const titleA = (a.title || "").toLowerCase();
    const titleB = (b.title || "").toLowerCase();

    if (sortOrder.value === "titleAsc") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredPages.value.length / itemsPerPage.value);
});

const paginatedPages = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPages.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const displayedPageNumbers = computed(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  const pages = [];

  pages.push(1);

  const rangeStart = Math.max(2, currentPage.value - 1);
  const rangeEnd = Math.min(totalPages.value - 1, currentPage.value + 1);

  if (rangeStart > 2) {
    pages.push("...");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages.value - 1) {
    pages.push("...");
  }

  pages.push(totalPages.value);

  return pages;
});

function goToPage(page) {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

watch([searchQuery, sortOrder], () => {
  currentPage.value = 1;
});

function getExcerpt(html) {
  if (!html) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  let text = tempDiv.textContent || tempDiv.innerText || "";

  return text.length > 150 ? text.substring(0, 150) + "..." : text;
}

function openMaterial(page) {
  selectedMaterial.value = page;

  document.body.style.overflow = "hidden";
}

watch(selectedMaterial, (newValue) => {
  if (!newValue) {
    document.body.style.overflow = "";
  }
});

async function fetchPages() {
  loading.value = true;
  error.value = "";

  try {
    const query = `
      query {
        pages(first: 15) {
          title
          id
          image {
            url
          }
          content {
            html
          }
          slug
        }
          
      }
    `;
    const response = await axios.post(
      import.meta.env.VITE_API_URL,
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_HYGRAPH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    pages.value = response.data.data.pages;

    if (totalPages.value < currentPage.value) {
      currentPage.value = totalPages.value > 0 ? 1 : 0;
    }
  } catch (err) {
    console.error("Error fetching pages:", err);
    error.value =
      "Не вдалося завантажити матеріали. Будь ласка, спробуйте пізніше.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchPages();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
</style>

<style>
.custom-html-content iframe {
  width: 100%;
  min-height: 300px;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.custom-html-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.dark .custom-html-content h2 {
  color: #f3f4f6;
}

.custom-html-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

.dark .custom-html-content h3 {
  color: #e5e7eb;
}

.custom-html-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.custom-html-content ul,
.custom-html-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.custom-html-content li {
  margin-bottom: 0.5rem;
}

.custom-html-content blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #4b5563;
  font-style: italic;
}

.dark .custom-html-content blockquote {
  border-left-color: #818cf8;
  color: #9ca3af;
}

.custom-html-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.custom-html-content a {
  color: #4f46e5;
  text-decoration: underline;
  transition: color 0.2s;
}

.dark .custom-html-content a {
  color: #818cf8;
}

.custom-html-content a:hover {
  color: #4338ca;
}

.dark .custom-html-content a:hover {
  color: #a5b4fc;
}

.custom-html-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  overflow-x: auto;
  display: block;
}

.custom-html-content th {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
}

.dark .custom-html-content th {
  background-color: #374151;
  color: #f9fafb;
  border-bottom-color: #4b5563;
}

.custom-html-content td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .custom-html-content td {
  border-bottom-color: #4b5563;
}

.custom-html-content tr:nth-child(even) {
  background-color: #f9fafb;
}

.dark .custom-html-content tr:nth-child(even) {
  background-color: #1f2937;
}

.custom-html-content iframe {
  width: 100%;
  height: 450px;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 640px) {
  .custom-html-content iframe {
    height: 300px;
  }

  .custom-html-content h2 {
    font-size: 1.25rem;
  }

  .custom-html-content h3 {
    font-size: 1.125rem;
  }

  .custom-html-content table {
    font-size: 0.875rem;
  }
}
</style>
