// MongoDB Playground - Consultas de Ejemplo FullSound
// Consultas comunes para el sistema

use('fullsound');

// ===== CONSULTAS DE USUARIOS =====
console.log('========== USUARIOS ==========\n');

// Listar todos los usuarios
console.log('Usuarios registrados:');
db.usuario.find({}, {
    contrasena: 0  // Excluir contraseña
}).forEach(user => console.log(user));

// ===== CONSULTAS DE BEATS =====
console.log('\n========== BEATS ==========\n');

// Beats más populares por reproducciones
console.log('Top 5 Beats por Reproducciones:');
db.beat.aggregate([
    {
        $lookup: {
            from: 'usuario',
            localField: 'usuario_id',
            foreignField: '_id',
            as: 'artista'
        }
    },
    {
        $unwind: '$artista'
    },
    {
        $sort: { reproducciones: -1 }
    },
    {
        $limit: 5
    },
    {
        $project: {
            titulo: 1,
            genero: 1,
            artista: '$artista.nombre_usuario',
            reproducciones: 1,
            likes: 1,
            precio: 1
        }
    }
]).forEach(beat => console.log(beat));

// Beats por género
console.log('\nBeats por Género:');
db.beat.aggregate([
    {
        $group: {
            _id: '$genero',
            cantidad: { $sum: 1 },
            precio_promedio: { $avg: '$precio' }
        }
    },
    {
        $sort: { cantidad: -1 }
    }
]).forEach(genero => console.log(genero));

// Beats de un artista específico
console.log('\nBeats de juan_producer:');
const juan = db.usuario.findOne({ nombre_usuario: 'juan_producer' });
db.beat.find({ usuario_id: juan._id }).forEach(beat => {
    console.log(`${beat.titulo} - ${beat.genero} - $${beat.precio}`);
});

// ===== CONSULTAS DE COMPRAS =====
console.log('\n========== COMPRAS ==========\n');

// Total de ventas
console.log('Estadísticas de Ventas:');
db.compra.aggregate([
    {
        $group: {
            _id: null,
            total_compras: { $sum: 1 },
            ingreso_total: { $sum: '$total_con_iva' },
            ingreso_promedio: { $avg: '$total_con_iva' }
        }
    }
]).forEach(stats => console.log(stats));

// Compras de un usuario con detalles
console.log('\nHistorial de Compras de carlos_listener:');
const carlos = db.usuario.findOne({ nombre_usuario: 'carlos_listener' });
db.compra.aggregate([
    {
        $match: { usuario_id: carlos._id }
    },
    {
        $lookup: {
            from: 'compra_detalle',
            localField: '_id',
            foreignField: 'compra_id',
            as: 'detalles'
        }
    },
    {
        $unwind: '$detalles'
    },
    {
        $lookup: {
            from: 'beat',
            localField: 'detalles.beat_id',
            foreignField: '_id',
            as: 'beat'
        }
    },
    {
        $unwind: '$beat'
    },
    {
        $project: {
            fecha: 1,
            beat_titulo: '$beat.titulo',
            precio_con_iva: '$detalles.precio_con_iva',
            total_compra: '$total_con_iva',
            estado: 1
        }
    }
]).forEach(compra => console.log(compra));

// ===== CONSULTAS DE REPRODUCCIONES =====
console.log('\n========== REPRODUCCIONES ==========\n');

// Reproducciones por beat
console.log('Top Beats por Reproducciones:');
db.reproduccion.aggregate([
    {
        $group: {
            _id: '$beat_id',
            total_reproducciones: { $sum: 1 },
            duracion_promedio: { $avg: '$duracion_segundos' }
        }
    },
    {
        $lookup: {
            from: 'beat',
            localField: '_id',
            foreignField: '_id',
            as: 'beat'
        }
    },
    {
        $unwind: '$beat'
    },
    {
        $sort: { total_reproducciones: -1 }
    },
    {
        $project: {
            titulo: '$beat.titulo',
            genero: '$beat.genero',
            total_reproducciones: 1,
            duracion_promedio: { $round: ['$duracion_promedio', 0] }
        }
    }
]).forEach(stat => console.log(stat));

