<template>
  <div class="container mx-auto px-4 py-8">
    <h1
      class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center"
    >
      Карта екстреної допомоги
    </h1>

    <div
      class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-900 mb-8"
    >
      <p class="text-gray-700 dark:text-gray-300 mb-6 text-center">
        Тут ви можете попросити про допомогу або допомогти іншим людям, які
        потребують першої медичної допомоги.
      </p>

      <div
        ref="mapContainer"
        class="w-full h-96 md:h-[500px] rounded-lg overflow-hidden relative"
      >
        <div
          v-if="loading"
          class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-20"
        >
          <div
            class="w-12 h-12 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"
          ></div>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <button
          v-if="!activeUserRequest"
          @click="requestHelp"
          :disabled="isRequestingHelp || !isLocationAvailable"
          class="inline-flex items-center px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium shadow-md transition-all duration-300"
        >
          <span v-if="isRequestingHelp" class="mr-2">
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
          <svg
            v-else
            class="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          {{
            isRequestingHelp
              ? "Відправлення запиту..."
              : "Мені потрібна допомога"
          }}
        </button>
      </div>

      <div
        v-if="activeUserRequest"
        class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg text-center text-yellow-800 dark:text-yellow-200"
      >
        Ваш запит про допомогу активний. Очікуйте на відгук.
      </div>
    </div>

    <div
      class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-900"
    >
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Як це працює:
      </h2>

      <div class="space-y-4">
        <div class="flex items-start">
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4"
          >
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold"
              >1</span
            >
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            Натисніть кнопку "Мені потрібна допомога", щоб відправити запит на
            допомогу. Ваше місцезнаходження буде відображене на карті.
          </p>
        </div>

        <div class="flex items-start">
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4"
          >
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold"
              >2</span
            >
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            Інші користувачі, які знаходяться поблизу, отримають сповіщення про
            ваш запит і зможуть прийти на допомогу.
          </p>
        </div>

        <div class="flex items-start">
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4"
          >
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold"
              >3</span
            >
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            Якщо ви можете допомогти, натисніть на червоний маркер на карті та
            кнопку "Допомогти", щоб отримати маршрут до людини, яка потребує
            допомоги.
          </p>
        </div>

        <div class="flex items-start">
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4"
          >
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold"
              >4</span
            >
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            Якщо ви відправили запит, але більше не потребуєте допомоги,
            натисніть кнопку "Скасувати запит допомоги", щоб видалити ваш маркер
            з карти.
          </p>
        </div>
      </div>

      <div
        class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500"
      >
        <h3 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          Важливо!
        </h3>
        <p class="text-yellow-700 dark:text-yellow-400">
          Ця система призначена для ситуацій, які потребують першої допомоги,
          але не для серйозних загроз життю. У випадку невідкладної медичної
          допомоги спочатку зателефонуйте за номером
          <span class="font-bold">103</span>.
        </p>
      </div>
    </div>

    <div
      v-if="popup.show"
      class="fixed inset-0 z-[9999] overflow-y-auto"
      @click="closePopup"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div
          class="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          @click.stop
        >
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4"
            :class="popup.iconBg"
          >
            <svg
              class="h-6 w-6"
              :class="popup.iconColor"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="popup.type === 'success'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
              <path
                v-else-if="popup.type === 'error'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else-if="popup.type === 'warning'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div class="text-center">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2"
            >
              {{ popup.title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ popup.message }}
              </p>
            </div>
          </div>

          <div
            class="mt-5 sm:mt-6"
            :class="
              popup.confirm
                ? 'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'
                : ''
            "
          >
            <button
              v-if="popup.confirm"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
              :class="
                popup.type === 'error'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
              "
              @click="confirmAction"
            >
              {{ popup.confirmText || "Підтвердити" }}
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
              :class="popup.confirm ? 'sm:col-start-1' : ''"
              @click="closePopup"
            >
              {{ popup.confirm ? "Скасувати" : "Зрозуміло" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, reactive } from "vue";
import { database } from "../firebase";
import {
  ref as dbRef,
  onValue,
  push,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  get,
} from "firebase/database";
import "leaflet/dist/leaflet.css";

const showNotification = inject("showNotification");
const appUserPosition = inject("userPosition");

const popup = reactive({
  show: false,
  type: "info",
  title: "",
  message: "",
  confirm: false,
  confirmText: "",
  confirmAction: null,
  iconBg: "bg-blue-100",
  iconColor: "text-blue-600",
});

const mapContainer = ref(null);
const map = ref(null);
const userPosition = ref(null);
const userMarker = ref(null);
const requestMarkers = ref({});
const loading = ref(true);
const isRequestingHelp = ref(false);
const isCancellingRequest = ref(false);
const isLocationAvailable = ref(false);
const activeUserRequest = ref(null);

let L = null;

function showPopup(
  type,
  title,
  message,
  confirm = false,
  confirmText = "",
  confirmCallback = null
) {
  popup.type = type;
  popup.title = title;
  popup.message = message;
  popup.confirm = confirm;
  popup.confirmText = confirmText;
  popup.confirmAction = confirmCallback;
  popup.show = true;

  switch (type) {
    case "success":
      popup.iconBg = "bg-green-100 dark:bg-green-900";
      popup.iconColor = "text-green-600 dark:text-green-400";
      break;
    case "error":
      popup.iconBg = "bg-red-100 dark:bg-red-900";
      popup.iconColor = "text-red-600 dark:text-red-400";
      break;
    case "warning":
      popup.iconBg = "bg-yellow-100 dark:bg-yellow-900";
      popup.iconColor = "text-yellow-600 dark:text-yellow-400";
      break;
    default:
      popup.iconBg = "bg-blue-100 dark:bg-blue-900";
      popup.iconColor = "text-blue-600 dark:text-blue-400";
  }
}

function closePopup() {
  popup.show = false;
  popup.confirmAction = null;
}

function confirmAction() {
  if (popup.confirmAction) {
    popup.confirmAction();
  }
  closePopup();
}

function getUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userId", userId);
  }
  return userId;
}

