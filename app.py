from flask import Flask, render_template
try:
    import RPi.GPIO as GPIO
except (ImportError, RuntimeError):
    from mock_gpio import GPIO
    print("⚠️ Simulando RPi.GPIO (modo desarrollo)")

# Config de GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Pines
PIN_BOMBA = 17
PIN_VENTILADOR = 27
PIN_LEDS = 22

# Configurarlos como salida
GPIO.setup(PIN_BOMBA, GPIO.OUT)
GPIO.setup(PIN_VENTILADOR, GPIO.OUT)
GPIO.setup(PIN_LEDS, GPIO.OUT)

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
