<template>
  <main class="flex-1 container mx-auto px-4 py-8">
    <div v-if="!testStarted && !testFinished" class="max-w-2xl mx-auto">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-indigo-100 dark:border-indigo-900 mb-8"
      >
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Тест на знання першої медичної допомоги
        </h1>

        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Вітаємо у нашому тесті знань з першої медичної допомоги! Цей тест
          допоможе вам перевірити ваші знання та навички, які можуть врятувати
          життя у надзвичайних ситуаціях.
        </p>

        <div
          class="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-6 border-l-4 border-indigo-500"
        >
          <h3
            class="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-2"
          >
            Правила тесту:
          </h3>
          <ul
            class="text-indigo-700 dark:text-indigo-400 space-y-1 list-disc pl-5"
          >
            <li>Тест складається з {{ questions.length }} питань</li>
            <li>Кожне питання має одну правильну відповідь</li>
            <li>Після завершення ви отримаєте ваш результат та рекомендації</li>
            <li>
              На тест немає часових обмежень, але рекомендується відповідати
              швидко
            </li>
          </ul>
        </div>

        <div class="flex flex-col sm:flex-row sm:gap-4">
          <div class="mb-4 sm:mb-0">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Ваше ім'я (необов'язково)</label
            >
            <input
              type="text"
              id="username"
              v-model="userName"
              class="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 transition-all duration-200 outline-none text-gray-700 dark:text-gray-200"
              placeholder="Введіть ваше ім'я"
            />
          </div>

          <div class="mb-4 sm:mb-0">
            <div class="relative">
              <label
                for="difficulty"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Рівень складності
              </label>
              <div class="relative">
                <select
                  id="difficulty"
                  v-model="difficulty"
                  class="w-full pl-4 pr-10 py-2.5 appearance-none rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 shadow-sm transition-all duration-200"
                >
                  <option value="easy" class="py-2">Легкий</option>
                  <option value="medium" class="py-2">Середній</option>
                  <option value="hard" class="py-2">Складний</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <button
            @click="startTest"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Розпочати тест
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="testStarted && !testFinished" class="max-w-3xl mx-auto">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-indigo-100 dark:border-indigo-900 mb-8"
      >
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Питання {{ currentQuestionIndex + 1 }} з
              {{ filteredQuestions.length }}
            </span>
            <span
              class="text-sm font-medium text-indigo-600 dark:text-indigo-400"
            >
              {{
                Math.round(
                  ((currentQuestionIndex + 1) / filteredQuestions.length) * 100
                )
              }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              class="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
              :style="{
                width: `${
                  ((currentQuestionIndex + 1) / filteredQuestions.length) * 100
                }%`,
              }"
            ></div>
          </div>
        </div>

        <div v-if="currentQuestion">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {{ currentQuestion.question }}
          </h2>

          <div
            v-if="currentQuestion.image"
            class="mb-6 rounded-lg overflow-hidden"
          >
            <img
              :src="currentQuestion.image"
              alt="Ілюстрація до питання"
              class="w-full max-h-64 object-cover"
            />
          </div>

          <div class="space-y-3 mb-8">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="relative"
            >
              <input
                type="radio"
                :id="`option-${index}`"
                :name="`question-${currentQuestionIndex}`"
                :value="index"
                v-model="selectedOption"
                class="absolute opacity-0 w-0 h-0"
              />
              <label
                :for="`option-${index}`"
                class="flex items-start p-4 rounded-lg border cursor-pointer transition-all duration-200"
                :class="{
                  'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700':
                    selectedOption !== index,
                  'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700':
                    selectedOption === index,
                }"
              >
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5"
                  :class="{
                    'border-gray-300 dark:border-gray-600':
                      selectedOption !== index,
                    'border-indigo-500 dark:border-indigo-400':
                      selectedOption === index,
                  }"
                >
                  <div
                    v-if="selectedOption === index"
                    class="w-3 h-3 bg-indigo-500 dark:bg-indigo-400 rounded-full"
                  ></div>
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                  {{ option }}
                </div>
              </label>
            </div>
          </div>

          <div class="flex justify-between">
            <button
              v-if="currentQuestionIndex > 0"
              @click="previousQuestion"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
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
                Попереднє
              </span>
            </button>
            <div v-else></div>

            <button
              @click="nextQuestion"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="selectedOption === null"
            >
              <span class="flex items-center">
                {{ isLastQuestion ? "Завершити тест" : "Наступне" }}
                <svg
                  v-if="!isLastQuestion"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-1"
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
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="testFinished" class="max-w-3xl mx-auto">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-indigo-100 dark:border-indigo-900 mb-8"
      >
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Результати тесту
        </h1>

        <div class="mb-6 text-center">
          <p class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ userName ? `${userName}, ваш результат:` : "Ваш результат:" }}
          </p>

          <div
            class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
          >
            {{ score }} / {{ filteredQuestions.length }}
          </div>

          <div
            class="relative h-4 w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4"
          >
            <div
              class="h-4 rounded-full transition-all duration-1000 ease-out"
              :class="{
                'bg-red-500': scorePercentage < 50,
                'bg-yellow-500': scorePercentage >= 50 && scorePercentage < 75,
                'bg-green-500': scorePercentage >= 75,
              }"
              :style="{ width: `${scorePercentage}%` }"
            ></div>
          </div>

          <p
            class="font-medium"
            :class="{
              'text-red-600 dark:text-red-400': scorePercentage < 50,
              'text-yellow-600 dark:text-yellow-400':
                scorePercentage >= 50 && scorePercentage < 75,
              'text-green-600 dark:text-green-400': scorePercentage >= 75,
            }"
          >
            {{ scoreMessage }}
          </p>
        </div>

        <div
          class="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-8 border-l-4 border-indigo-500"
        >
          <h3
            class="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-2"
          >
            Рекомендації:
          </h3>
          <p class="text-indigo-700 dark:text-indigo-400">
            {{ recommendationMessage }}
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Огляд відповідей
          </h3>

          <div class="space-y-6">
            <div
              v-for="(question, index) in filteredQuestions"
              :key="index"
              class="p-4 rounded-lg border"
              :class="{
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800':
                  userAnswers[index] === question.correctAnswer,
                'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800':
                  userAnswers[index] !== question.correctAnswer,
              }"
            >
              <div class="flex justify-between items-start mb-2">
                <h4
                  class="text-lg font-medium text-gray-800 dark:text-gray-200"
                >
                  {{ index + 1 }}. {{ question.question }}
                </h4>
                <div
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300':
                      userAnswers[index] === question.correctAnswer,
                    'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300':
                      userAnswers[index] !== question.correctAnswer,
                  }"
                >
                  {{
                    userAnswers[index] === question.correctAnswer
                      ? "Правильно"
                      : "Неправильно"
                  }}
                </div>
              </div>

              <div class="text-gray-700 dark:text-gray-300 mb-3">
                <div class="font-medium">Ваша відповідь:</div>
                <div
                  class="pl-4"
                  :class="{
                    'text-green-700 dark:text-green-400':
                      userAnswers[index] === question.correctAnswer,
                    'text-red-700 dark:text-red-400':
                      userAnswers[index] !== question.correctAnswer,
                  }"
                >
                  {{ question.options[userAnswers[index]] }}
                </div>
              </div>

              <div
                v-if="userAnswers[index] !== question.correctAnswer"
                class="text-gray-700 dark:text-gray-300 mb-3"
              >
                <div class="font-medium">Правильна відповідь:</div>
                <div class="pl-4 text-green-700 dark:text-green-400">
                  {{ question.options[question.correctAnswer] }}
                </div>
              </div>

              <div class="text-gray-700 dark:text-gray-300">
                <div class="font-medium">Пояснення:</div>
                <div class="pl-4">{{ question.explanation }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <button
            @click="resetTest"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Пройти тест ще раз
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const userName = ref("");
const difficulty = ref("medium");

const testStarted = ref(false);
const testFinished = ref(false);
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const userAnswers = ref([]);

const questions = [
  {
    difficulty: "easy",
    question: "Який номер екстреної медичної допомоги в Україні?",
    options: ["101", "102", "103", "104"],
    correctAnswer: 2,
    explanation:
      "В Україні номер екстреної медичної допомоги - 103. Також доступний загальноєвропейський номер 112.",
  },
  {
    difficulty: "easy",
    question:
      "Що першочергово треба зробити, прибувши на місце події з потерпілим?",
    options: [
      "Негайно надати допомогу потерпілому",
      "Викликати швидку допомогу",
      "Переконатися у власній безпеці",
      "Знайти свідків події",
    ],
    correctAnswer: 2,
    explanation:
      "Першочерговою дією є забезпечення безпеки для себе та оточуючих. Якщо рятувальник постраждає, він не зможе надати допомогу.",
  },
  {
    difficulty: "easy",
    question: "Як довго слід охолоджувати опікову поверхню холодною водою?",
    options: [
      "1-2 хвилини",
      "5-6 хвилин",
      "10-15 хвилин",
      "До приїзду швидкої",
    ],
    correctAnswer: 2,
    explanation:
      "Опікову поверхню слід охолоджувати прохолодною (не крижаною) водою протягом 10-15 хвилин. Це допомагає зупинити поширення опіку в глибші шари тканин.",
  },
  {
    difficulty: "easy",
    question:
      "Яка правильна позиція рук при натисканнях на грудну клітку під час серцево-легеневої реанімації у дорослого?",
    options: [
      "Одна рука на середині грудної клітки",
      "Дві руки на нижній частині грудної клітки",
      "Дві руки на середині грудної клітки (на грудині)",
      "Одна рука на верхній частині грудної клітки",
    ],
    correctAnswer: 2,
    explanation:
      "При проведенні СЛР дорослому пацієнту руки розташовують на середині грудної клітки, на грудині. Основа долоні однієї руки розміщується на центрі грудної клітки, друга рука кладеться зверху.",
  },

  {
    difficulty: "medium",
    question:
      "Яка правильна послідовність дій при наданні першої допомоги постраждалому без свідомості?",
    options: [
      "Перевірити дихання, відкрити дихальні шляхи, викликати швидку",
      "Викликати швидку, перевірити дихання, відкрити дихальні шляхи",
      "Переконатися у безпеці, перевірити реакцію, відкрити дихальні шляхи, перевірити дихання, викликати швидку",
      "Переконатися у безпеці, викликати швидку, почати СЛР",
    ],
    correctAnswer: 2,
    explanation:
      "Правильна послідовність: переконатися в безпеці, перевірити реакцію постраждалого, відкрити дихальні шляхи (закинути голову і підняти підборіддя), перевірити наявність дихання, викликати швидку допомогу.",
  },
  {
    difficulty: "medium",
    question: "Які ознаки артеріальної кровотечі?",
    options: [
      "Темно-червона кров, яка повільно витікає з рани",
      "Яскраво-червона кров, яка витікає пульсуючим струменем",
      "Кров бордового кольору, яка витікає повільно та рівномірно",
      "Прозора рідина, яка сочиться з рани",
    ],
    correctAnswer: 1,
    explanation:
      "Артеріальна кровотеча характеризується яскраво-червоною кров'ю, яка витікає пульсуючим струменем синхронно з серцебиттям. Це найнебезпечніший тип кровотечі, який потребує негайного зупинення.",
  },
  {
    difficulty: "medium",
    question:
      "При якій глибині натискань на грудну клітку дорослого під час СЛР кровообіг найбільш ефективний?",
    options: ["2-3 см", "3-4 см", "5-6 см", "7-8 см"],
    correctAnswer: 2,
    explanation:
      "Згідно з сучасними рекомендаціями, оптимальна глибина натискань на грудну клітку дорослого під час СЛР становить 5-6 см. Це забезпечує ефективний кровообіг та кровопостачання життєво важливих органів.",
  },
  {
    difficulty: "medium",
    question:
      "Який метод є найефективнішим для зупинки сильної кровотечі з кінцівки при наявності відповідних засобів?",
    options: [
      "Накладання джгута",
      "Пряме натискання на рану",
      "Накладання тиснучої пов'язки",
      "Застосування кровоспинного порошку",
    ],
    correctAnswer: 1,
    explanation:
      "Найефективнішим методом зупинки сильної кровотечі з кінцівки є накладання кровоспинного джгута вище місця кровотечі. Однак важливо пам'ятати, що джгут застосовується лише в крайніх випадках, коли інші методи не ефективні.",
  },
  {
    difficulty: "medium",
    question: "Який основний принцип іммобілізації переломів?",
    options: [
      "Фіксація тільки місця перелому",
      "Фіксація пошкодженої кістки та суглобів вище і нижче місця перелому",
      "Фіксація всієї кінцівки в витягнутому положенні",
      "Фіксація в положенні максимального розгинання",
    ],
    correctAnswer: 1,
    explanation:
      "Основний принцип іммобілізації переломів - фіксація пошкодженої кістки та суглобів вище і нижче місця перелому. Це запобігає руху відламків кісток і зменшує біль та подальше пошкодження тканин.",
  },

  {
    difficulty: "hard",
    question:
      "Яку дію першої допомоги потрібно виконати першочергово при ознаках анафілактичного шоку у постраждалого, якщо є автоінжектор з епінефрином?",
    options: [
      "Покласти постраждалого в горизонтальне положення з піднятими ногами",
      "Дати постраждалому будь-які антигістамінні препарати",
      "Ввести епінефрин (адреналін) з автоінжектора",
      "Викликати швидку допомогу",
    ],
    correctAnswer: 2,
    explanation:
      "При анафілактичному шоку найважливішим першочерговим заходом є введення епінефрину (адреналіну) з автоінжектора, якщо він доступний. Це може врятувати життя. Паралельно слід викликати швидку допомогу.",
  },
  {
    difficulty: "hard",
    question:
      "Яка правильна послідовність дій при наданні допомоги постраждалому з епілептичним нападом?",
    options: [
      "Зафіксувати голову, вставити щось між зубами, після нападу покласти на бік",
      "Повернути постраждалого на бік, підтримувати голову, нічого не вставляти в рот",
      "Покласти постраждалого на спину, підкласти щось під голову, вставити ложку між зубами",
      "Покласти постраждалого на живіт, нічого не вставляти в рот",
    ],
    correctAnswer: 1,
    explanation:
      "Правильно: повернути постраждалого на бік, якщо можливо, або після нападу; підтримувати голову, щоб запобігти травмуванню; нічого не вставляти в рот. Важливо захистити від травмування та забезпечити прохідність дихальних шляхів.",
  },
  {
    difficulty: "hard",
    question:
      "Що є головними орієнтирами для визначення місця натискання на грудну клітку при СЛР?",
    options: [
      "Верхня частина грудини, на 2 пальці вище від яремної вирізки",
      "Нижня третина грудини, ближче до мечоподібного відростка",
      "Середина грудної клітки між сосками",
      "Нижня частина грудної клітки, прямо над мечоподібним відростком",
    ],
    correctAnswer: 2,
    explanation:
      "Натискання виконуються на середині грудної клітки між сосками (для дорослих), що відповідає середині нижньої половини грудини. Це найбільш ефективна точка для проведення компресій.",
  },
  {
    difficulty: "hard",
    question:
      "Якими є ознаки обструкції дихальних шляхів у потерпілого зі збереженою свідомістю при частковій закупорці з хорошим потоком повітря?",
    options: [
      "Потерпілий не може говорити, дихати або кашляти",
      "Потерпілий може говорити, кашель сильний та ефективний",
      "Потерпілий може говорити, але кашель слабкий, неефективний, є шумне дихання, ціаноз",
      "Потерпілий непритомний з нормальним диханням",
    ],
    correctAnswer: 1,
    explanation:
      "При частковій обструкції з хорошим потоком повітря потерпілий може говорити, кашель сильний та ефективний. В такому випадку рекомендується не втручатися і заохочувати кашель, оскільки вірогідно стороннє тіло вийде самостійно.",
  },
  {
    difficulty: "hard",
    question:
      "Яка правильна техніка виконання прийому Геймліха (піддіафрагмальних поштовхів) при повній обструкції дихальних шляхів у дорослого?",
    options: [
      "Стати позаду постраждалого, обхопити руками в області грудної клітки і різко натиснути на грудину",
      "Стати позаду постраждалого, обхопити руками в області живота вище пупка, нижче мечоподібного відростка і різко натиснути в напрямку вгору і до себе",
      "Покласти постраждалого на спину і натиснути на грудну клітку",
      "Стати перед постраждалим і натиснути йому на живіт",
    ],
    correctAnswer: 1,
    explanation:
      "При виконанні прийому Геймліха рятувальник стає позаду постраждалого, охоплює його руками в області живота (між пупком і мечоподібним відростком), стискає одну руку в кулак, захоплює її другою рукою і різко натискає в напрямку вгору і до себе. Це створює тиск, який може виштовхнути стороннє тіло.",
  },
];

const filteredQuestions = computed(() => {
  switch (difficulty.value) {
    case "easy":
      return questions.filter((q) => q.difficulty === "easy");
    case "medium":
      return questions.filter(
        (q) => q.difficulty === "easy" || q.difficulty === "medium"
      );
    case "hard":
      return questions;
    default:
      return questions;
  }
});

const currentQuestion = computed(() => {
  return filteredQuestions.value[currentQuestionIndex.value];
});

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === filteredQuestions.value.length - 1;
});

