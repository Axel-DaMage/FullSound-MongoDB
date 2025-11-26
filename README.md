# FullSound-MongoDB

Proyecto Node.js con MongoDB utilizando el driver nativo de MongoDB.

## Instalación de dependencias

```bash
npm install
```

## Configuración

Crea un archivo `.env` con tu configuración de MongoDB:

```env
MONGODB_URI=mongodb:tuconexionmongodb
DB_NAME=fullsound
PORT=3000
```

## Estructura del Proyecto

### Archivos Playground

El proyecto utiliza archivos MongoDB Playground para operaciones CRUD:

- `playground-0-ejecutar-todo.mongodb.js` - Ejecuta todos los playgrounds en secuencia
- `playground-1-drops.mongodb.js` - Elimina colecciones existentes
- `playground-2-esquema.mongodb.js` - Define esquemas de validación
- `playground-CRUD-usuarios.mongodb.js` - CRUD de usuarios
- `playground-CRUD-beats.mongodb.js` - CRUD de beats
- `playground-CRUD-compras.mongodb.js` - CRUD de compras y detalles
- `playground-CRUD-reproducciones.mongodb.js` - CRUD de reproducciones
- `playground-CRUD-comentarios.mongodb.js` - CRUD de comentarios
- `playground-CRUD-likes.mongodb.js` - CRUD de likes en beats

### Colecciones

- **usuario** - Usuarios del sistema
- **beat** - Beats musicales disponibles
- **compra** - Compras realizadas
- **compra_detalle** - Detalles de cada compra
- **reproduccion** - Reproducciones de beats (anónimas o autenticadas)
- **comentario** - Comentarios en beats (soporta anidación)
- **like_beat** - Likes dados a beats

## Dependencias

- mongodb - Driver oficial de MongoDB
- dotenv - Variables de entorno
- nodemon - Desarrollo

## Requisitos

- Node.js >= 14.x
- MongoDB >= 4.x
- MongoDB for VS Code (recomendado para ejecutar playgrounds)
