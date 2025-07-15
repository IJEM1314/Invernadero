class MockGPIO:
    BCM = "BCM"
    OUT = "OUT"
    HIGH = True
    LOW = False

    def __init__(self):
        self.pins = {}

    def setmode(self, mode):
        print(f"[GPIO] Modo: {mode}")

    def setwarnings(self, flag):
        print(f"[GPIO] Warnings: {flag}")

    def setup(self, pin, mode):
        self.pins[pin] = self.LOW
        print(f"[GPIO] Setup pin {pin} como {mode}")

    def output(self, pin, state):
        self.pins[pin] = state
        print(f"[GPIO] Pin {pin} -> {'HIGH' if state else 'LOW'}")

    def input(self, pin):
        return self.pins.get(pin, self.LOW)

# Instancia simulada
GPIO = MockGPIO()
