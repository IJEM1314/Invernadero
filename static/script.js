// Variables de estado
let toggleDeviceState = {
  waterPump: false,
  fan: false,
  lights: false,
  heatLEDs: false,
};

function toggleDevice(device) {
  toggleDeviceState[device] = !toggleDeviceState[device];
  updateDeviceStatus(device);
}

function updateDeviceStatus(device) {
  const isOn = toggleDeviceState[device];
  let btn, statusElement, statusText;

  switch (device) {
    case "waterPump":
      btn = document.getElementById("water-pump-btn");
      statusElement = document.getElementById("water-pump-status");
      statusText = isOn ? "Encendida" : "Apagada";
      break;
    case "fan":
      btn = document.getElementById("fan-btn");
      statusElement = document.getElementById("fan-status");
      statusText = isOn ? "Encendido" : "Apagado";
      break;
    case "lights":
      btn = document.getElementById("lights-btn");
      statusElement = document.getElementById("lights-status");
      statusText = isOn ? "Encendidas" : "Apagadas";
      break;
    case "heatLEDs":
      btn = document.getElementById("heat-leds-btn");
      statusElement = document.getElementById("heat-leds-status");
      statusText = isOn ? "Encendidos" : "Apagados";
      break;
  }

  if (btn && statusElement) {
    btn.classList.remove("on", "off");
    btn.classList.add(isOn ? "on" : "off");
    statusElement.textContent = statusText;
  }
}

function startSensorUpdates() {
  const tempValue = document.getElementById("temp-value");
  const humidityValue = document.getElementById("humidity-value");
  const lightValue = document.getElementById("light-value");
  const waterValue = document.getElementById("water-value");
  const systemStatus = document.getElementById("system-status");
  const lastUpdate = document.getElementById("last-update");

  setInterval(() => {
    const newTemp = 25 + Math.random() * 5;
    const newHumidity = 60 + Math.random() * 20;
    const lightLevels = ["Baja", "Media", "Alta"];
    const waterLevels = ["Bajo", "Suficiente", "Alto"];

    if (tempValue) tempValue.textContent = newTemp.toFixed(1);
    if (humidityValue) humidityValue.textContent = Math.floor(newHumidity);
    if (lightValue) lightValue.textContent = lightLevels[Math.floor(Math.random() * 3)];
    if (waterValue) waterValue.textContent = waterLevels[Math.floor(Math.random() * 3)];

    if (systemStatus && lastUpdate) {
      if (newTemp > 30) {
        systemStatus.textContent = "Caliente";
        document.querySelector(".status-indicator").className = "status-indicator status-warning";
      } else if (newTemp < 20) {
        systemStatus.textContent = "Frío";
        document.querySelector(".status-indicator").className = "status-indicator status-danger";
      } else {
        systemStatus.textContent = "Normal";
        document.querySelector(".status-indicator").className = "status-indicator status-normal";
      }
      lastUpdate.textContent = Math.floor(Math.random() * 10) + 5;
    }
  }, 3000);
}

// Inicializar estados si los botones existen (modo manual)
["waterPump", "fan", "lights", "heatLEDs"].forEach(updateDeviceStatus);

// Eventos de botones (para páginas individuales)
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const manualModeBtn = document.getElementById("manual-mode-btn");
  const autoModeBtn = document.getElementById("auto-mode-btn");
  const toManual = document.getElementById("go-to-manual");
  const toConsole = document.getElementById("go-to-console");

  if (loginBtn) loginBtn.addEventListener("click", () => (window.location.href = "/dashboard"));
  if (manualModeBtn) manualModeBtn.addEventListener("click", () => (window.location.href = "/manual"));
  if (autoModeBtn) autoModeBtn.addEventListener("click", () => (window.location.href = "/dashboard"));
  if (toManual) toManual.addEventListener("click", () => (window.location.href = "/manual"));
  if (toConsole) toConsole.addEventListener("click", () => (window.location.href = "/console"));

  const backBtns = document.querySelectorAll("#back-to-dashboard-btn, #back-to-dashboard-btn-2");
  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => (window.location.href = "/dashboard"));
  });

  const waterPumpBtn = document.getElementById("water-pump-btn");
  const fanBtn = document.getElementById("fan-btn");
  const lightsBtn = document.getElementById("lights-btn");
  const heatLEDsBtn = document.getElementById("heat-leds-btn");

  if (waterPumpBtn) waterPumpBtn.addEventListener("click", () => toggleDevice("waterPump"));
  if (fanBtn) fanBtn.addEventListener("click", () => toggleDevice("fan"));
  if (lightsBtn) lightsBtn.addEventListener("click", () => toggleDevice("lights"));
  if (heatLEDsBtn) heatLEDsBtn.addEventListener("click", () => toggleDevice("heatLEDs"));

  startSensorUpdates();
});
