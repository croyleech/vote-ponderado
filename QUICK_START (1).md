# ⚡ Guía Rápida - Vote Ponderado en 5 Pasos

## Paso 1️⃣: Crear BD Supabase (Gratis)

**Tiempo: 5 minutos**

1. Ve a https://supabase.com
2. Clic en **"Start your project"**
3. Regístrate con GitHub (más fácil)
4. Crea un proyecto nuevo:
   - Nombre: `vote-ponderado`
   - Región: Europe (Ireland)
   - Espera 3-5 minutos a que se cree

**Toma nota de:**
- `Project URL` (en Settings → API)
- `anon public` key (en Settings → API)

---

## Paso 2️⃣: Configurar BD (2 minutos)

1. En tu proyecto Supabase, ve a **SQL Editor**
2. Clic en **"New Query"**
3. Copia TODO el contenido de `setup-database.sql`
4. Pégalo en el editor
5. Clic en ▶️ (ejecutar)

✓ **Las tablas están creadas**

---

## Paso 3️⃣: Clonar o preparar código (5 minutos)

**Opción A: Con Git (Recomendado)**

```bash
# En tu terminal
git clone https://github.com/tu-usuario/vote-ponderado.git
cd vote-ponderado
```

**Opción B: Sin Git**

1. Descarga todos los archivos
2. Crea carpeta `vote-ponderado`
3. Coloca los archivos dentro

---

## Paso 4️⃣: Configurar variables (2 minutos)

1. Copia `.env.example` y renombralo a `.env`
2. Edita `.env` y rellena:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=tu-anon-key-aqui
PORT=3000
BASE_URL=http://localhost:3000
```

(Saca URL y KEY de Supabase → Settings → API)

---

## Paso 5️⃣: Desplegar en Railway (5 minutos)

1. Ve a https://railway.app
2. Clic en **"New Project"**
3. Selecciona **"Deploy from GitHub"**
4. Conecta tu cuenta GitHub
5. Selecciona el repositorio `vote-ponderado`
6. **Railway automáticamente:**
   - Detecta `package.json`
   - Instala dependencias
   - Ejecuta `npm start`

7. **Configura variables:**
   - Ve a **Variables**
   - Añade las 3 variables de tu `.env`

8. **Espera a que termine el deploy**
   - Tu app estará en: `https://vote-ponderado-[algo].railway.app`

---

## ✅ ¡LISTO!

Tu app está en el aire. Ahora:

1. **Abre la URL** que te dio Railway
2. **Modo "Crear votación"**
3. Escribe un título y opciones
4. Clic en **"Crear votación"**
5. **Copia el enlace** y comparte en WhatsApp

**Tus amigos pueden votar desde cualquier dispositivo** 🗳️

---

## 🆘 ¿No funciona?

### Railway dice "Build failed"
→ Abre **Logs** y busca el error. Verifica que tienes `package.json` y `server.js`

### "Cannot connect to database"
→ Verifica que en Railway pusiste las variables de Supabase correctamente

### "Votación no encontrada"
→ Asegurate de haber ejecutado el SQL en Supabase

### "Los votos no se guardan"
→ Abre consola (F12) y busca errores. Probablemente un error de conexión a BD

---

## 📞 Contacto & Soporte

Revisa `FULLSTACK_DEPLOY.md` para más detalles.

---

**¡Que disfrutes votando!** 🗳️✨
