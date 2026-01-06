# 🔗 Actualizar URLs del Backend

Una vez que tengas la URL de Railway (ej: `https://pulseboard-pwa-production.up.railway.app`):

## Opción 1: Actualizar directamente (Rápido)

Edita estos archivos y reemplaza `TU-BACKEND-URL` con tu URL real:

### `src/services/api.js` (línea 1):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://TU-BACKEND-URL.railway.app/api'
```

### `src/services/socket.js` (línea 3):
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://TU-BACKEND-URL.railway.app'
```

Luego ejecuta:
```bash
git add .
git commit -m "Update backend URLs"
git push
```

## Opción 2: Usar variables de entorno (Recomendado)

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Agrega estos secrets:
   - `VITE_API_URL` = `https://tu-backend.railway.app/api`
   - `VITE_SOCKET_URL` = `https://tu-backend.railway.app`

4. El workflow ya está configurado para usarlas automáticamente

## Verificar

1. Visita: `https://tu-backend.railway.app/api/health`
   - Deberías ver: `{"status":"ok","timestamp":"..."}`

2. Visita: `https://mateodumas.github.io/PulseBoard-PWA/`
   - Abre la consola del navegador
   - Deberías ver: `Socket connected: ...`
