// MongoDB Playground - Datos de Ejemplo FullSound
// NOTA: Este script debe ejecutarse desde Node.js, no desde el playground de MongoDB
// Ejecutar con: node playground-3-seed-data.mongodb.js

const { connect, close, getDb } = require('./src/config/database');
const { hashPassword } = require('./src/utils/password');

async function seedData() {
    await connect();
    const db = getDb();

    // ===== PASO 1: CREAR USUARIOS CON CONTRASEÑAS HASHEADAS =====
    console.log('CREANDO USUARIOS');

    const usuarios = await db.collection('usuario').insertMany([
        {
            nombre_usuario: 'juan123',
            correo: 'juan@example.com',
            contrasena: await hashPassword('hash1'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'maria_music',
            correo: 'maria@example.com',
            contrasena: await hashPassword('hash2'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'rocklover',
            correo: 'rocklover@example.com',
            contrasena: await hashPassword('hash3'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'ana_star',
            correo: 'ana@example.com',
            contrasena: await hashPassword('hash4'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'dj_luis',
            correo: 'dj_luis@example.com',
            contrasena: await hashPassword('hash5'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'sofia_beats',
            correo: 'sofia@example.com',
            contrasena: await hashPassword('hash6'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'carlos_groove',
            correo: 'carlos@example.com',
            contrasena: await hashPassword('hash7'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'valentina',
            correo: 'valentina@example.com',
            contrasena: await hashPassword('hash8'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'raptor99',
            correo: 'raptor99@example.com',
            contrasena: await hashPassword('hash9'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'electrofan',
            correo: 'electrofan@example.com',
            contrasena: await hashPassword('hash10'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'music_maker',
            correo: 'musicmaker@example.com',
            contrasena: await hashPassword('hash11'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'beatmaster',
            correo: 'beatmaster@example.com',
            contrasena: await hashPassword('hash12'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'sound_creator',
            correo: 'soundcreator@example.com',
            contrasena: await hashPassword('hash13'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'track_pro',
            correo: 'trackpro@example.com',
            contrasena: await hashPassword('hash14'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'rythmer',
            correo: 'rythmer@example.com',
            contrasena: await hashPassword('hash15'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'listener_1',
            correo: 'listener1@example.com',
            contrasena: await hashPassword('hash16'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'audio_fan',
            correo: 'audiofan@example.com',
            contrasena: await hashPassword('hash17'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'melody_geek',
            correo: 'melodygeek@example.com',
            contrasena: await hashPassword('hash18'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'hiphop_head',
            correo: 'hiphophead@example.com',
            contrasena: await hashPassword('hash19'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'beat_seeker',
            correo: 'beatseeker@example.com',
            contrasena: await hashPassword('hash20'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'amoraga',
            correo: 'amoraga@example.com',
            contrasena: await hashPassword('hash21'),
            fecha_registro: new Date()
        },
        {
            nombre_usuario: 'scanchaya',
            correo: 'scanchaya@example.com',
            contrasena: await hashPassword('hash22'),
            fecha_registro: new Date()
        }
    ]);

    console.log('Usuarios creados:', usuarios.insertedIds);

    // ===== PASO 2: OBTENER IDs DE USUARIOS =====
    const maria = await db.collection('usuario').findOne({ nombre_usuario: 'maria_music' });
    const ana = await db.collection('usuario').findOne({ nombre_usuario: 'ana_star' });
    const dj_luis = await db.collection('usuario').findOne({ nombre_usuario: 'dj_luis' });
    const sofia = await db.collection('usuario').findOne({ nombre_usuario: 'sofia_beats' });
    const carlos = await db.collection('usuario').findOne({ nombre_usuario: 'carlos_groove' });

    // ===== PASO 3: CREAR BEATS =====
    console.log('CREANDO BEATS')
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
            titulo: 'Sueños Rotos',
            genero: 'Trap',
            descripcion: 'Instrumental melancólico con piano',
            precio: 24900,
            bpm: 140,
            usuario_id: ana._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/suenos-rotos.mp3',
            portada_url: '/images/suenos-rotos.jpg',
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
            titulo: 'Ecos del Mar',
            genero: 'Chill',
            descripcion: 'Sonidos ambientales con ritmo suave',
            precio: 17900,
            bpm: 70,
            usuario_id: sofia._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/ecos-mar.mp3',
            portada_url: '/images/ecos-mar.jpg',
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
        },
        {
            titulo: 'Voces en el Viento',
            genero: 'Trap',
            descripcion: 'Texturas etéreas con ritmo minimalista',
            precio: 19500,
            bpm: 75,
            usuario_id: maria._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/voces-viento.mp3',
            portada_url: '/images/voces-viento.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Noche Estelar',
            genero: 'Hip-Hop',
            descripcion: 'Soundscape nocturno con elementos espaciales',
            precio: 21500,
            bpm: 65,
            usuario_id: carlos._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/noche-estelar.mp3',
            portada_url: '/images/noche-estelar.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Senderos Perdidos',
            genero: 'Trap',
            descripcion: 'Elementos orgánicos con ritmo suave',
            precio: 20500,
            bpm: 110,
            usuario_id: maria._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/senderos-perdidos.mp3',
            portada_url: '/images/senderos-perdidos.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Vibraciones',
            genero: 'Funk',
            descripcion: 'Groove funky con bajo prominente',
            precio: 23500,
            bpm: 105,
            usuario_id: ana._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/vibraciones.mp3',
            portada_url: '/images/vibraciones.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Luz y Sombra',
            genero: 'Trap',
            descripcion: 'Beat cinematográfico con dinámicas',
            precio: 35900,
            bpm: 100,
            usuario_id: dj_luis._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/luz-sombra.mp3',
            portada_url: '/images/luz-sombra.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Energía Pura',
            genero: 'Cumbia',
            descripcion: 'Beat electrónico energético',
            precio: 29900,
            bpm: 130,
            usuario_id: sofia._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/energia-pura.mp3',
            portada_url: '/images/energia-pura.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'travesía',
            genero: 'Trap',
            descripcion: 'Fusión de instrumentos étnicos',
            precio: 27900,
            bpm: 115,
            usuario_id: carlos._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/travesia.mp3',
            portada_url: '/images/travesia.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Horizonte Rojo',
            genero: 'Rock',
            descripcion: 'Rock instrumental épico',
            precio: 28900,
            bpm: 125,
            usuario_id: maria._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/horizonte-rojo.mp3',
            portada_url: '/images/horizonte-rojo.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Reflejos',
            genero: 'Jazz',
            descripcion: 'Beat con elementos de jazz moderno',
            precio: 23900,
            bpm: 95,
            usuario_id: ana._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/reflejos.mp3',
            portada_url: '/images/reflejos.jpg',
            reproducciones: 0,
            likes: 0
        },
        {
            titulo: 'Pasión Urbana',
            genero: 'Cumbia',
            descripcion: 'Fusión de cumbia con ritmos latinos',
            precio: 25900,
            bpm: 102,
            usuario_id: dj_luis._id,
            fecha_subida: new Date(),
            archivo_url: '/audio/pasion-urbana.mp3',
            portada_url: '/images/pasion-urbana.jpg',
            reproducciones: 0,
            likes: 0
        }
    ]);

    console.log('Beats creados:', beats.insertedIds);

    // ===== CONSULTAS DE VERIFICACIÓN =====
    console.log('\n========== RESUMEN DE DATOS ==========\n');

    console.log('Total usuarios:', await db.collection('usuario').countDocuments());
    console.log('Total beats:', await db.collection('beat').countDocuments());
    console.log('Total reproducciones:', await db.collection('reproduccion').countDocuments());
    console.log('Total likes:', await db.collection('like_beat').countDocuments());
    console.log('Total comentarios:', await db.collection('comentario').countDocuments());
    console.log('Total compras:', await db.collection('compra').countDocuments());

    console.log('\n========== BEATS MÁS POPULARES ==========\n');
    const beatsPopulares = await db.collection('beat').find().sort({ reproducciones: -1, likes: -1 }).limit(3).toArray();
    beatsPopulares.forEach(beat => {
        console.log(`${beat.titulo} - ${beat.genero}`);
        console.log(`  Reproducciones: ${beat.reproducciones} | Likes: ${beat.likes} | Precio: $${beat.precio}`);
    });

    console.log('\nBase de datos poblada exitosamente');

    await close();
}

seedData().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
