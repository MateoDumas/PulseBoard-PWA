# 🚀 Despliegue Rápido - GitHub Pages

## Pasos Rápidos

### 1. Preparar el Repositorio

```bash
# Si aún no tienes git inicializado
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Conectar con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 2. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Guarda

### 3. ¡Listo!

El workflow de GitHub Actions se ejecutará automáticamente y tu PWA estará disponible en:

```
https://TU_USUARIO.github.io/TU_REPO/
```

**Nota:** Si tu repositorio se llama diferente a "PulseBoard-PWA", actualiza el `base` en `vite.config.js`:

```javascript
base: process.env.GITHUB_PAGES ? '/TU_REPO/' : '/',
```

## Despliegue del Backend

El backend necesita desplegarse por separado. Opciones recomendadas:

1. **Railway** (Más fácil): https://railway.app
2. **Render** (Gratis): https://render.com

Ver `DEPLOY.md` para instrucciones detalladas.

## Variables de Entorno

Después de desplegar el backend, actualiza las URLs en:
- `src/services/api.js`
- `src/services/socket.js`

O crea un archivo `.env.production` con:
```
VITE_API_URL=https://tu-backend.railway.app/api
VITE_SOCKET_URL=https://tu-backend.railway.app
```

¡Listo para producción! 🎉
