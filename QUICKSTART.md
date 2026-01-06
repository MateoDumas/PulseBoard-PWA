# 🚀 Quick Start Guide

## Instalación Rápida

### 1. Instalar dependencias del frontend
```bash
npm install
```

### 2. Instalar dependencias del backend
```powershell
# PowerShell
cd server; npm install; cd ..

# O ejecutar por separado:
cd server
npm install
cd ..
```

### 3. Configurar variables de entorno
Copia `.env.example` a `.env` (si existe) o crea un archivo `.env` con:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Ejecutar el proyecto

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

O desde la carpeta server:
```bash
cd server
npm run dev
```

## 📱 Probar la PWA

1. Abre `http://localhost:3000` en tu navegador
2. Abre DevTools (F12) → Application → Service Workers
3. Verifica que el Service Worker esté registrado
4. En Chrome/Edge: Click en el ícono de instalación en la barra de direcciones
5. Prueba el modo offline: DevTools → Network → Offline

## 🎯 Características Implementadas

✅ React + Vite configurado
✅ Tailwind CSS (mobile-first)
✅ Routing con React Router
✅ Dashboard con datos mockeados
✅ Service Worker y cache
✅ Modo offline funcional
✅ Indicador online/offline
✅ Backend Express + Socket.io
✅ Actualizaciones en tiempo real
✅ Estructura escalable por features

## 📝 Notas

- Los iconos PWA (pwa-192x192.png, pwa-512x512.png) deben crearse y colocarse en `/public`
- Para producción: `npm run build`
- El Service Worker se registra automáticamente con vite-plugin-pwa
