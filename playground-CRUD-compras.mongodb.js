// MongoDB Playground - CRUD Compras y Detalles
use('fullsound');

// ===== CREATE - COMPRAS =====

// Insertar una compra
db.compra.insertOne({
    usuario_id: ObjectId(),
    fecha: new Date(),
    subtotal: 30000,
    iva_total: 5700,
    total_con_iva: 35700,
    metodo_pago: "Tarjeta de Credito",
    estado: "completada"
});

// Insertar multiples compras
db.compra.insertMany([
    {
        usuario_id: ObjectId(),
        fecha: new Date(),
        subtotal: 15000,
        iva_total: 2850,
        total_con_iva: 17850,
        metodo_pago: "PayPal",
        estado: "completada"
    },
    {
        usuario_id: ObjectId(),
        fecha: new Date(),
        subtotal: 45000,
        iva_total: 8550,
        total_con_iva: 53550,
        metodo_pago: "Transferencia",
        estado: "pendiente"
    },
    {
        usuario_id: ObjectId(),
        fecha: new Date(),
        subtotal: 20000,
        iva_total: 3800,
        total_con_iva: 23800,
        metodo_pago: "Tarjeta de Debito",
        estado: "completada"
    }
]);


// ===== CREATE - DETALLES DE COMPRA =====

// Insertar detalle de compra
db.compra_detalle.insertOne({
    compra_id: ObjectId(),
    beat_id: ObjectId(),
    precio_base: 15000,
    iva_monto: 2850,
    precio_con_iva: 17850,
    licencia_tipo: "Basica"
});

// Insertar multiples detalles de compra
db.compra_detalle.insertMany([
    {
        compra_id: ObjectId(),
        beat_id: ObjectId(),
        precio_base: 10000,
        iva_monto: 1900,
        precio_con_iva: 11900,
        licencia_tipo: "Basica"
    },
    {
        compra_id: ObjectId(),
        beat_id: ObjectId(),
        precio_base: 20000,
        iva_monto: 3800,
        precio_con_iva: 23800,
        licencia_tipo: "Premium"
    },
    {
        compra_id: ObjectId(),
        beat_id: ObjectId(),
        precio_base: 50000,
        iva_monto: 9500,
        precio_con_iva: 59500,
        licencia_tipo: "Exclusiva"
    }
]);


// ===== READ - COMPRAS =====

// Buscar todas las compras
db.compra.find();

// Buscar compras de un usuario
db.compra.find({ usuario_id: ObjectId("673fc84b8cc6077abb0dce70") });

// Buscar compra por ID
db.compra.findOne({ _id: ObjectId("673fc84b8cc6077abb0dce75") });

// Contar compras por estado
db.compra.countDocuments({ estado: "completada" });


// ===== READ - DETALLES DE COMPRA =====

// Buscar todos los detalles
db.compra_detalle.find();

// Buscar detalles de una compra especifica
db.compra_detalle.find({ compra_id: ObjectId("673fc84b8cc6077abb0dce75") });

// Buscar detalles de un beat especifico
db.compra_detalle.find({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });

// Buscar detalles por tipo de licencia
db.compra_detalle.find({ licencia_tipo: "Premium" });

// Contar ventas de un beat
db.compra_detalle.countDocuments({ beat_id: ObjectId("673fc84b8cc6077abb0dce73") });


// ===== UPDATE =====

// Actualizar estado de una compra
db.compra.updateOne(
    { _id: ObjectId("673fc84b8cc6077abb0dce75") },
    { $set: { estado: "completada" } }
);


// ===== DELETE =====

// Eliminar una compra
db.compra.deleteOne({ _id: ObjectId("673fc84b8cc6077abb0dce75") });
