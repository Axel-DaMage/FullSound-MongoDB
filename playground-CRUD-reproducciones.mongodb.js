// MongoDB Playground - CRUD Reproducciones
use('fullsound');

// ===== CREATE =====

// Insertar una reproduccion
db.reproduccion.insertOne({
    beat_id: ObjectId(),
    usuario_id: ObjectId(),
    fecha: new Date()
});

// Insertar reproduccion anonima (sin usuario)
db.reproduccion.insertOne({
    beat_id: ObjectId(),
    usuario_id: null,
    fecha: new Date()
});

// Insertar multiples reproducciones
db.reproduccion.insertMany([
    {
        beat_id: ObjectId(),
        usuario_id: ObjectId(),
        fecha: new Date()
    },
    {
        beat_id: ObjectId(),
        usuario_id: null,
        fecha: new Date()
    },
    {
        beat_id: ObjectId(),
        usuario_id: ObjectId(),
        fecha: new Date(Date.now() - 3600000)
    },
    {
        beat_id: ObjectId(),
        usuario_id: ObjectId(),
        fecha: new Date(Date.now() - 7200000)
    }
]);


// ===== READ =====

// Buscar todas las reproducciones
db.reproduccion.find();

// Buscar reproducciones de un beat especifico
db.reproduccion.find({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });

// Contar reproducciones de un beat
db.reproduccion.countDocuments({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });


// ===== UPDATE =====

// Actualizar fecha de una reproduccion
db.reproduccion.updateOne(
    { _id: ObjectId("673fc84b8cc6077abb0dce77") },
    { $set: { fecha: new Date() } }
);


// ===== DELETE =====

// Eliminar una reproduccion
db.reproduccion.deleteOne({ _id: ObjectId("673fc84b8cc6077abb0dce77") });
