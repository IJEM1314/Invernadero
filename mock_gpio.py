class GPIO:
    BCM = "BCM"
    OUT = "OUT"
    IN = "IN"
    HIGH = True
    LOW = False

    @staticmethod
    def setmode(mode):
        print(f"[GPIO] Modo seteado: {mode}")

    @staticmethod
    def setwarnings(flag):
        print(f"[GPIO] Warnings: {flag}")

    @staticmethod
    def setup(pin, mode):
        print(f"[GPIO] Pin {pin} configurado como {mode}")

    @staticmethod
    def output(pin, value):
        estado = "ALTO" if value else "BAJO"
        print(f"[GPIO] Pin {pin} seteado a {estado}")
