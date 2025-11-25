// MongoDB Playground - Ejecutar Todo Secuencialmente
// Este script ejecuta todos los playgrounds en orden correcto
// 1. Limpia la base de datos
// 2. Crea el esquema con validaciones
// 3. Pobla la base de datos
// 4. Ejecuta consultas de ejemplo

const { connect, close, getDb } = require('./src/config/database');
const { hashPassword } = require('./src/utils/password');

async function ejecutarTodo() {
    console.log('FULLSOUND - CONFIGURACIÓN COMPLETA');

    await connect();
    const db = getDb();

    // ==========================================
    // PASO 1: LIMPIAR BASE DE DATOS
    // ==========================================
    console.log('PASO 1/4: Limpiando base de datos...\n');
    
    try {
        await db.dropDatabase();
        console.log('OK - Base de datos eliminada\n');
    } catch (error) {
        console.log('AVISO - Base de datos no existía, continuando...\n');
    }

    // ==========================================
    // PASO 2: CREAR ESQUEMA CON VALIDACIONES
    // ==========================================
    console.log('PASO 2/4: Creando esquema con validaciones...\n');

    // Colección USUARIOS
    await db.createCollection('usuario', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nombre_usuario', 'correo', 'contrasena'],
                properties: {
                    nombre_usuario: {
                        bsonType: 'string',
                        maxLength: 50,
                        description: 'Nombre de usuario único'
                    },
                    correo: {
                        bsonType: 'string',
                        maxLength: 50,
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                        description: 'Correo electrónico válido'
                    },
                    contrasena: {
                        bsonType: 'string',
                        maxLength: 255,
                        description: 'Contraseña hasheada'
                    },
                    fecha_registro: {
                        bsonType: 'date',
                        description: 'Fecha de registro del usuario'
                    }
                }
            }
        }
    });

    await db.collection('usuario').createIndex({ nombre_usuario: 1 }, { unique: true });
    await db.collection('usuario').createIndex({ correo: 1 }, { unique: true });
    console.log('OK - Coleccion "usuario" creada con indices unicos');

    // Colección BEATS
    await db.createCollection('beat', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['titulo', 'genero', 'precio', 'usuario_id'],
                properties: {
                    titulo: {
                        bsonType: 'string',
                        maxLength: 150,
                        description: 'Título del beat'
                    },
                    genero: {
                        bsonType: 'string',
                        maxLength: 100,
                        description: 'Género musical'
                    },
                    precio: {
                        bsonType: ['int', 'double', 'long'],
                        minimum: 0,
                        description: 'Precio del beat en CLP'
                    },
                    usuario_id: {
                        bsonType: 'objectId',
                        description: 'Referencia al usuario creador'
                    },
                    reproducciones: {
                        bsonType: ['int', 'double', 'long'],
                        minimum: 0,
                        description: 'Contador de reproducciones'
                    },
                    likes: {
                        bsonType: ['int', 'double', 'long'],
                        minimum: 0,
                        description: 'Contador de likes'
                    }
                }
            }
        }
    });

    await db.collection('beat').createIndex({ usuario_id: 1 });
    await db.collection('beat').createIndex({ genero: 1 });
    console.log('OK - Coleccion "beat" creada con indices\n');

    // ==========================================
    // PASO 3: POBLAR BASE DE DATOS
    // ==========================================
    console.log('PASO 3/4: Poblando base de datos...\n');

    // Crear usuarios
    console.log('Creando usuarios...');
    const usuarios = await db.collection('usuario').insertMany([
        {
            nombre_usuario: 'maria_music',
            correo: 'maria@example.com',
            contrasena: await hashPassword('hash1'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'ana_star',
            correo: 'ana@example.com',
            contrasena: await hashPassword('hash2'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'dj_luis',
            correo: 'dj_luis@example.com',
            contrasena: await hashPassword('hash3'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'carlos_groove',
            correo: 'carlos@example.com',
            contrasena: await hashPassword('hash4'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'sofia_beats',
            correo: 'sofia@example.com',
            contrasena: await hashPassword('hash5'),
            fecha_registro: new Date()
        }
    ]);

    console.log(`OK - ${Object.keys(usuarios.insertedIds).length} usuarios creados`);

    // Obtener usuarios
    const maria = await db.collection('usuario').findOne({ nombre_usuario: 'maria_music' });
    const ana = await db.collection('usuario').findOne({ nombre_usuario: 'ana_star' });
    const dj_luis = await db.collection('usuario').findOne({ nombre_usuario: 'dj_luis' });
    const carlos = await db.collection('usuario').findOne({ nombre_usuario: 'carlos_groove' });
    const sofia = await db.collection('usuario').findOne({ nombre_usuario: 'sofia_beats' });

    // Crear beats
    console.log('Creando beats...');
    const beats = await db.collection('beat').insertMany([
        {
            titulo: 'Cielo Azul Beat',
            genero: 'Trap',
            descripcion: 'Beat relajante perfecto para rap consciente',
            precio: 19900,
            bpm: 85,
            usuario_id: maria._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/cielo-azul-beat.mp3',
            portada_url: '/images/cielo-azul-beat.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Rock del Sur Instrumental',
            genero: 'Rock',
            descripcion: 'Base rock con guitarras pesadas',
            precio: 27500,
            bpm: 120,
            usuario_id: maria._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/rock-del-sur.mp3',
            portada_url: '/images/rock-del-sur.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Latidos Urbanos',
            genero: 'Hip-Hop',
            descripcion: 'Beat urbano con 808s potentes',
            precio: 22900,
            bpm: 95,
            usuario_id: ana._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/latidos-urbanos.mp3',
            portada_url: '/images/latidos-urbanos.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Fiesta en la Ciudad',
            genero: 'Reggaeton',
            descripcion: 'Beat reggaeton para fiestas',
            precio: 21900,
            bpm: 98,
            usuario_id: dj_luis._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/fiesta-ciudad.mp3',
            portada_url: '/images/fiesta-ciudad.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Sombras Nocturnas',
            genero: 'Trap',
            descripcion: 'Beat oscuro con atmósfera nocturna',
            precio: 31900,
            bpm: 150,
            usuario_id: carlos._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/sombras-nocturnas.mp3',
            portada_url: '/images/sombras-nocturnas.jpg',
            reproducciones: 0,
            likes: 0
        }
    ]);

    console.log(`OK - ${Object.keys(beats.insertedIds).length} beats creados`);

    // Crear likes
    console.log('Creando likes...');
    await db.collection('like_beat').insertMany([
        { usuario_id: maria._id, beat_id: beats.insertedIds['0'], fecha: new Date() },
        { usuario_id: ana._id, beat_id: beats.insertedIds['1'], fecha: new Date() },
        { usuario_id: carlos._id, beat_id: beats.insertedIds['2'], fecha: new Date() }
    ]);
    console.log('OK - Likes creados');

    // Crear reproducciones
    console.log('Creando reproducciones...');
    await db.collection('reproduccion').insertMany([
        { beat_id: beats.insertedIds['0'], usuario_id: maria._id, fecha: new Date() },
        { beat_id: beats.insertedIds['0'], usuario_id: ana._id, fecha: new Date() },
        { beat_id: beats.insertedIds['1'], usuario_id: dj_luis._id, fecha: new Date() }
    ]);
    console.log('OK - Reproducciones creadas');

    // Crear comentarios
    console.log('Creando comentarios...');
    await db.collection('comentario').insertMany([
        {
            usuario_id: maria._id,
            beat_id: beats.insertedIds['0'],
            contenido: 'Este beat está increíble!',
            fecha: new Date(),
            editado: false
        },
        {
            usuario_id: ana._id,
            beat_id: beats.insertedIds['2'],
            contenido: 'Muy profesional, me encanta.',
            fecha: new Date(),
            editado: false
        }
    ]);
    console.log('OK - Comentarios creados\n');

    // ==========================================
    // PASO 4: CONSULTAS DE EJEMPLO
    // ==========================================
    console.log('PASO 4/4: Ejecutando consultas de ejemplo...\n');

    // Estadísticas generales
    console.log('===============================================');
    console.log('           ESTADISTICAS GENERALES');
    console.log('===============================================\n');

    const totalUsuarios = await db.collection('usuario').countDocuments();
    const totalBeats = await db.collection('beat').countDocuments();
    const totalLikes = await db.collection('like_beat').countDocuments();
    const totalRepro = await db.collection('reproduccion').countDocuments();
    const totalComentarios = await db.collection('comentario').countDocuments();

    console.log(`Total usuarios: ${totalUsuarios}`);
    console.log(`Total beats: ${totalBeats}`);
    console.log(`Total likes: ${totalLikes}`);
    console.log(`Total reproducciones: ${totalRepro}`);
    console.log(`Total comentarios: ${totalComentarios}\n`);

    // Beats con artistas (JOIN)
    console.log('===============================================');
    console.log('        BEATS CON ARTISTAS ($lookup)');
    console.log('===============================================\n');

    const beatsConArtistas = await db.collection('beat').aggregate([
        {
            $lookup: {
                from: 'usuario',
                localField: 'usuario_id',
                foreignField: '_id',
                as: 'artista'
            }
        },
        { $unwind: '$artista' },
        {
            $project: {
                titulo: 1,
                genero: 1,
                precio: 1,
                artista: '$artista.nombre_usuario'
            }
        },
        { $limit: 5 }
    ]).toArray();

    beatsConArtistas.forEach(beat => {
        console.log(`• ${beat.titulo} - ${beat.genero} (por ${beat.artista}) - $${beat.precio} CLP`);
    });

    // Beats por género
    console.log('\n===============================================');
    console.log('           BEATS POR GENERO ($group)');
    console.log('===============================================\n');

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

    beatsPorGenero.forEach(genero => {
        console.log(`• ${genero._id}: ${genero.cantidad} beats - Precio promedio: $${Math.round(genero.precio_promedio)} CLP`);
    });

    console.log('\n===============================================');
    console.log('   OK - CONFIGURACION COMPLETADA EXITOSAMENTE');
    console.log('===============================================\n');

    console.log('Archivos del proyecto:');
    console.log('   - playground-1-drops.mongodb.js - Limpiar BD');
    console.log('   - playground-2-esquema.mongodb.js - Crear esquema');
    console.log('   - playground-3-poblar.mongodb.js - Poblar datos');
    console.log('   - playground-4-querys.mongodb.js - Consultas avanzadas');
    console.log('   - playground-0-ejecutar-todo.mongodb.js - Este archivo\n');

    await close();
}

// Ejecutar todo
ejecutarTodo().catch(error => {
    console.error('\nERROR durante la ejecucion:', error);
    process.exit(1);
});
