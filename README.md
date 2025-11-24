# Taller Mecánico (Ionic 7 / Angular 20)

Aplicación de control integral para taller mecánico: login con roles (Administrador, Mecánico, Cajero), panel de control, clientes y vehículos, presupuestos y órdenes de servicio, inventario con alertas, control de personal, notas de venta y reportes. Incluye mocks de datos para probar sin backend.

## Requisitos
- Node 18+ (recomendado 20+), npm
- Ionic CLI (`npm i -g @ionic/cli`) opcional para `ionic serve`
- Capacitor + Android Studio/SDK si quieres emular en Android

## Instalar dependencias
```bash
npm install
```

## Ejecutar en web (dev)
```bash
npm start
# o
ionic serve
```
Abre http://localhost:4200

Credenciales demo:
- admin@torque.com / admin123 (Administrador)
- mecanico@torque.com / mecanico (Mecánico)
- caja@torque.com / caja123 (Cajero)

## Build web (www/)
```bash
npm run build
```

## Android (Capacitor)
Preparar una vez:
```bash
npx cap sync android
```
Abrir en Android Studio y correr en emulador/dispositivo:
```bash
npx cap open android
```

Desarrollo con live-reload en Android:
```bash
npm start   # en una terminal
npx cap run android -l --external   # en otra terminal
```
