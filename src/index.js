require('dotenv').config();
const { connect, close } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // Conectar a MongoDB
    const db = await connect();
    
    // Aquí puedes agregar tu lógica de aplicación
    console.log(`🚀 Servidor listo en el puerto ${PORT}`);
    console.log(`📊 Base de datos: ${db.databaseName}`);
    
    // Ejemplo: Listar colecciones existentes
    const collections = await db.listCollections().toArray();
    console.log('📁 Colecciones disponibles:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('Error en la aplicación:', error);
    process.exit(1);
  }
}

// Manejar cierre graceful
process.on('SIGINT', async () => {
  console.log('\n⚠️  Cerrando aplicación...');
  await close();
  process.exit(0);
});

// Iniciar aplicación
main();
