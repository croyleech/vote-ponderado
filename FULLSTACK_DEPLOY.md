# 🚀 Guía de Despliegue - Vote Ponderado (Fullstack)

Esta es la versión **con persistencia real en base de datos**. Los votos se guardan en Supabase y es accesible desde cualquier dispositivo/navegador.

---

## ⚡ INICIO RÁPIDO (20 minutos)

### Paso 1: Crear cuenta y BD en Supabase (gratis)

1. **Ve a https://supabase.com** y regístrate (con GitHub es más fácil)
2. **Crea un nuevo proyecto**
   - Nombre: `vote-ponderado`
   - Region: Europa (ej: Ireland)
   - Espera a que se cree (3-5 min)

3. **Copia las credenciales**
   - En el proyecto, ve a **Settings → API**
   - Copia:
     - `Project URL` (será tu `SUPABASE_URL`)
     - `anon public` key (será tu `SUPABASE_KEY`)

4. **Configura la base de datos**
   - Ve a **SQL Editor**
   - Crea una nueva consulta
   - Copia todo el contenido de `setup-database.sql`
   - Pégalo y ejecuta (click en ▶️)

### Paso 2: Preparar código local

```bash
# Clonar o descargar el proyecto
git clone https://github.com/tu-usuario/vote-ponderado.git
cd vote-ponderado

# Copiar variables de entorno
cp .env.example .env

# EDITAR .env con tus credenciales de Supabase
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_KEY=tu-anon-key-aqui
```

### Paso 3: Desplegar en Railway (gratis)

1. **Ve a https://railway.app**
2. **Haz login con GitHub**
3. **Crea un nuevo proyecto**
   - Selecciona "Deploy from GitHub"
   - Conecta tu repositorio
   - Selecciona `vote-ponderado`

4. **Configura variables de entorno**
   - Ve a **Variables**
   - Añade las variables desde tu `.env`:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_KEY=tu-anon-key
     PORT=3000
     BASE_URL=https://tu-railway-app.railway.app
     ```

5. **Deploy automático**
   - Railway automáticamente detecta `package.json`
   - Ejecuta `npm install` y `npm start`
   - ¡En 2 minutos está corriendo!

6. **Copia la URL**
   - Tu app estará en: `https://vote-ponderado-[random].railway.app`

---

## 🌍 Alternativas de Despliegue

### Opción A: Render (También gratis)

1. Ve a https://render.com
2. Conecta GitHub
3. Nuevo "Web Service"
4. Selecciona tu repositorio
5. Configura:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Añade variables de entorno (SUPABASE_URL, SUPABASE_KEY)
7. Deploy

### Opción B: Heroku (Gratis con limitaciones)

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Crear app
heroku create vote-ponderado

# Añadir variables
heroku config:set SUPABASE_URL=https://...
heroku config:set SUPABASE_KEY=tu-key

# Desplegar
git push heroku main
```

### Opción C: Tu propio servidor VPS

Con DigitalOcean, Linode, Hetzner, etc:

```bash
# En tu servidor (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar código
git clone https://github.com/tu-usuario/vote-ponderado.git
cd vote-ponderado

# Instalar dependencias
npm install

# Crear archivo .env con credenciales
nano .env

# Ejecutar
npm start

