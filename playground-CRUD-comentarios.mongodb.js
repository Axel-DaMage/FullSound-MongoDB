// MongoDB Playground - CRUD Comentarios
use('fullsound');

// ===== CREATE =====

// Insertar un comentario
db.comentario.insertOne({
    usuario_id: ObjectId(),
    beat_id: ObjectId(),
    contenido: "Este beat esta increible, excelente trabajo!",
    fecha: new Date(),
    editado: false,
    comentario_padre_id: null
});

// Insertar respuesta a un comentario
db.comentario.insertOne({
    usuario_id: ObjectId(),
    beat_id: ObjectId(),
    contenido: "Muchas gracias por el apoyo!",
    fecha: new Date(),
    editado: false,
    comentario_padre_id: ObjectId("673fc84b8cc6077abb0dce78")
});

// Insertar multiples comentarios
db.comentario.insertMany([
    {
        usuario_id: ObjectId(),
        beat_id: ObjectId(),
        contenido: "Los 808s estan muy duros, me encanta",
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    {
        usuario_id: ObjectId(),
        beat_id: ObjectId(),
        contenido: "Perfecto para mi nuevo tema",
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    },
    {
        usuario_id: ObjectId(),
        beat_id: ObjectId(),
        contenido: "Cuanto sale la licencia exclusiva?",
        fecha: new Date(),
        editado: false,
        comentario_padre_id: null
    }
]);


// ===== READ =====

// Buscar todos los comentarios
db.comentario.find();

// Buscar comentarios de un beat
db.comentario.find({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });

// Buscar comentarios de un usuario
db.comentario.find({ usuario_id: ObjectId("673fc84b8cc6077abb0dce70") });

// Buscar comentario por ID
db.comentario.findOne({ _id: ObjectId("673fc84b8cc6077abb0dce78") });

// Contar comentarios de un beat
db.comentario.countDocuments({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });


// ===== UPDATE =====

// Editar contenido de un comentario
db.comentario.updateOne(
    { _id: ObjectId("673fc84b8cc6077abb0dce78") },
    { 
        $set: { 
            contenido: "Este beat esta increible, excelente trabajo! Actualizado",
            editado: true
        } 
    }
);


// ===== DELETE =====

// Eliminar un comentario
db.comentario.deleteOne({ _id: ObjectId("673fc84b8cc6077abb0dce78") });
