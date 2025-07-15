// ========================== CONSTANTES ==========================
const manualBtnsIDs = [
  "water-pump-btn",
  "fan-btn",
  "lights-btn",
  "uv-leds-btn",
];
const deviceMap = {
  waterPump: {
    btnId: "water-pump-btn",
    statusId: "water-pump-status",
    labelOn: "Encendida",
    labelOff: "Apagada",
  },
  fan: {
    btnId: "fan-btn",
    statusId: "fan-status",
    labelOn: "Encendido",
    labelOff: "Apagado",
  },
  lights: {
    btnId: "lights-btn",
    statusId: "lights-status",
    labelOn: "Encendidas",
    labelOff: "Apagadas",
  },
  uvLEDs: {
    btnId: "uv-leds-btn",
    statusId: "uv-leds-status",
    labelOn: "Encendidas",
    labelOff: "Apagadas",
  },
};

// ========================== ESTADO ==========================
let toggleDeviceState = {
  waterPump: false,
  fan: false,
  lights: false,
  uvLEDs: false,
};

// ========================== INICIALIZACIÓN ==========================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initDeviceButtons();
  fetchInitialStatus();
  updateSensorData();
});

// ========================== FUNCIONES ==========================
function initNavigation() {
  const navLinks = [
    { id: "login-btn", url: "/dashboard" },
    { id: "manual-mode-btn", url: "/manual" },
    { id: "auto-mode-btn", action: toggleMode },
    { id: "go-to-manual", url: "/manual" },
    { id: "go-to-console", url: "/console" },
  ];

  navLinks.forEach(({ id, url, action }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        if (action) action();
        else window.location.href = url;
      });
    }
  });

  const backBtns = document.querySelectorAll(
    "#back-to-dashboard-btn, #back-to-dashboard-btn-2"
  );
  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => (window.location.href = "/dashboard"));
  });
}

function initDeviceButtons() {
  Object.keys(deviceMap).forEach((device) => {
    const btn = document.getElementById(deviceMap[device].btnId);
    if (btn) btn.addEventListener("click", () => toggleDevice(device));
  });
}

function fetchInitialStatus() {
  fetch("/status")
    .then((res) => res.json())
    .then((status) => {
      for (let device in toggleDeviceState) {
        if (status.hasOwnProperty(device)) {
          toggleDeviceState[device] = status[device];
          updateDeviceStatus(device);
        }
      }
    });
}

function toggleDevice(device) {
  fetch(`/toggle/${device}`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      toggleDeviceState[device] = data.state === "on";
      updateDeviceStatus(device);
    })
    .catch((err) => console.error("Error:", err));
}

function updateDeviceStatus(device) {
  const isOn = toggleDeviceState[device];
  const { btnId, statusId, labelOn, labelOff } = deviceMap[device];
  const btn = document.getElementById(btnId);
  const statusElement = document.getElementById(statusId);

  if (btn && statusElement) {
    btn.classList.remove("on", "off");
    btn.classList.add(isOn ? "on" : "off");
    statusElement.textContent = isOn ? labelOn : labelOff;
  }
}

function setAutoMode() {
  fetch("/set_mode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auto: true }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Modo:", data.mode);

      // Deshabilitar acceso manual
      const manualBtn = document.getElementById("go-to-manual");
      const autoBtn = document.getElementById("auto-mode-btn");

      if (manualBtn) {
        manualBtn.classList.add("disabled");
        manualBtn.disabled = true;
      }

      if (autoBtn) {
        autoBtn.classList.add("active-auto");
      }

      disableManualControls();
    });
}

function toggleMode() {
  const autoBtn = document.getElementById("auto-mode-btn");
  const manualBtn = document.getElementById("go-to-manual");

  const isNowAuto = !autoBtn.classList.contains("active-auto");

  fetch("/set_mode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auto: isNowAuto }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (isNowAuto) {
        // Activar modo automático
        autoBtn.classList.add("active-auto");
        autoBtn.textContent = "Modo Automático: Activado";
        if (manualBtn) {
          manualBtn.classList.add("disabled");
          manualBtn.disabled = true;
        }
        disableManualControls();
      } else {
        // Activar modo manual
        autoBtn.classList.remove("active-auto");
        autoBtn.textContent = "Modo Automático: Desactivado";
        if (manualBtn) {
          manualBtn.classList.remove("disabled");
          manualBtn.disabled = false;
        }
        enableManualControls();
      }
    });
}

function enableManualControls() {
  manualBtnsIDs.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("disabled");
    }
  });
}

function disableManualControls() {
  manualBtnsIDs.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
  });
}

function updateSensorData() {
  const fixedValues = {
    temp: 26.5,
    humidity: 70,
    light: "Media",
    water: "Suficiente",
    status: "Normal",
    statusClass: "status-normal",
    lastUpdate: 3,
  };

  const tempValue = document.getElementById("temp-value");
  const humidityValue = document.getElementById("humidity-value");
  const lightValue = document.getElementById("light-value");
  const waterValue = document.getElementById("water-value");
  const systemStatus = document.getElementById("system-status");
  const lastUpdate = document.getElementById("last-update");
  const statusIndicator = document.querySelector(".status-indicator");

  if (tempValue) tempValue.textContent = fixedValues.temp;
  if (humidityValue) humidityValue.textContent = fixedValues.humidity;
  if (lightValue) lightValue.textContent = fixedValues.light;
  if (waterValue) waterValue.textContent = fixedValues.water;
  if (systemStatus) systemStatus.textContent = fixedValues.status;
  if (lastUpdate) lastUpdate.textContent = fixedValues.lastUpdate;
  if (statusIndicator) {
    statusIndicator.className = `status-indicator ${fixedValues.statusClass}`;
  }
}
