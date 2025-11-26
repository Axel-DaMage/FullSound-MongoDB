// MongoDB Playground - CRUD Beats
use('fullsound');

// ===== CREATE =====

// Insertar un beat
db.beat.insertOne({
    titulo: "Dark Trap Beat",
    genero: "Trap",
    descripcion: "Beat oscuro con 808s potentes",
    precio: 15000,
    bpm: 140,
    usuario_id: ObjectId(),
    fecha_subida: new Date(),
    archivo_url: "https://fullsound.com/beats/dark-trap.mp3",
    portada_url: "https://fullsound.com/covers/dark-trap.jpg"
});

// Insertar múltiples beats
db.beat.insertMany([
    {
        titulo: "Chill Lo-Fi Study",
        genero: "Lo-Fi",
        descripcion: "Beat relajado para estudiar",
        precio: 10000,
        bpm: 85,
        usuario_id: ObjectId(),
        fecha_subida: new Date(),
        archivo_url: "https://fullsound.com/beats/lofi-study.mp3",
        portada_url: "https://fullsound.com/covers/lofi-study.jpg"
    },
    {
        titulo: "Reggaeton Fire",
        genero: "Reggaeton",
        descripcion: "Beat de reggaeton con dembow pegajoso",
        precio: 20000,
        bpm: 95,
        usuario_id: ObjectId(),
        fecha_subida: new Date(),
        archivo_url: "https://fullsound.com/beats/reggaeton-fire.mp3",
        portada_url: "https://fullsound.com/covers/reggaeton-fire.jpg"
    },
    {
        titulo: "Boom Bap Classic",
        genero: "Hip-Hop",
        descripcion: "Beat old school estilo 90s",
        precio: 12000,
        bpm: 90,
        usuario_id: ObjectId(),
        fecha_subida: new Date(),
        archivo_url: "https://fullsound.com/beats/boom-bap.mp3",
        portada_url: "https://fullsound.com/covers/boom-bap.jpg"
    }
]);


// ===== READ =====

// Buscar todos los beats
db.beat.find();

// Buscar beats por genero
db.beat.find({ genero: "Trap" });

// Buscar beats con precio menor a 15000
db.beat.find({ precio: { $lt: 15000 } });

// Buscar beats con conteo de reproducciones (desde coleccion reproduccion)
db.beat.aggregate([
    {
        $lookup: {
            from: "reproduccion",
            localField: "_id",
            foreignField: "beat_id",
            as: "reproducciones_data"
        }
    },
    {
        $addFields: {
            total_reproducciones: { $size: "$reproducciones_data" }
        }
    },
    {
        $sort: { total_reproducciones: -1 }
    },
    {
        $project: {
            reproducciones_data: 0
        }
    }
]);

// Buscar un beat por ID
db.beat.findOne({ _id: ObjectId("673fc84b8cc6077abb0dce73") });

// Buscar beats con paginacion (primeros 10)
db.beat.find().limit(10).skip(0);

// Contar beats por genero
db.beat.countDocuments({ genero: "Reggaeton" });


// ===== UPDATE =====

// Actualizar precio de un beat
db.beat.updateOne(
    { _id: ObjectId("673fc84b8cc6077abb0dce73") },
    { $set: { precio: 18000 } }
);


// ===== DELETE =====

// Eliminar un beat
db.beat.deleteOne({ _id: ObjectId("673fc84b8cc6077abb0dce73") });
