# 🔄 Reiniciar GitHub Pages

## Pasos para Reiniciar

### Opción 1: Re-ejecutar el Workflow (Recomendado)

1. **Ve a tu repositorio:**
   - https://github.com/MateoDumas/PulseBoard-PWA

2. **Click en la pestaña "Actions"** (arriba)

3. **En el panel izquierdo, busca "Deploy to GitHub Pages"**

4. **Click en "Run workflow"** (botón morado en la parte superior derecha)

5. **Selecciona:**
   - Branch: `main`
   - Click en **"Run workflow"** (botón verde)

6. **Espera 2-3 minutos** mientras se ejecuta

7. **Verifica que termine exitosamente** (debe tener un ✓ verde)

8. **Visita:** `https://mateodumas.github.io/PulseBoard-PWA/`

### Opción 2: Verificar y Reconfigurar GitHub Pages

1. **Ve a Settings → Pages**

2. **Verifica que:**
   - Source: **"GitHub Actions"** (no "Deploy from a branch")
   - Si dice otra cosa, cámbialo a **"GitHub Actions"**

3. **Si no hay opción "GitHub Actions":**
   - Ve a **Settings → Actions → General**
   - En **"Workflow permissions"**, selecciona **"Read and write permissions"**
   - Guarda
   - Vuelve a **Settings → Pages**
   - Ahora debería aparecer **"GitHub Actions"**

4. **Después de configurar, re-ejecuta el workflow** (Opción 1)

### Opción 3: Verificar el Workflow

1. **Ve a Actions**

2. **Click en el último workflow ejecutado**

3. **Revisa los logs:**
   - Si hay errores (✗ rojo), haz clic y lee el mensaje
   - Si está en progreso (🟡 amarillo), espera
   - Si terminó exitosamente (✓ verde), el sitio debería estar funcionando

## Verificar que Funciona

Después de re-ejecutar:

1. **Espera 2-3 minutos** después de que termine el workflow

2. **Visita:** `https://mateodumas.github.io/PulseBoard-PWA/`

3. **Si ves una página en blanco:**
   - Abre la consola del navegador (F12)
   - Revisa si hay errores
   - Verifica la pestaña "Network" para ver qué archivos se están cargando

4. **Recarga con Ctrl+F5** (forzar recarga sin caché)

## Problemas Comunes

### "404 Not Found"
- Verifica que el base path en `vite.config.js` sea `/PulseBoard-PWA/`
- Verifica que el repositorio se llame exactamente `PulseBoard-PWA`

### "Workflow failed"
- Revisa los logs en Actions
- Verifica que todas las dependencias estén en `package.json`

### "Página en blanco"
- Abre la consola (F12) y revisa errores
- Verifica que los archivos se estén cargando en la pestaña Network
