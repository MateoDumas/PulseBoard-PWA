# 🚂 Configurar Root Directory en Railway

## Paso a Paso

1. **Haz clic en el link**: "Add Root Directory (used for build and deploy steps. Docs >)"
   - Está justo debajo de "Source Repo: MateoDumas/PulseBoard-PWA"

2. **Aparecerá un campo de texto** donde debes escribir:
   ```
   server
   ```

3. **Guarda los cambios** (debería guardarse automáticamente)

4. **Railway reiniciará el build automáticamente** con la configuración correcta

## Después de Configurar

Una vez configurado el Root Directory:

1. Ve a la pestaña **"Variables"** (al lado de "Settings")
2. Agrega estas variables de entorno:
   ```
   PORT=5000
   CLIENT_URL=https://mateodumas.github.io
   NODE_ENV=production
   ```

3. El servicio se desplegará automáticamente

4. Cuando termine, ve a **"Settings"** → **"Networking"** o **"Domains"** para obtener la URL pública

## Verificar que Funciona

1. Visita: `https://tu-backend.railway.app/api/health`
2. Deberías ver: `{"status":"ok","timestamp":"..."}`

¡Eso es todo! 🎉
