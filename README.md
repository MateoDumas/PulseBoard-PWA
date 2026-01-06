# PulseBoard PWA

Una Progressive Web App (PWA) moderna con React + Vite que demuestra arquitectura escalable, funcionalidades PWA reales y pensamiento profesional.

## 🏗️ Arquitectura

### Frontend (React + Vite + PWA)
```
src/
 ├── app/              # Configuración de la app (routing, providers)
 ├── components/       # Componentes reutilizables (layout, UI, charts)
 ├── features/         # Features por dominio (dashboard, notifications, offline)
 ├── hooks/            # Custom hooks (online status, service worker, socket)
 ├── services/         # Servicios externos (API, Socket, Push Notifications)
 ├── store/            # Estado global (Zustand)
 ├── pwa/              # Configuración PWA (service worker, cache strategies)
 └── styles/           # Estilos globales
```

### Backend (Node + Express)
```
server/
 ├── routes/           # Rutas de la API
 ├── controllers/      # Lógica de controladores
 ├── models/           # Modelos de datos
 ├── sockets/          # Handlers de Socket.io
 ├── services/         # Servicios del backend
 └── app.js            # Aplicación principal
```

## 🚀 Roadmap de Implementación

### 🟢 Fase 1 — Base sólida ✅
- [x] React + Vite configurado
- [x] Mobile-first con Tailwind CSS
- [x] Routing con React Router
- [x] Dashboard con datos mockeados
- [ ] Lighthouse > 85 (pendiente de optimización)

### 🟡 Fase 2 — PWA en serio ✅
- [x] manifest.json configurado
- [x] Service Worker implementado
- [x] Cache de assets
- [x] Modo offline funcional
- [x] Indicador online/offline

### 🟠 Fase 3 — Datos en tiempo real ✅
- [x] Backend con Express
- [x] Socket.io configurado
- [x] Actualización live del dashboard
- [x] Fallback a caché si no hay conexión

### 🔵 Fase 4 — Notificaciones Push
- [x] Estructura base para push notifications
- [ ] Firebase Cloud Messaging (requiere configuración)
- [ ] Permisos progresivos
- [ ] Notificaciones útiles (alertas reales)
- [ ] Deep link al dashboard

### 🔴 Fase 5 — Optimización PRO
- [ ] Lazy loading de componentes
- [ ] Code splitting
- [ ] IndexedDB para datos offline
- [ ] Lighthouse > 90

## 📦 Instalación

### Frontend
```bash
npm install
npm run dev
```

### Backend
```powershell
# PowerShell - ejecutar comandos por separado:
cd server
npm install
npm run dev

# O en una línea (PowerShell):
cd server; npm install; npm run dev
```

## 🔧 Configuración

1. Copia `.env.example` a `.env` y configura las variables:
```powershell
# PowerShell
Copy-Item .env.example .env

# O manualmente: crea un archivo .env con el contenido de .env.example
```

2. Para notificaciones push, configura Firebase:
   - Crea un proyecto en Firebase Console
   - Obtén las credenciales
   - Configura en `src/services/pushNotifications.js`

## 📱 Características PWA

- ✅ **Service Worker**: Cache de assets y estrategias offline
- ✅ **Manifest**: Configuración completa para instalación
- ✅ **Offline First**: Funciona sin conexión usando caché
- ✅ **Responsive**: Mobile-first design
- ✅ **Real-time**: Actualizaciones en tiempo real con Socket.io
- ✅ **Push Notifications**: Estructura lista (requiere Firebase)

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Zustand
- **Backend**: Node.js, Express, Socket.io
- **PWA**: Service Worker, Web App Manifest, Cache API
- **Charts**: Recharts
- **Real-time**: Socket.io Client/Server

## 📊 Estructura de Features

### Dashboard
- Métricas en tiempo real
- Gráficos interactivos
- Actualización automática cada 30s
- Fallback a datos mockeados cuando está offline

### Notificaciones
- Solicitud de permisos progresiva
- Notificaciones push (estructura lista)
- Manejo de clicks en notificaciones

### Offline
- Detección de estado online/offline
- Indicador visual en la UI
- Cache strategies para diferentes tipos de recursos

## 🎯 Próximos Pasos

1. **Optimización de Performance**
   - Implementar lazy loading
   - Code splitting por rutas
   - Optimizar imágenes

2. **IndexedDB**
   - Persistir datos del dashboard
   - Sincronización cuando vuelve la conexión

3. **Firebase Integration**
   - Configurar FCM para push notifications
   - Implementar autenticación (opcional)

4. **Testing**
   - Tests unitarios con Vitest
   - Tests E2E con Playwright

## 📝 Notas Técnicas

- El Service Worker usa estrategias de cache-first para assets estáticos
- Network-first para datos dinámicos con fallback a cache
- Socket.io se reconecta automáticamente
- El estado se maneja con Zustand para simplicidad

## 🔍 Lighthouse Score

Para mejorar el score de Lighthouse:
1. Optimizar imágenes (usar WebP, lazy loading)
2. Implementar code splitting
3. Reducir JavaScript no utilizado
4. Optimizar CSS crítico
5. Preload recursos importantes

## 📄 Licencia

MIT