# Para que corra 24/7, usar PM2:
npm install -g pm2
pm2 start server.js --name "vote-ponderado"
pm2 startup
pm2 save
```

---

## 📱 Cómo Usar la App

### 👤 Crear una votación (como organizador)

1. Abre la app en tu navegador
2. Modo **"Crear votación"**
3. Escribe:
   - **Título**: "¿A dónde vamos el fin de semana?"
   - **Descripción**: "Decidamos juntos dónde pasar el sábado"
   - **Opciones**: Playa, Montaña, Cine, etc.
4. Haz clic en **"Crear votación"**
5. Se genera un enlace único → **Cópialo**
6. **Comparte en WhatsApp**:
   ```
   🗳️ ¿A dónde vamos el fin de semana?
   https://tu-app.railway.app?poll=poll_abc123
   ```

### 👥 Votar (como amigo)

1. Abre el enlace que recibiste
2. Automáticamente ve el modo **"Votar"**
3. **Arrastra las opciones** en orden de preferencia:
   - 1ª posición (arriba) = lo que más quieres → **4 puntos**
   - 2ª posición → **3 puntos**
   - 3ª posición → **2 puntos**
   - 4ª posición (abajo) → **1 punto**
4. Haz clic en **"Enviar voto"**
5. ✓ Tu voto se guarda en la base de datos

### 📊 Ver resultados

Los resultados se actualizan **cada 3 segundos**:
- Ves los puntos totales
- Porcentajes
- Barras visuales

**El ganador** es la opción con más puntos ponderados.

---

## 🔐 Seguridad & Limitaciones

### ¿Qué está protegido?
- ✅ HTTPS automático en Railway/Render
- ✅ Base de datos en Supabase (GDPR compliant)
- ✅ Votos anónimos (no se guarda IP ni ID)
- ✅ Datos persistentes (no se pierden)

### ¿Qué NO está protegido?
- ❌ Alguien puede votar múltiples veces desde diferentes navegadores/incógnito
- ❌ La URL es pública (si la conoces, puedes votar)
- ❌ No hay autenticación/login

**Para producción seria**: Añadir:
- Sistema de login
- Rate limiting
- Restricción por IP
- Honeypot para bots

---

## 📊 Monitorear BD en Supabase

1. Ve a tu proyecto en supabase.com
2. Ve a **Table Editor**
3. Ve tablas:
   - `polls` - Tus votaciones
   - `votes` - Todos los votos registrados

4. Puedes ver en tiempo real:
   - Cuántos votos hay
   - Quién votó qué orden
   - Timestamps

---

## 🆘 Solución de Problemas

### "Error: Cannot connect to database"
- Verifica que SUPABASE_URL y SUPABASE_KEY están en `.env`
- Comprueba en Railway → Variables que están configuradas
- Abre `https://app.supabase.com` y verifica que el proyecto existe

### "La votación no se encuentra"
- El ID de votación en la URL es inválido
- Verifica que copiaste el enlace completo
- Crea una votación nueva

### "Los votos no se guardan"
- Abre la consola (F12 → Console)
- Busca errores de red
- Verifica que Supabase está corriendo

### "Railway dice "Build failed""
- Abre logs: Railway → Deployments → Usa recent
- Busca el error
- Verifica que `package.json` tiene las dependencias correctas
- Verifica que `server.js` existe

### "¿Cómo veo los logs?"
**Railway:**
- Ve a tu app → Deployments → Logs

**Render:**
- Ve a tu servicio → Logs

---

## 💡 Mejoras Futuras

```javascript
// Autenticación con Google/GitHub
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})

// Rate limiting (máx 1 voto por IP)
const ip = req.headers['x-forwarded-for'];

// Exportar resultados a CSV
const csv = results.map(r => `${r.name},${r.points}`).join('\n');

// Webhooks para notificaciones
await fetch('https://hooks.slack.com/...', { 
  body: JSON.stringify({ text: `Nuevo voto en: ${poll.title}` })
});

// Análisis: gráficos de evolución
// Análisis: qué opción ganó por mayores votos
// Análisis: estadísticas por hora
```

---

## 📚 Documentación

- **Supabase**: https://supabase.com/docs
- **Express**: https://expressjs.com
- **Railway**: https://docs.railway.app
- **Render**: https://render.com/docs

---

## ✨ Resumen

| Componente | Dónde | Gratis |
|-----------|-------|--------|
| **BD** | Supabase | ✅ 500MB |
| **Backend** | Railway/Render | ✅ 5GB/mes |
| **Frontend** | Mismo servidor | ✅ |

**Costo total: 0€ (para uso casual)**

---

¡Disfruta votando! 🗳️

