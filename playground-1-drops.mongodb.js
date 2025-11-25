// MongoDB Playground - Limpiar Base de Datos FullSound
// Este script elimina todas las colecciones y la base de datos

use('fullsound');

console.log('Eliminando base de datos FullSound...\n');

const colecciones = ['usuario', 'beat', 'like_beat', 'reproduccion', 'comentario', 'compra', 'compra_detalle'];

colecciones.forEach(col => {
    try {
        db[col].drop();
        console.log(`Colección "${col}" eliminada`);
    } catch (error) {
        console.log(`Colección "${col}" no existe`);
    }
});

console.log('\nTodas las colecciones eliminadas\n');
