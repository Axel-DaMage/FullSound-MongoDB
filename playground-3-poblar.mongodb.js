// MongoDB Playground - Datos de Ejemplo FullSound
// NOTA: Este script debe ejecutarse desde Node.js, no desde el playground de MongoDB
// Ejecutar con: node playground-3-seed-data.mongodb.js

const { connect, close, getDb } = require('./src/config/database');
const { hashPassword } = require('./src/utils/password');

async function seedData() {
    await connect();
    const db = getDb();

    // ===== VERIFICAR SI YA HAY DATOS =====
    const usuariosExistentes = await db.collection('usuario').countDocuments();
    if (usuariosExistentes > 0) {
        console.log('\nLa base de datos ya contiene datos.');
        console.log('Por favor, ejecuta primero "playground-1-drops.mongodb.js" para limpiar la BD.\n');
        await close();
        return;
    }

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
    const juan123 = await db.collection('usuario').findOne({ nombre_usuario: 'juan123' });
    const maria = await db.collection('usuario').findOne({ nombre_usuario: 'maria_music' });
    const rocklover = await db.collection('usuario').findOne({ nombre_usuario: 'rocklover' });
    const ana = await db.collection('usuario').findOne({ nombre_usuario: 'ana_star' });
    const dj_luis = await db.collection('usuario').findOne({ nombre_usuario: 'dj_luis' });
    const sofia = await db.collection('usuario').findOne({ nombre_usuario: 'sofia_beats' });
    const carlos = await db.collection('usuario').findOne({ nombre_usuario: 'carlos_groove' });
    const valentina = await db.collection('usuario').findOne({ nombre_usuario: 'valentina' });
    const raptor99 = await db.collection('usuario').findOne({ nombre_usuario: 'raptor99' });
    const electrofan = await db.collection('usuario').findOne({ nombre_usuario: 'electrofan' });

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

    // ===== PASO 4: CREAR COMPRAS =====
    console.log('CREANDO COMPRAS');

    // Función auxiliar para calcular IVA
    const calcularCompra = (subtotal) => ({
        subtotal: subtotal,
        iva_total: Math.round(subtotal * 0.19 * 100) / 100,
        total_con_iva: Math.round(subtotal * 1.19 * 100) / 100
    });

    const compras = await db.collection('compra').insertMany([
        {
            usuario_id: juan123._id,
            ...calcularCompra(19900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: rocklover._id,
            ...calcularCompra(50400),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: valentina._id,
            ...calcularCompra(24900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: raptor99._id,
            ...calcularCompra(21900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: electrofan._id,
            ...calcularCompra(17900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: juan123._id,
            ...calcularCompra(31900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: rocklover._id,
            ...calcularCompra(19500),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: valentina._id,
            ...calcularCompra(42000),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: raptor99._id,
            ...calcularCompra(23500),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: juan123._id,
            ...calcularCompra(35900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: valentina._id,
            ...calcularCompra(29900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: electrofan._id,
            ...calcularCompra(27900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: juan123._id,
            ...calcularCompra(28900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: rocklover._id,
            ...calcularCompra(23900),
            fecha: new Date(),
            estado: 'completada'
        },
        {
            usuario_id: raptor99._id,
            ...calcularCompra(25900),
            fecha: new Date(),
            estado: 'completada'
        }
    ]);

    console.log('Compras creadas:', compras.insertedIds);

    // ===== PASO 5: CREAR DETALLES DE COMPRAS =====
    console.log('CREANDO DETALLES DE COMPRAS');

    await db.collection('compra_detalle').insertMany([
        // Compra 1, Beat 1
        {
            compra_id: compras.insertedIds['0'],
            beat_id: beats.insertedIds['0'],
            precio_base: 19900,
            iva_monto: Math.round(19900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(19900 * 1.19 * 100) / 100
        },
        // Compra 2, Beat 2
        {
            compra_id: compras.insertedIds['1'],
            beat_id: beats.insertedIds['1'],
            precio_base: 27500,
            iva_monto: Math.round(27500 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(27500 * 1.19 * 100) / 100
        },
        // Compra 2, Beat 3
        {
            compra_id: compras.insertedIds['1'],
            beat_id: beats.insertedIds['2'],
            precio_base: 22900,
            iva_monto: Math.round(22900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(22900 * 1.19 * 100) / 100
        },
        // Compra 3, Beat 4
        {
            compra_id: compras.insertedIds['2'],
            beat_id: beats.insertedIds['3'],
            precio_base: 24900,
            iva_monto: Math.round(24900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(24900 * 1.19 * 100) / 100
        },
        // Compra 4, Beat 5
        {
            compra_id: compras.insertedIds['3'],
            beat_id: beats.insertedIds['4'],
            precio_base: 21900,
            iva_monto: Math.round(21900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(21900 * 1.19 * 100) / 100
        },
        // Compra 5, Beat 6
        {
            compra_id: compras.insertedIds['4'],
            beat_id: beats.insertedIds['5'],
            precio_base: 17900,
            iva_monto: Math.round(17900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(17900 * 1.19 * 100) / 100
        },
        // Compra 6, Beat 7
        {
            compra_id: compras.insertedIds['5'],
            beat_id: beats.insertedIds['6'],
            precio_base: 31900,
            iva_monto: Math.round(31900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(31900 * 1.19 * 100) / 100
        },
        // Compra 7, Beat 8
        {
            compra_id: compras.insertedIds['6'],
            beat_id: beats.insertedIds['7'],
            precio_base: 19500,
            iva_monto: Math.round(19500 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(19500 * 1.19 * 100) / 100
        },
        // Compra 8, Beat 9
        {
            compra_id: compras.insertedIds['7'],
            beat_id: beats.insertedIds['8'],
            precio_base: 21500,
            iva_monto: Math.round(21500 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(21500 * 1.19 * 100) / 100
        },
        // Compra 8, Beat 10
        {
            compra_id: compras.insertedIds['7'],
            beat_id: beats.insertedIds['9'],
            precio_base: 20500,
            iva_monto: Math.round(20500 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(20500 * 1.19 * 100) / 100
        },
        // Compra 9, Beat 11
        {
            compra_id: compras.insertedIds['8'],
            beat_id: beats.insertedIds['10'],
            precio_base: 23500,
            iva_monto: Math.round(23500 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(23500 * 1.19 * 100) / 100
        },
        // Compra 10, Beat 12
        {
            compra_id: compras.insertedIds['9'],
            beat_id: beats.insertedIds['11'],
            precio_base: 35900,
            iva_monto: Math.round(35900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(35900 * 1.19 * 100) / 100
        },
        // Compra 11, Beat 13
        {
            compra_id: compras.insertedIds['10'],
            beat_id: beats.insertedIds['12'],
            precio_base: 29900,
            iva_monto: Math.round(29900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(29900 * 1.19 * 100) / 100
        },
        // Compra 12, Beat 14
        {
            compra_id: compras.insertedIds['11'],
            beat_id: beats.insertedIds['13'],
            precio_base: 27900,
            iva_monto: Math.round(27900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(27900 * 1.19 * 100) / 100
        },
        // Compra 13, Beat 15
        {
            compra_id: compras.insertedIds['12'],
            beat_id: beats.insertedIds['14'],
            precio_base: 28900,
            iva_monto: Math.round(28900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(28900 * 1.19 * 100) / 100
        },
        // Compra 14, Beat 16
        {
            compra_id: compras.insertedIds['13'],
            beat_id: beats.insertedIds['15'],
            precio_base: 23900,
            iva_monto: Math.round(23900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(23900 * 1.19 * 100) / 100
        },
        // Compra 15, Beat 17
        {
            compra_id: compras.insertedIds['14'],
            beat_id: beats.insertedIds['16'],
            precio_base: 25900,
            iva_monto: Math.round(25900 * 0.19 * 100) / 100,
            precio_con_iva: Math.round(25900 * 1.19 * 100) / 100
        }
    ]);

    console.log('Detalles de compras creados');

    // ===== CREAR REPRODUCCIONES =====
    console.log('CREANDO REPRODUCCIONES');

    await db.collection('reproduccion').insertMany([
    {
        beat_id: beats.insertedIds['0'],
        usuario_id: maria._id,
        fecha: new Date()
    },
    {
        beat_id: beats.insertedIds['0'],
        usuario_id: ana._id,
        fecha: new Date()
    },
    {
        beat_id: beats.insertedIds['1'],
        usuario_id: dj_luis._id,
        fecha: new Date()
    },
    {
        beat_id: beats.insertedIds['2'],
        usuario_id: sofia._id,
        fecha: new Date()
    },
    {
        beat_id: beats.insertedIds['3'],
        usuario_id: carlos._id,
        fecha: new Date()
    },
    // Reproducciones anónimas
    {
        beat_id: beats.insertedIds['5'],
        usuario_id: null,
        fecha: new Date()
    },
    {
        beat_id: beats.insertedIds['6'],
        usuario_id: null,
        fecha: new Date()
    }
]);

console.log('Reproducciones creadas');

// ===== CREAR COMENTARIOS =====
console.log('CREANDO COMENTARIOS');

await db.collection('comentario').insertMany([
    {
        usuario_id: maria._id,
        beat_id: beats.insertedIds['0'],
        contenido: 'Este beat está increíble, me inspiró mucho!',
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    {
        usuario_id: ana._id,
        beat_id: beats.insertedIds['2'],
        contenido: 'Muy profesional, me encanta el estilo.',
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    {
        usuario_id: dj_luis._id,
        beat_id: beats.insertedIds['4'],
        contenido: 'Tiene tremenda energía, perfecto para reggaeton.',
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    {
        usuario_id: carlos._id,
        beat_id: beats.insertedIds['7'],
        contenido: 'Amo las texturas de este beat.',
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    // Respuesta
    {
        usuario_id: sofia._id,
        beat_id: beats.insertedIds['7'],
        contenido: 'Sí! También me encantó la producción.',
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    }
]);

console.log('Comentarios creados');


// ===== CREAR LIKES =====
console.log('CREANDO LIKES');

await db.collection('like_beat').insertMany([
    {
        usuario_id: maria._id,
        beat_id: beats.insertedIds['0'],
        fecha: new Date()
    },
    {
        usuario_id: ana._id,
        beat_id: beats.insertedIds['1'],
        fecha: new Date()
    },
    {
        usuario_id: carlos._id,
        beat_id: beats.insertedIds['2'],
        fecha: new Date()
    },
    {
        usuario_id: sofia._id,
        beat_id: beats.insertedIds['3'],
        fecha: new Date()
    },
    {
        usuario_id: dj_luis._id,
        beat_id: beats.insertedIds['4'],
        fecha: new Date()
    }
]);

    console.log('Likes creados');

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
