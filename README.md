# FullSound-MongoDB

Proyecto Node.js con MongoDB utilizando el driver nativo de MongoDB.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tu configuración de MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/fullsound
DB_NAME=fullsound
PORT=3000
```

## 📦 Estructura del Proyecto

```
FullSound-MongoDB/
├── src/
│   ├── config/
│   │   └── database.js      # Configuración de conexión a MongoDB
│   ├── controllers/         # Controladores de la aplicación
│   ├── models/              # Modelos de datos
│   ├── routes/              # Rutas de la aplicación
│   └── index.js             # Punto de entrada principal
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Scripts Disponibles

- `npm start` - Inicia la aplicación en modo producción
- `npm run dev` - Inicia la aplicación en modo desarrollo con nodemon (reinicio automático)

## 💾 Uso de MongoDB

### Conectar a la base de datos

```javascript
const { connect, getDb } = require('./config/database');

async function ejemplo() {
  await connect();
  const db = getDb();
  
  // Usar la base de datos
  const collection = db.collection('usuarios');
  const usuarios = await collection.find({}).toArray();
  console.log(usuarios);
}
```

## 📚 Dependencias

- **mongodb**: Driver oficial de MongoDB para Node.js
- **dotenv**: Gestión de variables de entorno
- **nodemon**: Herramienta de desarrollo para reinicio automático

## 🔧 Requisitos

- Node.js >= 14.x
- MongoDB >= 4.x (local o MongoDB Atlas)

## 📝 Licencia

ISC
