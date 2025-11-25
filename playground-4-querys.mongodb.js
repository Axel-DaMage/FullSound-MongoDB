// playground-4-querys.mongodb.js
// Consultas FULLSOUND convertidas para Node.js

const { connect, close, getDb } = require('./src/config/database');

async function runQueries() {
    await connect();
    const db = getDb();

    console.log("========== USUARIOS ==========\n");

    // Listar usuarios sin contraseñas
    const usuarios = await db.collection('usuario')
        .find({}, { projection: { contrasena: 0 } })
        .toArray();

    console.log("Usuarios registrados:");
    usuarios.forEach(u => console.log(u));


    console.log("\n========== BEATS ==========\n");

    // Top 5 beats por reproducciones
    console.log("Top 5 Beats por Reproducciones:");
    const topBeats = await db.collection('beat').aggregate([
        {
            $lookup: {
                from: 'usuario',
                localField: 'usuario_id',
                foreignField: '_id',
                as: 'artista'
            }
        },
        { $unwind: '$artista' },
        { $sort: { reproducciones: -1 } },
        { $limit: 5 },
        {
            $project: {
                titulo: 1,
                genero: 1,
                reproducciones: 1,
                likes: 1,
                precio: 1,
                artista: '$artista.nombre_usuario'
            }
        }
    ]).toArray();

    topBeats.forEach(beat => console.log(beat));


    // Beats por género
    console.log("\nBeats por género:");
    const beatsPorGenero = await db.collection('beat').aggregate([
        {
            $group: {
                _id: '$genero',
                cantidad: { $sum: 1 },
                precio_promedio: { $avg: '$precio' }
            }
        },
        { $sort: { cantidad: -1 } }
    ]).toArray();

    beatsPorGenero.forEach(g => console.log(g));


    // Beats de un artista específico
    console.log("\nBeats de maria_music:");
    const maria = await db.collection('usuario').findOne({ nombre_usuario: 'maria_music' });

    if (maria) {
        const beatsMaria = await db.collection('beat')
            .find({ usuario_id: maria._id })
            .toArray();

        beatsMaria.forEach(beat => {
            console.log(`${beat.titulo} - ${beat.genero} - $${beat.precio}`);
        });
    }



    console.log("\n========== COMPRAS ==========\n");

    // Estadísticas de compras
    const statsCompras = await db.collection('compra').aggregate([
        {
            $group: {
                _id: null,
                total_compras: { $sum: 1 },
                ingreso_total: { $sum: '$total_con_iva' },
                ingreso_promedio: { $avg: '$total_con_iva' }
            }
        }
    ]).toArray();

    console.log("Estadísticas de ventas:");
    console.log(statsCompras[0]);


    // Historial de compras de un usuario
    console.log("\nHistorial de compras de juan123:");
    const juan = await db.collection('usuario').findOne({ nombre_usuario: 'juan123' });

    if (juan) {
        const comprasJuan = await db.collection('compra').aggregate([
            { $match: { usuario_id: juan._id } },
            {
                $lookup: {
                    from: 'compra_detalle',
                    localField: '_id',
                    foreignField: 'compra_id',
                    as: 'detalles'
                }
            },
            { $unwind: '$detalles' },
            {
                $lookup: {
                    from: 'beat',
                    localField: 'detalles.beat_id',
                    foreignField: '_id',
                    as: 'beat'
                }
            },
            { $unwind: '$beat' },
            {
                $project: {
                    fecha: 1,
                    beat_titulo: '$beat.titulo',
                    precio_con_iva: '$detalles.precio_con_iva',
                    total_compra: '$total_con_iva',
                    estado: 1
                }
            }
        ]).toArray();

        comprasJuan.forEach(c => console.log(c));
    }



    console.log("\n========== REPRODUCCIONES ==========\n");

    const reproducciones = await db.collection('reproduccion').aggregate([
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
        { $unwind: '$beat' },
        { $sort: { total_reproducciones: -1 } },
        {
            $project: {
                titulo: '$beat.titulo',
                genero: '$beat.genero',
                total_reproducciones: 1,
                duracion_promedio: 1
            }
        }
    ]).toArray();

    reproducciones.forEach(r => console.log(r));


    console.log("\n========== COMENTARIOS ==========\n");

    const primerBeat = await db.collection('beat').findOne();

    if (primerBeat) {
        const comentarios = await db.collection('comentario').aggregate([
            { $match: { beat_id: primerBeat._id } },
            {
                $lookup: {
                    from: 'usuario',
                    localField: 'usuario_id',
                    foreignField: '_id',
                    as: 'usuario'
                }
            },
            { $unwind: '$usuario' },
            { $sort: { fecha: -1 } },
            {
                $project: {
                    autor: '$usuario.nombre_usuario',
                    contenido: 1,
                    fecha: 1
                }
            }
        ]).toArray();

        comentarios.forEach(c => console.log(c));
    }



    console.log("\n========== LIKES ==========\n");

    const topLikes = await db.collection('like_beat').aggregate([
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
        { $unwind: '$beat' },
        { $sort: { total_likes: -1 } },
        {
            $project: {
                titulo: '$beat.titulo',
                genero: '$beat.genero',
                total_likes: 1
            }
        }
    ]).toArray();

    topLikes.forEach(l => console.log(l));


    console.log("\n========== ANÁLISIS ==========\n");

    const ingresos = await db.collection('compra_detalle').aggregate([
        {
            $lookup: {
                from: 'beat',
                localField: 'beat_id',
                foreignField: '_id',
                as: 'beat'
            }
        },
        { $unwind: '$beat' },
        {
            $lookup: {
                from: 'usuario',
                localField: 'beat.usuario_id',
                foreignField: '_id',
                as: 'artista'
            }
        },
        { $unwind: '$artista' },
        {
            $group: {
                _id: '$artista._id',
                artista: { $first: '$artista.nombre_usuario' },
                total_vendido: { $sum: '$precio_con_iva' },
                beats_vendidos: { $sum: 1 }
            }
        },
        { $sort: { total_vendido: -1 } }
    ]).toArray();

    ingresos.forEach(g => console.log(g));


    console.log("\n========== ACTIVIDAD RECIENTE ==========\n");

    const hace24h = new Date();
    hace24h.setDate(hace24h.getDate() - 1);

    console.log("Reproducciones recientes:", await db.collection('reproduccion').countDocuments({ fecha: { $gte: hace24h } }));
    console.log("Likes recientes:", await db.collection('like_beat').countDocuments({ fecha: { $gte: hace24h } }));
    console.log("Comentarios recientes:", await db.collection('comentario').countDocuments({ fecha: { $gte: hace24h } }));
    console.log("Compras recientes:", await db.collection('compra').countDocuments({ fecha: { $gte: hace24h } }));


    console.log("\nConsultas completadas ✔");

    await close();
}

runQueries();
