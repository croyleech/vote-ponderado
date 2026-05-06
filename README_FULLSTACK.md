# 🗳️ Vote Ponderado - Fullstack Edition

Aplicación web de votaciones ponderadas **con persistencia en base de datos real**. Los votos se guardan en Supabase y son accesibles desde cualquier dispositivo.

## 🎯 Características

✅ **Votaciones ponderadas** - Mayor preferencia = más puntos  
✅ **Persistencia real** - Base de datos Supabase  
✅ **Tiempo real** - Resultados actualizan cada 3 segundos  
✅ **Multiplayer** - Cualquiera puede votar desde cualquier dispositivo  
✅ **Fácil de compartir** - Una URL para todos  
✅ **Responsive** - Funciona en móvil y desktop  
✅ **Sin configuración** - Solo Supabase + Railway/Render  

## 🚀 Despliegue Rápido (20 minutos)

### 1️⃣ Crear BD en Supabase

```bash
# Ve a https://supabase.com
# 1. Crea cuenta (gratis)
# 2. Nuevo proyecto (escoge región Europe)
# 3. Ve a SQL Editor
# 4. Copia y ejecuta el contenido de setup-database.sql
# 5. Copia tu SUPABASE_URL y SUPABASE_KEY (Settings → API)
```

### 2️⃣ Desplegar en Railway

```bash
# 1. Ve a https://railway.app
# 2. Conecta tu GitHub
# 3. "New Project" → "Deploy from GitHub"
# 4. Selecciona este repositorio
# 5. Añade variables de entorno:
#    - SUPABASE_URL
#    - SUPABASE_KEY
#    - BASE_URL=https://tu-railway-app.railway.app
# 6. ¡Listo! Deploy automático
```

**Tu app estará en:** `https://vote-ponderado-[random].railway.app`

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales de Supabase
nano .env

# Correr en localhost:3000
npm start

# O con nodemon (auto-reload)
npm run dev
```

---

## 📊 Cómo Funciona

### Crear Votación
```
1. Abre la app
2. Modo "Crear votación"
3. Escribe: Título + Descripción + Opciones
4. Clic en "Crear votación"
5. Se genera URL única → Comparte en WhatsApp
```

### Votar
```
1. Amigo abre el enlace
2. Automáticamente en modo "Votar"
3. Arrastra opciones por orden de preferencia
4. Clic en "Enviar voto"
5. ✓ Guardado en BD
```

### Resultados
```
Se actualizan cada 3 segundos:
- Opción A: 12 puntos (48%)
- Opción B: 9 puntos (36%)
- Opción C: 4 puntos (16%)
```

### Sistema de Puntos

Con **4 opciones**:
- 1ª preferencia (arriba): **4 puntos**
- 2ª preferencia: **3 puntos**
- 3ª preferencia: **2 puntos**
- 4ª preferencia (abajo): **1 punto**

**Total por voto:** 10 puntos

---

## 📁 Estructura del Proyecto

```
vote-ponderado/
├── server.js                 # Backend Express + API
├── package.json             # Dependencias
├── .env.example             # Variables ejemplo
├── setup-database.sql       # Script BD Supabase
├── public/
│   └── index.html          # Frontend
├── FULLSTACK_DEPLOY.md     # Guía detallada
└── README.md               # Este archivo
```

## 🔌 API Endpoints

### Crear votación
```
POST /api/polls
{
  "title": "¿A dónde vamos?",
  "description": "Elige tu destino favorito",
  "options": ["Playa", "Montaña", "Cine"]
}
→ { id: "poll_abc123", url: "..." }
```

### Obtener votación
```
GET /api/polls/:pollId
→ { id, title, options, totalVotes, results: [...] }
```

### Registrar voto
```
POST /api/polls/:pollId/vote
{
  "voteOrder": ["Playa", "Montaña", "Cine"]
}
→ { success: true, results: [...], totalVotes: 5 }
```

---

## 🗂️ Base de Datos

### Tabla `polls`
```sql
id          TEXT (primary key)
title       TEXT
description TEXT
options     JSONB (array de opciones)
total_votes INTEGER
created_at  TIMESTAMP
```

### Tabla `votes`
```sql
id          UUID (primary key)
poll_id     TEXT (foreign key)
vote_order  JSONB (array ordenado)
created_at  TIMESTAMP
```

---

## 🚢 Alternativas de Despliegue

| Servicio | Gratis | Fácil | Notas |
|----------|--------|-------|-------|
| **Railway** | ✅ | ⭐⭐⭐⭐⭐ | Recomendado |
| **Render** | ✅ | ⭐⭐⭐⭐ | También muy bueno |
| **Heroku** | ✅ | ⭐⭐⭐⭐ | Free tier limitado |
| **VPS** | ❌ | ⭐⭐ | Máximo control |

**Recomendación:** Railway es lo más fácil y rápido.

---

## 🔒 Notas de Seguridad

### Está protegido:
- ✅ HTTPS automático
- ✅ Base de datos encriptada (Supabase)
- ✅ Votos anónimos
- ✅ RLS (Row Level Security)

### No está protegido:
- ⚠️ Alguien puede votar múltiples veces (diferentes navegadores)
- ⚠️ URL pública (sin login)
- ⚠️ Sin validación de usuario

**Para votaciones serias:** Implementar autenticación + rate limiting.

---

## 🆘 Troubleshooting

**"Cannot connect to database"**
- Verifica SUPABASE_URL y SUPABASE_KEY en .env
- Comprueba en Railway que están las variables

**"Votación no encontrada"**
- Asegúrate que el ID en la URL es correcto
- Crea una nueva votación de prueba

**"Los votos no se guardan"**
- Abre F12 → Console en navegador
- Busca errores de red
- Verifica que Supabase está disponible

**"Build failed en Railway"**
- Abre Deployments → Logs
- Busca el error específico
- Verifica package.json y server.js

---

## 📈 Estadísticas & Monitoreo

Accede a Supabase para ver en tiempo real:
- Tabla `polls`: Todas las votaciones creadas
- Tabla `votes`: Todos los votos registrados
- Estadísticas de uso
- Rendimiento de BD

---

## 🎨 Personalización

Edita en `public/index.html`:
- Colores (variables CSS `:root`)
- Textos y etiquetas
- Añade logo/branding

Edita en `server.js`:
- Lógica de cálculo de puntos
- Validaciones adicionales
- Rate limiting

---

## 📝 Variables de Entorno

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# Server
PORT=3000
BASE_URL=https://tu-app.railway.app
NODE_ENV=production
```

---

## 📚 Más Información

- Guía detallada: Ver `FULLSTACK_DEPLOY.md`
- Supabase docs: https://supabase.com/docs
- Express docs: https://expressjs.com
- Railway docs: https://docs.railway.app

---

## 💡 Ideas Futuras

- [ ] Autenticación con Google/GitHub
- [ ] Exportar resultados a CSV
- [ ] Gráficos de evolución temporal
- [ ] Análisis estadístico
- [ ] Notificaciones por email
- [ ] Temas personalizados
- [ ] Límite de tiempo para votar
- [ ] Votaciones privadas con PIN

---

## 📄 Licencia

MIT - Úsalo libremente

---

**Hecho para votaciones entre amigos con persistencia real** 🗳️
