const { ObjectId } = require("mongodb");

// MongoDB Playground - CRUD Likes
use('fullsound');

// ===== CREATE =====

// Insertar un like
db.like_beat.insertOne({
    usuario_id: ObjectId(),
    beat_id: ObjectId(),
    fecha: new Date()
});

// Insertar multiples likes
db.like_beat.insertMany([
    {
        usuario_id: ObjectId(),
        beat_id: ObjectId(),
        fecha: new Date()
    },
    {
        usuario_id: ObjectId(),
        beat_id: ObjectId(),
        fecha: new Date()
    }
]);


// ===== READ =====

// Buscar todos los likes
db.like_beat.find();

// Buscar likes de un beat
db.like_beat.find({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });

// Contar likes de un beat
db.like_beat.countDocuments({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });


// ===== UPDATE =====

// Actualizar fecha de un like
db.like_beat.updateOne(
    { 
        usuario_id: ObjectId("673fc84b8cc6077abb0dce70"),
        beat_id: ObjectId("673fc84b8cc6077abb0dce73")
    },
    { $set: { fecha: new Date() } }
);


// ===== DELETE =====

// Eliminar un like
db.like_beat.deleteOne({
    usuario_id: ObjectId("673fc84b8cc6077abb0dce70"),
    beat_id: ObjectId("673fc84b8cc6077abb0dce73")
});