function startTest() {
  userAnswers.value = Array(filteredQuestions.value.length).fill(null);

  testStarted.value = true;
  testFinished.value = false;
  currentQuestionIndex.value = 0;
  selectedOption.value = null;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextQuestion() {
  if (selectedOption.value === null) return;

  userAnswers.value[currentQuestionIndex.value] = selectedOption.value;

  if (isLastQuestion.value) {
    finishTest();
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = userAnswers.value[currentQuestionIndex.value];

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    userAnswers.value[currentQuestionIndex.value] = selectedOption.value;

    currentQuestionIndex.value--;
    selectedOption.value = userAnswers.value[currentQuestionIndex.value];

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function finishTest() {
  userAnswers.value[currentQuestionIndex.value] = selectedOption.value;

  testFinished.value = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
function resetTest() {
  testStarted.value = false;
  testFinished.value = false;
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  userAnswers.value = [];

  window.scrollTo({ top: 0, behavior: "smooth" });
}

const score = computed(() => {
  return userAnswers.value.reduce((acc, answer, index) => {
    return answer === filteredQuestions.value[index].correctAnswer
      ? acc + 1
      : acc;
  }, 0);
});

const scorePercentage = computed(() => {
  return (score.value / filteredQuestions.value.length) * 100;
});

const scoreMessage = computed(() => {
  if (scorePercentage.value < 50) {
    return "Потрібно більше практики";
  } else if (scorePercentage.value < 75) {
    return "Добре! Але є над чим працювати";
  } else if (scorePercentage.value < 90) {
    return "Дуже добре! Ви маєте гарні знання";
  } else {
    return "Відмінно! Ви справжній експерт";
  }
});

const recommendationMessage = computed(() => {
  if (scorePercentage.value < 50) {
    return "Рекомендуємо приділити більше уваги вивченню базових принципів першої допомоги. Розгляньте можливість пройти практичний курс.";
  } else if (scorePercentage.value < 75) {
    return "Ваші знання з першої допомоги на середньому рівні. Зверніть увагу на питання, де ви помилились, та зміцніть свої знання у цих областях.";
  } else if (scorePercentage.value < 90) {
    return "У вас добрі знання з першої допомоги. Для вдосконалення рекомендуємо пройти практичний курс для закріплення теоретичних знань.";
  } else {
    return "Ваші знання з першої допомоги відмінні! Регулярно оновлюйте їх, адже рекомендації можуть змінюватися з часом.";
  }
});
</script>

<style scoped>
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

button,
input,
select {
  transition: all 0.2s ease;
}

.custom-progress {
  transition: width 1s ease-in-out;
}
</style>