function initMap() {
  if (!L || !mapContainer.value) {
    console.error("Leaflet or map container not available");
    return;
  }

  loading.value = true;

  try {
    map.value = L.map(mapContainer.value).setView([49.0139, 31.2858], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userPosition.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.value.setView(
            [userPosition.value.lat, userPosition.value.lng],
            13
          );

          const userIcon = L.divIcon({
            className: "custom-marker",
            html: `<div class="user-marker-icon"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          userMarker.value = L.marker(
            [userPosition.value.lat, userPosition.value.lng],
            {
              icon: userIcon,
            }
          ).addTo(map.value);

          isLocationAvailable.value = true;
          loading.value = false;

          checkUserActiveRequests();
        },
        (error) => {
          console.error("Помилка геолокації:", error);
          loading.value = false;

          showPopup(
            "error",
            "Помилка геолокації",
            "Не вдалося отримати ваше місцезнаходження. Дозвольте доступ до геолокації для використання всіх функцій."
          );
        }
      );
    } else {
      loading.value = false;
      showPopup(
        "error",
        "Геолокація не підтримується",
        "Ваш браузер не підтримує геолокацію. Вам потрібно використовувати сучасний браузер для повноцінної роботи з картою."
      );
    }
  } catch (error) {
    console.error("Помилка ініціалізації карти:", error);
    loading.value = false;
  }
}

async function checkUserActiveRequests() {
  try {
    const userId = getUserId();
    const userRequestsRef = query(
      dbRef(database, "helpRequests"),
      orderByChild("userId"),
      equalTo(userId)
    );

    const snapshot = await get(userRequestsRef);

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const requestData = childSnapshot.val();

        if (requestData.status === "active") {
          activeUserRequest.value = {
            id: childSnapshot.key,
            ...requestData,
          };
          return true;
        }
      });
    }
  } catch (error) {
    console.error("Помилка при перевірці активних запитів користувача:", error);
  }
}

function loadHelpRequests() {
  if (!L || !map.value) {
    console.error("Leaflet або карта не ініціалізовані");
    return;
  }

  try {
    const helpRequestsRef = query(
      dbRef(database, "helpRequests"),
      orderByChild("status"),
      limitToLast(20)
    );

    onValue(helpRequestsRef, (snapshot) => {
      for (const markerId in requestMarkers.value) {
        if (requestMarkers.value[markerId] && map.value) {
          requestMarkers.value[markerId].remove();
        }
        delete requestMarkers.value[markerId];
      }

      if (!snapshot.exists()) return;

      snapshot.forEach((childSnapshot) => {
        const requestId = childSnapshot.key;
        const requestData = childSnapshot.val();

        if (requestData && requestData.status === "active") {
          addRequestMarker(requestId, requestData);

          const now = new Date().getTime();
          const requestTime = new Date(requestData.createdAt).getTime();

          if (now - requestTime < 30000 && requestData.userId !== getUserId()) {
            showNotification(requestData);
          }

          if (requestData.userId === getUserId()) {
            activeUserRequest.value = {
              id: requestId,
              ...requestData,
            };
          }
        }
      });
    });
  } catch (error) {
    console.error("Помилка при завантаженні запитів:", error);
  }
}

function addRequestMarker(requestId, requestData) {
  if (!L || !map.value) return;

  try {
    const helpIcon = L.divIcon({
      className: "custom-marker",
      html: `<div class="help-marker-icon">SOS</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker([requestData.latitude, requestData.longitude], {
      icon: helpIcon,
    });

    const popupContent = document.createElement("div");
    popupContent.className = "help-popup";

    if (requestData.userId === getUserId()) {
      popupContent.innerHTML = `
        <h3 class="text-lg font-bold mb-2">Ваш запит про допомогу</h3>
        <p class="mb-3">${
          requestData.message || "Потрібна перша медична допомога"
        }</p>
        <button id="cancel-btn-${requestId}" class="cancel-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Скасувати запит</button>
      `;
    } else {
      popupContent.innerHTML = `
        <h3 class="text-lg font-bold mb-2">Потрібна допомога!</h3>
        <p class="mb-3">${
          requestData.message || "Потрібна перша медична допомога"
        }</p>
        <button id="help-btn-${requestId}" class="help-button bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Допомогти</button>
      `;
    }

    function setupPopupEvents() {
      const helpBtn = document.getElementById(`help-btn-${requestId}`);
      if (helpBtn) {
        helpBtn.addEventListener("click", () => {
          if (!appUserPosition.value) {
            showPopup(
              "error",
              "Помилка геолокації",
              "Неможливо визначити ваше місцезнаходження для побудови маршруту."
            );
            return;
          }

          const destination = `${requestData.latitude},${requestData.longitude}`;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${appUserPosition.value.lat},${appUserPosition.value.lng}&destination=${destination}&travelmode=driving`,
            "_blank"
          );
        });
      }

      const cancelBtn = document.getElementById(`cancel-btn-${requestId}`);
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          showPopup(
            "warning",
            "Скасування запиту",
            "Ви впевнені, що хочете скасувати запит про допомогу?",
            true,
            "Скасувати запит",
            () => cancelHelpRequest(requestId)
          );
        });
      }
    }

    const popup = L.popup().setContent(popupContent);
    marker.bindPopup(popup);

    marker.on("popupopen", setupPopupEvents);

    marker.addTo(map.value);

    requestMarkers.value[requestId] = marker;
  } catch (error) {
    console.error(`Помилка при додаванні маркера для ${requestId}:`, error);
  }
}

async function requestHelp() {
  if (!isLocationAvailable.value) {
    showPopup(
      "error",
      "Помилка геолокації",
      "Неможливо визначити ваше місцезнаходження. Дозвольте доступ до геолокації та спробуйте знову."
    );
    return;
  }

  if (activeUserRequest.value) {
    showPopup(
      "warning",
      "Активний запит",
      "У вас вже є активний запит допомоги. Ви можете скасувати його перед створенням нового."
    );
    return;
  }

  isRequestingHelp.value = true;

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });

    const requestData = {
      userId: getUserId(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      message: "Потрібна перша медична допомога",
      status: "active",
      createdAt: new Date().toISOString(),
    };

    const newRequestRef = push(dbRef(database, "helpRequests"));
    await set(newRequestRef, requestData);

    activeUserRequest.value = {
      id: newRequestRef.key,
      ...requestData,
    };

    if (userMarker.value && map.value) {
      userMarker.value.setLatLng([
        position.coords.latitude,
        position.coords.longitude,
      ]);
      map.value.setView(
        [position.coords.latitude, position.coords.longitude],
        15
      );
    }

    х;
    showPopup(
      "success",
      "Запит відправлено",
      "Ваш запит про допомогу було відправлено. Зачекайте, поки хтось відгукнеться."
    );
  } catch (error) {
    console.error("Помилка запиту допомоги:", error);
    showPopup(
      "error",
      "Помилка",
      "Не вдалося відправити запит про допомогу. Спробуйте знову пізніше."
    );
  } finally {
    isRequestingHelp.value = false;
  }
}

async function cancelHelpRequest(requestId = null) {
  const targetRequestId =
    requestId || (activeUserRequest.value && activeUserRequest.value.id);

  if (!targetRequestId) {
    showPopup(
      "warning",
      "Немає активного запиту",
      "Не знайдено активного запиту для скасування."
    );
    return;
  }

  isCancellingRequest.value = true;

  try {
    const requestRef = dbRef(database, `helpRequests/${targetRequestId}`);
    await update(requestRef, {
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
    });

    if (requestMarkers.value[targetRequestId]) {
      requestMarkers.value[targetRequestId].remove();
      delete requestMarkers.value[targetRequestId];
    }

    activeUserRequest.value = null;

    showPopup(
      "success",
      "Запит скасовано",
      "Ваш запит про допомогу було скасовано."
    );
  } catch (error) {
    console.error("Помилка при скасуванні запиту:", error);
    showPopup(
      "error",
      "Помилка",
      "Не вдалося скасувати запит. Спробуйте знову пізніше."
    );
  } finally {
    isCancellingRequest.value = false;
  }
}

onMounted(() => {
  console.log("HelpMapView component mounted");

  import("leaflet")
    .then((module) => {
      console.log("Leaflet loaded");
      L = module.default;
      initMap();
      loadHelpRequests();
    })
    .catch((error) => {
      console.error("Error loading Leaflet:", error);
      loading.value = false;
      showPopup(
        "error",
        "Помилка завантаження",
        "Не вдалося завантажити карту. Будь ласка, перезавантажте сторінку."
      );
    });
});

onUnmounted(() => {
  console.log("HelpMapView component unmounted");
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});
</script>
