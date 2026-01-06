# 🚀 Despliegue del Backend - Railway

## Opción 1: Railway (Recomendado - Más Fácil)

### Paso 1: Crear cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en **"Login"** o **"Start a New Project"**
3. Inicia sesión con tu cuenta de GitHub

### Paso 2: Crear nuevo proyecto

1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza Railway a acceder a tus repositorios
4. Selecciona el repositorio: **MateoDumas/PulseBoard-PWA**

### Paso 3: Configurar el servicio

1. Railway detectará automáticamente el proyecto
2. Click en **"Add Service"** → **"GitHub Repo"**
3. En **"Root Directory"**, escribe: `server`
4. Railway detectará automáticamente que es Node.js

### Paso 4: Configurar variables de entorno

1. Ve a la pestaña **"Variables"** de tu servicio
2. Agrega las siguientes variables:

```
PORT=5000
CLIENT_URL=https://mateodumas.github.io
NODE_ENV=production
```

### Paso 5: Desplegar

1. Railway comenzará a construir automáticamente
2. Espera a que termine el build (verás logs en tiempo real)
3. Una vez completado, Railway generará una URL automáticamente
4. La URL será algo como: `https://pulseboard-pwa-production.up.railway.app`

### Paso 6: Obtener la URL del backend

1. Ve a la pestaña **"Settings"** de tu servicio
2. En **"Domains"**, verás la URL pública
3. **Copia esa URL** - la necesitarás para el frontend

---

## Opción 2: Render (Alternativa Gratis)

### Paso 1: Crear cuenta

1. Ve a [render.com](https://render.com)
2. Inicia sesión con GitHub

### Paso 2: Crear Web Service

1. Click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio: **MateoDumas/PulseBoard-PWA**
3. Configura:
   - **Name**: `pulseboard-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Environment**: `Node`

### Paso 3: Variables de entorno

En la sección **"Environment"**, agrega:

```
PORT=5000
CLIENT_URL=https://mateodumas.github.io
NODE_ENV=production
```

### Paso 4: Desplegar

1. Click en **"Create Web Service"**
2. Render comenzará a construir
3. Espera a que termine (5-10 minutos)
4. Obtendrás una URL como: `https://pulseboard-backend.onrender.com`

---

## 🔧 Actualizar el Frontend con la URL del Backend

Una vez que tengas la URL del backend, actualiza el frontend:

### Opción A: Variables de entorno en GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Agrega los siguientes secrets:
   - `VITE_API_URL` = `https://tu-backend.railway.app/api`
   - `VITE_SOCKET_URL` = `https://tu-backend.railway.app`

4. Actualiza el workflow `.github/workflows/deploy.yml` para usar estos secrets:

```yaml
- name: Build
  run: npm run build
  env:
    GITHUB_PAGES: true
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
    VITE_SOCKET_URL: ${{ secrets.VITE_SOCKET_URL }}
```

### Opción B: Actualizar directamente en el código

Edita estos archivos y reemplaza las URLs:

**`src/services/api.js`:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tu-backend.railway.app/api'
```

**`src/services/socket.js`:**
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://tu-backend.railway.app'
```

Luego haz commit y push:
```bash
git add .
git commit -m "Update backend URLs"
git push
```

---

## ✅ Verificar que funciona

1. **Backend:**
   - Visita: `https://tu-backend.railway.app/api/health`
   - Deberías ver: `{"status":"ok","timestamp":"..."}`

2. **Frontend:**
   - Visita: `https://mateodumas.github.io/PulseBoard-PWA/`
   - Abre la consola del navegador
   - Deberías ver: `Socket connected: ...`

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"
- Verifica que el backend esté corriendo en Railway/Render
- Verifica que las URLs en el frontend sean correctas
- Verifica CORS en el backend

### Error: "CORS policy"
En `server/app.js`, asegúrate de que CORS permita tu dominio:
```javascript
cors: {
  origin: [
    'https://mateodumas.github.io',
    'http://localhost:3000'
  ],
}
```

### Error: "Port already in use"
Railway/Render asignan el puerto automáticamente. Usa:
```javascript
const PORT = process.env.PORT || 5000
```

---

## 📝 Checklist

- [ ] Backend desplegado en Railway/Render
- [ ] URL del backend obtenida
- [ ] Variables de entorno configuradas
- [ ] Frontend actualizado con la URL del backend
- [ ] CORS configurado correctamente
- [ ] Backend responde en `/api/health`
- [ ] Socket.io conecta correctamente
- [ ] Todo funciona en producción

---

## 🎉 ¡Listo!

Tu PWA completa estará funcionando con:
- ✅ Frontend en GitHub Pages
- ✅ Backend en Railway/Render
- ✅ Socket.io en tiempo real
- ✅ PWA completamente funcional
