# API Blog — Actividad 8

## Tecnologías utilizadas

- Node.js
- Express
- MySQL (`mysql2`)
- `cors`
- pnpm como gestor de paquetes 

---

## Instalación y puesta en marcha

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/mgodoy02/api-blog
cd api-blog
pnpm install
```

### 2. Crear la base de datos

Importar el fichero `db/blog.sql` en en MySQL Workbench.

El fichero crea la base de datos `blog` con sus dos tablas e incluye datos de prueba.

### 3. Configurar las variables de entorno

Copiar el fichero de ejemplo y rellenar la contraseña de MySQL:

```bash
cp .env.example .env
```

```
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=blog
DB_PORT=3306
```

### 4. Arrancar el servidor

```bash
pnpm dev
```

El servidor queda escuchando en `http://localhost:3000`.

---

## Base de datos

Relación **1:N**: un autor puede escribir muchos posts y cada post pertenece a un único autor.

**autores**

| Campo | Tipo |
|---|---|
| id | INT, PK, AUTO_INCREMENT |
| nombre | VARCHAR(100), obligatorio |
| email | VARCHAR(150), obligatorio, único |
| imagen | VARCHAR(255), opcional (URL) |

**posts**

| Campo | Tipo |
|---|---|
| id | INT, PK, AUTO_INCREMENT |
| titulo | VARCHAR(200), obligatorio |
| descripcion | TEXT, obligatorio |
| fecha_creacion | DATETIME, por defecto la fecha actual |
| categoria | VARCHAR(50), obligatorio |
| autor_id | INT, FK → autores(id) |

---

## Endpoints

Todas las rutas parten del prefijo `/api`.

### Autores

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/autores` | Obtiene todos los autores |
| GET | `/api/autores/:autorId` | Obtiene un autor por su id |
| POST | `/api/autores` | Crea un autor |
| GET | `/api/autores/:autorId/posts` | Obtiene todos los posts de un autor |

### Posts

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/posts` | Obtiene todos los posts con los datos de su autor |
| GET | `/api/posts/:postId` | Obtiene un post por su id con los datos de su autor |
| POST | `/api/posts` | Crea un post |

### Ejemplos de body

**Crear autor** (`nombre` y `email` obligatorios):

```json
{
  "nombre": "Ana García",
  "email": "ana@mail.com",
  "imagen": "https://i.pravatar.cc/150?img=1"
}
```

**Crear post** (todos los campos obligatorios; `fecha_creacion` la asigna la base de datos):

```json
{
  "titulo": "Introducción a Express",
  "descripcion": "Cómo crear una API con Express y MySQL.",
  "categoria": "Programación",
  "autor_id": 1
}
```

### Ejemplo de respuesta de un post

Cada post se devuelve con los datos completos de su autor, no solo con su id:

```json
{
  "id": 1,
  "titulo": "Introducción a Express",
  "descripcion": "Cómo crear una API con Express y MySQL.",
  "fecha_creacion": "2026-11-15T17:20:00.000Z",
  "categoria": "Programación",
  "autor": {
    "id": 1,
    "nombre": "Ana García",
    "email": "ana@mail.com",
    "imagen": "https://i.pravatar.cc/150?img=1"
  }
}
```

### Códigos de respuesta

| Código | Cuándo |
|---|---|
| 200 | Petición correcta |
| 201 | Recurso creado |
| 400 | Faltan campos obligatorios o el autor indicado no existe |
| 404 | El autor o el post no existe, o la URL no existe |
| 500 | Error del servidor o de la base de datos (por ejemplo, email duplicado) |

---

## Pruebas

El fichero `requests.rest` contiene todas las peticiones de prueba, organizadas por criterio de la rúbrica. Se ejecutan con la extensión **REST Client** de VS Code (botón *Send Request* sobre cada petición).

---

## Estructura del proyecto

```
api-blog/
├── db/
│   └── blog.sql                  # Exportación de la base de datos
├── src/
│   ├── app.js                    # Configuración de Express, rutas y manejadores de error
│   ├── config/
│   │   └── db.js                 # Pool de conexiones a MySQL
│   ├── controllers/              # Lógica de cada endpoint
│   │   ├── autores.controller.js
│   │   └── posts.controller.js
│   ├── models/                   # Consultas SQL
│   │   ├── autor.model.js
│   │   └── post.model.js
│   └── routes/
│       ├── api.routes.js         # Prefijo /api
│       └── api/
│           ├── autores.routes.js
│           └── posts.routes.js
├── .env.example
├── index.js                      # Arranque del servidor
├── package.json
└── requests.rest                 # Peticiones de prueba
```

Cada petición sigue el flujo **ruta → controlador → modelo → MySQL**.