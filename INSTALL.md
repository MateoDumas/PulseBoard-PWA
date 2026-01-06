# 📦 Guía de Instalación - Windows/PowerShell

## Instalación Paso a Paso

### 1. Instalar dependencias del frontend
```powershell
npm install
```

### 2. Instalar dependencias del backend

**Opción A - Comandos separados (recomendado):**
```powershell
cd server
npm install
cd ..
```

**Opción B - En una línea:**
```powershell
cd server; npm install; cd ..
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**En PowerShell:**
```powershell
# Si existe .env.example, copiarlo:
Copy-Item .env.example .env

# O crear manualmente el archivo .env
```

### 4. Ejecutar el proyecto

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - Backend:**
```powershell
npm run server
```

O desde la carpeta server:
```powershell
cd server
npm run dev
```

## ⚠️ Notas para PowerShell

- **NO uses `&&`**: En PowerShell, usa `;` o ejecuta comandos por separado
- **NO uses `cp`**: Usa `Copy-Item` o copia manualmente
- **Rutas**: Las rutas en PowerShell usan `\` o `/` (ambas funcionan)

## ✅ Verificar Instalación

1. Frontend corriendo en: `http://localhost:3000`
2. Backend corriendo en: `http://localhost:5000`
3. Verifica en DevTools → Application → Service Workers que el SW esté registrado

## 🐛 Solución de Problemas

**Error: "El token '&&' no es válido"**
- Solución: Usa `;` en lugar de `&&` o ejecuta comandos por separado

**Error: "cp no se reconoce"**
- Solución: Usa `Copy-Item` o copia el archivo manualmente

**Error: Módulos no encontrados**
- Solución: Asegúrate de haber ejecutado `npm install` en ambas carpetas (raíz y server)
