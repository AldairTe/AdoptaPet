# AdoptaPet

Plataforma web para la gestión del proceso de adopción de mascotas en Lima, Perú. Conecta a adoptantes con refugios de manera eficiente y organizada, permitiendo registrar mascotas disponibles, gestionar solicitudes de adopción y administrar el sistema mediante un panel de control.

---

## Tecnologías

**Frontend**
- React + Vite
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express
- JWT (autenticación)

**Base de datos**
- MySQL

---

## Arquitectura

El proyecto implementa el patrón **MVC (Modelo - Vista - Controlador)** con una API REST desacoplada del frontend.

```
AdoptaPet/
├── backend/
│   ├── controllers/
│   │   ├── mascotasController.js
│   │   ├── solicitudesController.js
│   │   ├── usuariosController.js
│   │   ├── adopcionesController.js
│   │   └── refugiosController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── mascotasModel.js
│   │   ├── solicitudesModel.js
│   │   ├── adopcionesModel.js
│   │   ├── usuariosModel.js
│   │   └── refugiosModel.js
│   ├── routes/
│   │   ├── mascotasRoutes.js
│   │   ├── solicitudesRoutes.js
│   │   ├── usuariosRoutes.js
│   │   ├── adopcionesRoutes.js
│   │   └── refugiosRoutes.js
│   ├── db.js
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        ├── components/
        └── services/
```

---

## Funcionalidades

**Usuario adoptante**
- Registro e inicio de sesión
- Listado de mascotas disponibles con filtro por especie
- Vista de detalle de cada mascota
- Envío de solicitudes de adopción
- Historial y estado de sus solicitudes

**Administrador**
- Gestión completa de mascotas (crear, editar, eliminar)
- Gestión de solicitudes (aprobar o rechazar)
- Gestión de usuarios registrados

---

## Instalación local

**Requisitos previos**
- Node.js 18+
- MySQL

**Backend**

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=adoptapet
JWT_SECRET=tu_secreto_jwt
```

Inicia el servidor:

```bash
npm start
```

**Frontend**

```bash
cd frontend
npm install
```

Crea un archivo `.env` en la carpeta `frontend/` con:

```env
VITE_API_URL=http://localhost:5000
```

Inicia el frontend:

```bash
npm run dev
```

---

## Despliegue

| Servicio | Plataforma | URL |
|---|---|---|
| Frontend | Vercel | https://adopta-pet-black.vercel.app |
| Backend | Railway | https://adoptapet-production-54f4.up.railway.app |
| Base de datos | Railway MySQL | - |

---

## API Endpoints

**Mascotas**
```
GET    /api/mascotas
POST   /api/mascotas
PUT    /api/mascotas/:id
DELETE /api/mascotas/:id
```

**Solicitudes**
```
GET    /api/solicitudes
POST   /api/solicitudes
PUT    /api/solicitudes/:id/estado
DELETE /api/solicitudes/:id
```

**Usuarios**
```
POST   /api/usuarios/register
POST   /api/usuarios/login
GET    /api/usuarios
```

---

## Autor

Aldair Jhonatan Tello Castañeda  
Universidad Privada del Norte — Ingeniería de Sistemas  
Lima, Perú — 2026
