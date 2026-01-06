# 🚀 Guía de Despliegue - PulseBoard PWA

## 📍 Opciones de Despliegue

### Frontend (PWA)
- ✅ **GitHub Pages** (Recomendado - Gratis)
- ✅ **Vercel** (Gratis, muy fácil)
- ✅ **Netlify** (Gratis, excelente para PWAs)
- ✅ **Firebase Hosting** (Gratis, ideal si usas Firebase)

### Backend (Express + Socket.io)
- ✅ **Railway** (Gratis con límites)
- ✅ **Render** (Gratis con límites)
- ✅ **Fly.io** (Gratis con límites)
- ✅ **Heroku** (Pago, pero muy estable)

---

## 🎯 Despliegue en GitHub Pages

### Opción 1: Automático con GitHub Actions (Recomendado)

1. **Preparar el repositorio:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/PulseBoard-PWA.git
   git push -u origin main
   ```

2. **Habilitar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: selecciona "GitHub Actions"
   - Guarda

3. **El workflow se ejecutará automáticamente:**
   - Cada push a `main` desplegará automáticamente
   - La URL será: `https://TU_USUARIO.github.io/PulseBoard-PWA/`

### Opción 2: Manual con gh-pages

1. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Configurar el base path:**
   - El archivo `vite.config.js` ya está configurado
   - Si tu repo se llama diferente, actualiza el `base` en `vite.config.js`

3. **Desplegar:**
   ```bash
   npm run deploy
   ```

4. **Habilitar GitHub Pages:**
   - Settings → Pages
   - Source: selecciona la rama `gh-pages`
   - Guarda

---

## 🌐 Despliegue en Vercel (Alternativa Rápida)

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Desplegar:**
   ```bash
   vercel
   ```

3. **O conectar tu repo:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará Vite automáticamente
   - ¡Listo! Despliegue automático en cada push

**Ventajas:**
- ✅ URL personalizada gratuita
- ✅ HTTPS automático
- ✅ Despliegue automático
- ✅ Preview de PRs

---

## 🔧 Configuración Post-Despliegue

### 1. Actualizar Variables de Entorno

Después del despliegue, actualiza las URLs en tu código:

**Para GitHub Pages:**
```javascript
// En src/services/api.js y src/services/socket.js
const API_BASE_URL = 'https://tu-backend.railway.app/api'
const SOCKET_URL = 'https://tu-backend.railway.app'
```

### 2. Configurar CORS en el Backend

Asegúrate de que tu backend permita requests desde tu dominio:

```javascript
// En server/app.js
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://TU_USUARIO.github.io',
      'http://localhost:3000' // Para desarrollo
    ],
    methods: ['GET', 'POST'],
  },
})
```

---

## 🖥️ Despliegue del Backend

### Opción 1: Railway (Recomendado)

1. **Crear cuenta en [railway.app](https://railway.app)**

2. **Nuevo proyecto:**
   - New Project → Deploy from GitHub repo
   - Selecciona tu repositorio
   - Selecciona la carpeta `server`

3. **Variables de entorno:**
   ```
   PORT=5000
   CLIENT_URL=https://TU_USUARIO.github.io
   NODE_ENV=production
   ```

4. **Railway generará una URL automáticamente**

### Opción 2: Render

1. **Crear cuenta en [render.com](https://render.com)**

2. **Nuevo Web Service:**
   - Connect GitHub repo
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node app.js`

3. **Variables de entorno:**
   ```
   PORT=5000
   CLIENT_URL=https://TU_USUARIO.github.io
   ```

---

## 📝 Checklist de Despliegue

### Frontend
- [ ] Repositorio en GitHub creado
- [ ] GitHub Pages habilitado
- [ ] Workflow de GitHub Actions configurado
- [ ] Build exitoso
- [ ] PWA funciona correctamente
- [ ] Service Worker registrado
- [ ] Modo offline funciona

### Backend
- [ ] Backend desplegado (Railway/Render/etc)
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Socket.io funcionando
- [ ] URL del backend actualizada en el frontend

### Testing
- [ ] Probar instalación de PWA
- [ ] Probar modo offline
- [ ] Probar conexión Socket.io
- [ ] Probar todas las funcionalidades

---

## 🔗 URLs de Ejemplo

Después del despliegue tendrás:

- **Frontend:** `https://TU_USUARIO.github.io/PulseBoard-PWA/`
- **Backend:** `https://pulseboard-backend.railway.app` (ejemplo)

---

## 🐛 Solución de Problemas

### Problema: 404 en rutas
**Solución:** Asegúrate de que el `base` en `vite.config.js` coincida con el nombre de tu repo

### Problema: Service Worker no funciona
**Solución:** GitHub Pages requiere HTTPS, verifica que esté habilitado

### Problema: Socket.io no conecta
**Solución:** Verifica CORS en el backend y la URL en el frontend

### Problema: Build falla
**Solución:** Verifica que todas las dependencias estén en `package.json`

---

## 📚 Recursos

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)

---

## ✨ Próximos Pasos

1. Despliega el frontend en GitHub Pages
2. Despliega el backend en Railway o Render
3. Actualiza las URLs en el código
4. ¡Disfruta tu PWA en producción! 🎉
