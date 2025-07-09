// Variables de estado
let currentScreen = "login";
let isManualMode = false;
let devices = {
  waterPump: false,
  fan: false,
  lights: false,
  heatLEDs: false,
};

// Referencias a elementos del DOM
const screens = {
  login: document.getElementById("login-screen"),
  dashboard: document.getElementById("dashboard-screen"),
  manual: document.getElementById("manual-control-screen"),
  console: document.getElementById("console-screen"),
};

const loginBtn = document.getElementById("login-btn");
const manualModeBtn = document.getElementById("manual-mode-btn");
const autoModeBtn = document.getElementById("auto-mode-btn");
const backToDashboardBtns = [
  document.getElementById("back-to-dashboard-btn"),
  document.getElementById("back-to-dashboard-btn-2"),
];

// Control de dispositivos
const waterPumpBtn = document.getElementById("water-pump-btn");
const fanBtn = document.getElementById("fan-btn");
const lightsBtn = document.getElementById("lights-btn");
const heatLEDsBtn = document.getElementById("heat-leds-btn");

// Estado de dispositivos
const waterPumpStatus = document.getElementById("water-pump-status");
const fanStatus = document.getElementById("fan-status");
const lightsStatus = document.getElementById("lights-status");
const heatLEDsStatus = document.getElementById("heat-leds-status");

// Sensores
const tempValue = document.getElementById("temp-value");
const humidityValue = document.getElementById("humidity-value");
const lightValue = document.getElementById("light-value");
const waterValue = document.getElementById("water-value");
const systemStatus = document.getElementById("system-status");
const lastUpdate = document.getElementById("last-update");

// Event Listeners
loginBtn.addEventListener("click", () => {
  showScreen("dashboard");
  startSensorUpdates();
});

manualModeBtn.addEventListener("click", () => {
  isManualMode = true;
  manualModeBtn.classList.add("active");
  autoModeBtn.classList.remove("active");
  showScreen("manual");
});

autoModeBtn.addEventListener("click", () => {
  isManualMode = false;
  autoModeBtn.classList.add("active");
  manualModeBtn.classList.remove("active");
  showScreen("dashboard");
});

backToDashboardBtns.forEach((btn) => {
  btn.addEventListener("click", () => showScreen("dashboard"));
});

// Control de dispositivos
waterPumpBtn.addEventListener("click", () => toggleDevice("waterPump"));
fanBtn.addEventListener("click", () => toggleDevice("fan"));
lightsBtn.addEventListener("click", () => toggleDevice("lights"));
heatLEDsBtn.addEventListener("click", () => toggleDevice("heatLEDs"));

// Funciones
function showScreen(screenName) {
  currentScreen = screenName;
  Object.values(screens).forEach((screen) => (screen.style.display = "none"));
  screens[screenName].style.display = "block";
}

function toggleDevice(device) {
  devices[device] = !devices[device];
  updateDeviceStatus(device);
}

function updateDeviceStatus(device) {
  const isOn = devices[device];
  let btn, statusElement, statusText;

  switch (device) {
    case "waterPump":
      btn = waterPumpBtn;
      statusElement = waterPumpStatus;
      statusText = isOn ? "Encendida" : "Apagada";
      break;
    case "fan":
      btn = fanBtn;
      statusElement = fanStatus;
      statusText = isOn ? "Encendido" : "Apagado";
      break;
    case "lights":
      btn = lightsBtn;
      statusElement = lightsStatus;
      statusText = isOn ? "Encendidas" : "Apagadas";
      break;
    case "heatLEDs":
      btn = heatLEDsBtn;
      statusElement = heatLEDsStatus;
      statusText = isOn ? "Encendidos" : "Apagados";
      break;
  }

  btn.classList.remove("on", "off");
  btn.classList.add(isOn ? "on" : "off");
  statusElement.textContent = statusText;
}

function startSensorUpdates() {
  // Simular actualizaciones de sensores
  setInterval(() => {
    // Actualizar valores de sensores con valores aleatorios para simular
    const newTemp = 25 + Math.random() * 5;
    const newHumidity = 60 + Math.random() * 20;
    const lightLevels = ["Baja", "Media", "Alta"];
    const waterLevels = ["Bajo", "Suficiente", "Alto"];

    tempValue.textContent = newTemp.toFixed(1);
    humidityValue.textContent = Math.floor(newHumidity);
    lightValue.textContent = lightLevels[Math.floor(Math.random() * 3)];
    waterValue.textContent = waterLevels[Math.floor(Math.random() * 3)];

    // Actualizar estado del sistema basado en temperatura
    if (newTemp > 30) {
      systemStatus.textContent = "Caliente";
      document.querySelector(".status-indicator").className =
        "status-indicator status-warning";
    } else if (newTemp < 20) {
      systemStatus.textContent = "Frío";
      document.querySelector(".status-indicator").className =
        "status-indicator status-danger";
    } else {
      systemStatus.textContent = "Normal";
      document.querySelector(".status-indicator").className =
        "status-indicator status-normal";
    }

    // Actualizar tiempo desde última actualización
    const updateSeconds = Math.floor(Math.random() * 10) + 5;
    lastUpdate.textContent = updateSeconds;
  }, 3000);
}

// Inicialización
updateDeviceStatus("waterPump");
updateDeviceStatus("fan");
updateDeviceStatus("lights");
updateDeviceStatus("heatLEDs");
