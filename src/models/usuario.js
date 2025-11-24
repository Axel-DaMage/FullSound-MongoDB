/**
 * Operaciones de usuarios con manejo seguro de contraseñas
 */

const { getDb } = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/password');
const { ObjectId } = require('mongodb');

/**
 * Crea un nuevo usuario con contraseña hasheada
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.nombre_usuario - Nombre de usuario único
 * @param {string} userData.correo - Correo electrónico único
 * @param {string} userData.contrasena - Contraseña en texto plano (será hasheada automáticamente)
 * @returns {Promise<Object>} - Usuario creado (sin la contraseña)
 */
async function crearUsuario(userData) {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    // Verificar que la contraseña esté presente
    if (!userData.contrasena) {
      throw new Error('La contraseña es requerida');
    }
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await usuariosCollection.findOne({
      $or: [
        { nombre_usuario: userData.nombre_usuario },
        { correo: userData.correo }
      ]
    });
    
    if (usuarioExistente) {
      throw new Error('El nombre de usuario o correo ya está registrado');
    }
    
    // Hashear la contraseña ANTES de guardar
    const contrasenaHasheada = await hashPassword(userData.contrasena);
    
    // Crear el objeto usuario con la contraseña hasheada
    const nuevoUsuario = {
      nombre_usuario: userData.nombre_usuario,
      correo: userData.correo,
      contrasena: contrasenaHasheada, // Se guarda el hash, NO el texto plano
      fecha_registro: new Date()
    };
    
    // Insertar en la base de datos
    const resultado = await usuariosCollection.insertOne(nuevoUsuario);
    
    // Retornar el usuario sin la contraseña
    const usuarioCreado = await usuariosCollection.findOne(
      { _id: resultado.insertedId },
      { projection: { contrasena: 0 } } // Excluir contraseña
    );
    
    console.log('Usuario creado exitosamente:', usuarioCreado.nombre_usuario);
    return usuarioCreado;
    
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    throw error;
  }
}

/**
 * Autentica un usuario verificando su contraseña
 * @param {string} correo - Correo del usuario
 * @param {string} contrasenaPlana - Contraseña en texto plano
 * @returns {Promise<Object|null>} - Usuario autenticado (sin contraseña) o null si falla
 */
async function autenticarUsuario(correo, contrasenaPlana) {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    // Buscar usuario por correo (INCLUYENDO la contraseña para verificarla)
    const usuario = await usuariosCollection.findOne({ correo });
    
    if (!usuario) {
      console.log('Usuario no encontrado');
      return null;
    }
    
    // Verificar la contraseña
    const esValida = await verifyPassword(contrasenaPlana, usuario.contrasena);
    
    if (!esValida) {
      console.log('Contraseña incorrecta');
      return null;
    }
    
    // Retornar usuario SIN la contraseña
    const { contrasena, ...usuarioSinContrasena } = usuario;
    
    console.log('Usuario autenticado:', usuarioSinContrasena.nombre_usuario);
    return usuarioSinContrasena;
    
  } catch (error) {
    console.error('Error al autenticar usuario:', error.message);
    throw error;
  }
}

/**
 * Obtiene un usuario por ID (sin mostrar la contraseña hasheada)
 * @param {string|ObjectId} userId - ID del usuario
 * @returns {Promise<Object|null>} - Usuario encontrado o null
 */
async function obtenerUsuario(userId) {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    const usuario = await usuariosCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { contrasena: 0 } } // NO incluir contraseña
    );
    
    return usuario;
    
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    throw error;
  }
}

/**
 * Obtiene un usuario por ID INCLUYENDO su contraseña hasheada
 * ⚠️ USAR SOLO CUANDO SEA ABSOLUTAMENTE NECESARIO
 * @param {string|ObjectId} userId - ID del usuario
 * @returns {Promise<Object|null>} - Usuario con contraseña hasheada
 */
async function obtenerUsuarioConHash(userId) {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    const usuario = await usuariosCollection.findOne(
      { _id: new ObjectId(userId) }
    );
    
    if (usuario) {
      console.log('Contraseña hasheada obtenida para:', usuario.nombre_usuario);
      console.log('Hash:', usuario.contrasena);
    }
    
    return usuario;
    
  } catch (error) {
    console.error('Error al obtener usuario con hash:', error.message);
    throw error;
  }
}

/**
 * Actualiza la contraseña de un usuario
 * @param {string|ObjectId} userId - ID del usuario
 * @param {string} nuevaContrasena - Nueva contraseña en texto plano
 * @returns {Promise<boolean>} - true si se actualizó exitosamente
 */
async function actualizarContrasena(userId, nuevaContrasena) {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    // Hashear la nueva contraseña
    const nuevoHash = await hashPassword(nuevaContrasena);
    
    // Actualizar en la base de datos
    const resultado = await usuariosCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { contrasena: nuevoHash } }
    );
    
    if (resultado.modifiedCount > 0) {
      console.log('Contraseña actualizada exitosamente');
      return true;
    }
    
    return false;
    
  } catch (error) {
    console.error('Error al actualizar contraseña:', error.message);
    throw error;
  }
}

/**
 * Lista todos los usuarios (sin contraseñas)
 * @returns {Promise<Array>} - Array de usuarios
 */
async function listarUsuarios() {
  try {
    const db = getDb();
    const usuariosCollection = db.collection('usuario');
    
    const usuarios = await usuariosCollection
      .find({}, { projection: { contrasena: 0 } })
      .toArray();
    
    return usuarios;
    
  } catch (error) {
    console.error('Error al listar usuarios:', error.message);
    throw error;
  }
}

module.exports = {
  crearUsuario,
  autenticarUsuario,
  obtenerUsuario,
  obtenerUsuarioConHash,
  actualizarContrasena,
  listarUsuarios
};
