// MongoDB Playground - CRUD Usuarios
use('fullsound');

// ===== CREATE =====

// Insertar un usuario
db.usuario.insertOne({
    nombre_usuario: "producer_pro",
    correo: "producer@fullsound.com",
    contrasena: "hash1",
    fecha_registro: new Date()
});

// Insertar multiples usuarios
db.usuario.insertMany([
    {
        nombre_usuario: "beatmaker_mx",
        correo: "beatmaker@fullsound.com",
        contrasena: "hash2",
        fecha_registro: new Date()
    },
    {
        nombre_usuario: "lofi_creator",
        correo: "lofi@fullsound.com",
        contrasena: "hash3",
        fecha_registro: new Date()
    },
    {
        nombre_usuario: "trap_king",
        correo: "trapking@fullsound.com",
        contrasena: "hash4",
        fecha_registro: new Date()
    },
    {
        nombre_usuario: "reggaeton_star",
        correo: "reggaeton@fullsound.com",
        contrasena: "hash5",
        fecha_registro: new Date()
    }
]);


// ===== READ =====

// Buscar todos los usuarios
db.usuario.find();

// Buscar usuario por nombre de usuario
db.usuario.findOne({ nombre_usuario: "producer_pro" });

// Buscar usuario por ID
db.usuario.findOne({ _id: ObjectId("673fc84b8cc6077abb0dce70") });

// Contar total de usuarios
db.usuario.countDocuments();


// ===== UPDATE =====

// Actualizar correo de un usuario
db.usuario.updateOne(
    { _id: ObjectId("673fc84b8cc6077abb0dce70") },
    { $set: { correo: "newproducer@fullsound.com" } }
);


// ===== DELETE =====

// Eliminar un usuario
db.usuario.deleteOne({ _id: ObjectId("673fc84b8cc6077abb0dce70") });
