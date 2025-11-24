/**
 * Utilidades para el manejo de contraseñas
 * Utiliza bcrypt para hash y verificación segura de contraseñas
 */

const bcrypt = require('bcrypt');

// Número de rondas de sal para bcrypt (mayor = más seguro pero más lento)
const SALT_ROUNDS = 10;

/**
 * Crea un hash de una contraseña en texto plano
 * @param {string} plainPassword - Contraseña en texto plano
 * @returns {Promise<string>} - Hash de la contraseña
 * @example
 * const hashedPassword = await hashPassword('miContraseña123');
 */
async function hashPassword(plainPassword) {
  try {
    if (!plainPassword) {
      throw new Error('La contraseña no puede estar vacía');
    }
    
    const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hash;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    throw error;
  }
}

/**
 * Verifica si una contraseña en texto plano coincide con un hash
 * @param {string} plainPassword - Contraseña en texto plano a verificar
 * @param {string} hashedPassword - Hash almacenado en la base de datos
 * @returns {Promise<boolean>} - true si coincide, false si no
 * @example
 * const isValid = await verifyPassword('miContraseña123', hashedPassword);
 */
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    if (!plainPassword || !hashedPassword) {
      return false;
    }
    
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword
};
