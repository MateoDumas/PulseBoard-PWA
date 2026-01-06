# 🚂 Pasos para Desplegar en Railway

## Paso 1: Crear el Proyecto en Railway

1. En la pantalla que estás viendo, click en **"Deploy from GitHub repo"**
2. Autoriza Railway a acceder a tus repositorios de GitHub
3. Selecciona el repositorio: **MateoDumas/PulseBoard-PWA** (o el que tengas)

## Paso 2: Configurar el Servicio

1. Railway detectará automáticamente tu repositorio
2. Click en **"Add Service"** o en el botón **"New"** que ves en la interfaz
3. Selecciona **"GitHub Repo"**
4. **IMPORTANTE**: En la configuración del servicio, busca **"Root Directory"** o **"Working Directory"**
5. Escribe: `server` (esto le dice a Railway que solo use la carpeta server)

## Paso 3: Variables de Entorno

1. Una vez creado el servicio, ve a la pestaña **"Variables"**
2. Agrega estas variables:

```
PORT=5000
CLIENT_URL=https://mateodumas.github.io
NODE_ENV=production
```

**O si tu usuario de GitHub es diferente, usa:**
```
CLIENT_URL=https://TU_USUARIO.github.io
```

## Paso 4: Esperar el Despliegue

1. Railway comenzará a construir automáticamente
2. Verás logs en tiempo real
3. Espera a que termine (2-5 minutos)

## Paso 5: Obtener la URL

1. Una vez desplegado, ve a la pestaña **"Settings"**
2. En **"Domains"** o **"Networking"**, verás la URL pública
3. Será algo como: `https://pulseboard-pwa-production.up.railway.app`
4. **¡Copia esa URL!** La necesitarás para el frontend

## Paso 6: Verificar que Funciona

1. Visita la URL que obtuviste + `/api/health`
2. Ejemplo: `https://tu-backend.railway.app/api/health`
3. Deberías ver: `{"status":"ok","timestamp":"..."}`

## Paso 7: Actualizar el Frontend

Una vez que tengas la URL del backend, actualiza estos archivos:

**`src/services/api.js`** (línea 1):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://TU-BACKEND-URL.railway.app/api'
```

**`src/services/socket.js`** (línea 3):
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://TU-BACKEND-URL.railway.app'
```

Luego:
```bash
git add .
git commit -m "Update backend URLs"
git push
```

¡Y listo! 🎉
