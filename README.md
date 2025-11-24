# FullSound-MongoDB

Proyecto Node.js con MongoDB utilizando el driver nativo de MongoDB.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` con tu configuración de MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/fullsound
DB_NAME=fullsound
PORT=3000
```

## Scripts Disponibles

- `npm start` - Inicia la aplicación
- `npm run dev` - Modo desarrollo con nodemon
- `npm run seed` - Poblar base de datos con datos de ejemplo

## Sistema de Contraseñas

El proyecto utiliza bcrypt para hash seguro de contraseñas.

### Crear usuario
```javascript
const { crearUsuario } = require('./src/models/usuario');

await crearUsuario({
  nombre_usuario: 'usuario',
  correo: 'usuario@example.com',
  contrasena: 'contraseña',
  id_tipo_usuario: tipoUsuarioId
});
```

### Autenticar usuario
```javascript
const { autenticarUsuario } = require('./src/models/usuario');

const usuario = await autenticarUsuario('usuario@example.com', 'contraseña');
```

## Dependencias

- mongodb - Driver oficial de MongoDB
- bcrypt - Hash de contraseñas
- dotenv - Variables de entorno
- nodemon - Desarrollo

## Requisitos

- Node.js >= 14.x
- MongoDB >= 4.x
