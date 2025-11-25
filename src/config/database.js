const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'fullsound';

let client;
let db;

/**
 * Conecta a la base de datos MongoDB
 */
async function connect() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Conectado exitosamente a MongoDB');
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

/**
 * Obtiene la instancia de la base de datos
 */
function getDb() {
  if (!db) {
    throw new Error('Base de datos no inicializada. Llama a connect() primero.');
  }
  return db;
}

/**
 * Cierra la conexión a la base de datos
 */
async function close() {
  if (client) {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  }
}

module.exports = {
  connect,
  getDb,
  close
};
