from flask import Flask, render_template, request, jsonify

# ========================== GPIO SETUP ==========================
try:
    import RPi.GPIO as GPIO
except (ImportError, RuntimeError):
    from mock_gpio import GPIO
    print("⚠️ Simulando RPi.GPIO (modo desarrollo)")

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# ========================== PINES ==========================
PIN_MAP = {
    "waterPump": 17,
    "fan": 27,
    "uvLEDs": 23,
    "lights": 22,
}

# Inicializar pines en estado bajo (apagado)
for pin in PIN_MAP.values():
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)

# ========================== ESTADO GLOBAL ==========================
is_auto_mode = True  # Modo por defecto

# ========================== APP ==========================
app = Flask(__name__)

# ========================== RUTAS ==========================
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/manual')
def manual():
    return render_template('manual.html')

@app.route('/console')
def console():
    return render_template('console.html')

@app.route('/toggle/<device>', methods=['POST'])
def toggle_device(device):
    global is_auto_mode
    if is_auto_mode:
        return jsonify({"error": "Modo automático activo. No se puede controlar manualmente."}), 403

    pin = PIN_MAP.get(device)
    if pin is None:
        return jsonify({"error": "Dispositivo no válido"}), 400

    current_state = GPIO.input(pin)
    new_state = GPIO.LOW if current_state else GPIO.HIGH
    GPIO.output(pin, new_state)

    return jsonify({"state": "on" if new_state == GPIO.HIGH else "off"})

@app.route('/set_mode', methods=['POST'])
def set_mode():
    global is_auto_mode
    data = request.get_json()
    is_auto_mode = data.get("auto", True)
    return jsonify({"mode": "auto" if is_auto_mode else "manual"})

@app.route('/status')
def status():
    return jsonify({
        "auto_mode": is_auto_mode,
        **{device: GPIO.input(pin) for device, pin in PIN_MAP.items()}
    })

# ========================== MAIN ==========================
if __name__ == '__main__':
    app.run(debug=True)
