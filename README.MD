# Organizador de Tareas

Este proyecto es un backend para un organizador de tareas desarrollado con Node.js, Express y MongoDB. Permite gestionar tareas con rutas específicas para crearlas, actualizarlas, asignar usuarios y más.

## Requisitos

- Node.js 18+
- MongoDB instalado y corriendo en tu entorno

## Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env` y ajusta los valores según tu entorno:
     ```bash
     cp .env.example .env
     ```

   - Ejemplo de configuración en `.env`:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/nombre_bd
     JWT_SECRET=tu_secreto_de_jwt
     ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Dependencias

El proyecto utiliza las siguientes dependencias principales:

- `express`: Framework para construir la API.
- `mongoose`: ODM para interactuar con MongoDB.
- `bcryptjs`: Para el hashing de contraseñas.
- `dotenv`: Para la gestión de variables de entorno.
- `jsonwebtoken`: Para la autenticación basada en tokens.
- `cors`: Para habilitar solicitudes de origen cruzado.
- `zod`: Para la validación y definición de esquemas de datos.

## Estructura del Proyecto

```
project-root
├── src
│   ├── config
│   ├── controllers
│   ├── middelwares
│   ├── models
│   ├── routes
│   ├── validators
│   └── index.js
├── .env.example
├── package.json
└── README.md
```