// ===== CONSULTAS DE COMENTARIOS =====
console.log('\n========== COMENTARIOS ==========\n');

// Comentarios de un beat con información del usuario
console.log('Comentarios del beat "Trap Vibes":');
const trapBeat = db.beat.findOne({ titulo: 'Trap Vibes' });
db.comentario.aggregate([
    {
        $match: { beat_id: trapBeat._id }
    },
    {
        $lookup: {
            from: 'usuario',
            localField: 'usuario_id',
            foreignField: '_id',
            as: 'usuario'
        }
    },
    {
        $unwind: '$usuario'
    },
    {
        $sort: { fecha: -1 }
    },
    {
        $project: {
            autor: '$usuario.nombre_usuario',
            contenido: 1,
            fecha: 1
        }
    }
]).forEach(comentario => console.log(comentario));

// ===== CONSULTAS DE LIKES =====
console.log('\n========== LIKES ==========\n');

// Beats con más likes
console.log('Beats mas Likeados:');
db.like_beat.aggregate([
    {
        $group: {
            _id: '$beat_id',
            total_likes: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: 'beat',
            localField: '_id',
            foreignField: '_id',
            as: 'beat'
        }
    },
    {
        $unwind: '$beat'
    },
    {
        $sort: { total_likes: -1 }
    },
    {
        $project: {
            titulo: '$beat.titulo',
            genero: '$beat.genero',
            total_likes: 1
        }
    }
]).forEach(like => console.log(like));

// Likes de un usuario
console.log('\nBeats que le gustan a carlos_listener:');
db.like_beat.aggregate([
    {
        $match: { usuario_id: carlos._id }
    },
    {
        $lookup: {
            from: 'beat',
            localField: 'beat_id',
            foreignField: '_id',
            as: 'beat'
        }
    },
    {
        $unwind: '$beat'
    },
    {
        $project: {
            titulo: '$beat.titulo',
            genero: '$beat.genero',
            artista_id: '$beat.usuario_id',
            fecha_like: '$fecha'
        }
    },
    {
        $lookup: {
            from: 'usuario',
            localField: 'artista_id',
            foreignField: '_id',
            as: 'artista'
        }
    },
    {
        $unwind: '$artista'
    },
    {
        $project: {
            titulo: 1,
            genero: 1,
            artista: '$artista.nombre_usuario',
            fecha_like: 1
        }
    }
]).forEach(like => console.log(like));

// ===== CONSULTAS ANALÍTICAS =====
console.log('\n========== ANÁLISIS ==========\n');

// Ingresos por artista
console.log('Ingresos por Artista:');
db.compra_detalle.aggregate([
    {
        $lookup: {
            from: 'beat',
            localField: 'beat_id',
            foreignField: '_id',
            as: 'beat'
        }
    },
    {
        $unwind: '$beat'
    },
    {
        $lookup: {
            from: 'usuario',
            localField: 'beat.usuario_id',
            foreignField: '_id',
            as: 'artista'
        }
    },
    {
        $unwind: '$artista'
    },
    {
        $group: {
            _id: '$artista._id',
            nombre_artista: { $first: '$artista.nombre_usuario' },
            total_vendido: { $sum: '$precio_con_iva' },
            beats_vendidos: { $sum: 1 }
        }
    },
    {
        $sort: { total_vendido: -1 }
    }
]).forEach(artista => console.log(artista));

// Actividad reciente (últimas 24 horas simuladas)
console.log('\nActividad Reciente:');
const hace24h = new Date();
hace24h.setDate(hace24h.getDate() - 1);

console.log('Reproducciones recientes:', db.reproduccion.countDocuments({ fecha: { $gte: hace24h } }));
console.log('Likes recientes:', db.like_beat.countDocuments({ fecha: { $gte: hace24h } }));
console.log('Comentarios recientes:', db.comentario.countDocuments({ fecha: { $gte: hace24h } }));
console.log('Compras recientes:', db.compra.countDocuments({ fecha: { $gte: hace24h } }));

console.log('\nConsultas completadas');
