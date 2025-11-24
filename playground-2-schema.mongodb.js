// MongoDB Playground - Esquema FullSound
// Creación de colecciones con validación de esquema

use('fullsound');

// ===== 1. USUARIOS =====
db.createCollection('usuario', {
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

// Crear índices únicos
db.usuario.createIndex({ nombre_usuario: 1 }, { unique: true });
db.usuario.createIndex({ correo: 1 }, { unique: true });

// ===== 3. BEATS =====
db.createCollection('beat', {
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
                descripcion: {
                    bsonType: 'string',
                    description: 'Descripción del beat'
                },
                precio: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Precio del beat'
                },
                bpm: {
                    bsonType: 'int',
                    minimum: 0,
                    maximum: 300,
                    description: 'Beats por minuto'
                },
                usuario_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al usuario creador'
                },
                fecha_subida: {
                    bsonType: 'date',
                    description: 'Fecha de subida del beat'
                },
                archivo_url: {
                    bsonType: 'string',
                    description: 'URL del archivo de audio'
                },
                portada_url: {
                    bsonType: 'string',
                    description: 'URL de la imagen de portada'
                },
                reproducciones: {
                    bsonType: 'int',
                    minimum: 0,
                    description: 'Contador de reproducciones'
                },
                likes: {
                    bsonType: 'int',
                    minimum: 0,
                    description: 'Contador de likes'
                }
            }
        }
    }
});

// Crear índices
db.beat.createIndex({ usuario_id: 1 });
db.beat.createIndex({ genero: 1 });
db.beat.createIndex({ fecha_subida: -1 });
db.beat.createIndex({ precio: 1 });

// ===== 4. COMPRAS =====
db.createCollection('compra', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['usuario_id', 'subtotal', 'iva_total', 'total_con_iva'],
            properties: {
                usuario_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al usuario comprador'
                },
                fecha: {
                    bsonType: 'date',
                    description: 'Fecha de la compra'
                },
                subtotal: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Subtotal sin IVA'
                },
                iva_total: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Monto total del IVA'
                },
                total_con_iva: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Total con IVA incluido'
                },
                metodo_pago: {
                    bsonType: 'string',
                    description: 'Método de pago utilizado'
                },
                estado: {
                    enum: ['pendiente', 'completada', 'cancelada', 'reembolsada'],
                    description: 'Estado de la compra'
                }
            }
        }
    }
});

// Crear índices
db.compra.createIndex({ usuario_id: 1 });
db.compra.createIndex({ fecha: -1 });
db.compra.createIndex({ estado: 1 });

// ===== 5. DETALLE DE COMPRA =====
db.createCollection('compra_detalle', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['compra_id', 'beat_id', 'precio_base', 'iva_monto', 'precio_con_iva'],
            properties: {
                compra_id: {
                    bsonType: 'objectId',
                    description: 'Referencia a la compra'
                },
                beat_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al beat comprado'
                },
                precio_base: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Precio base del beat sin IVA'
                },
                iva_monto: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Monto del IVA'
                },
                precio_con_iva: {
                    bsonType: 'double',
                    minimum: 0,
                    description: 'Precio con IVA incluido'
                },
                licencia_tipo: {
                    bsonType: 'string',
                    description: 'Tipo de licencia adquirida'
                }
            }
        }
    }
});

// Crear índices
db.compra_detalle.createIndex({ compra_id: 1 });
db.compra_detalle.createIndex({ beat_id: 1 });

// ===== 6. REPRODUCCIONES =====
db.createCollection('reproduccion', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['beat_id'],
            properties: {
                beat_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al beat reproducido'
                },
                usuario_id: {
                    bsonType: ['objectId', 'null'],
                    description: 'Referencia al usuario (puede ser null para reproducciones anónimas)'
                },
                fecha: {
                    bsonType: 'date',
                    description: 'Fecha y hora de la reproducción'
                }
            }
        }
    }
});

// Crear índices
db.reproduccion.createIndex({ beat_id: 1 });
db.reproduccion.createIndex({ usuario_id: 1 });
db.reproduccion.createIndex({ fecha: -1 });

// ===== 7. COMENTARIOS =====
db.createCollection('comentario', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['usuario_id', 'beat_id', 'contenido'],
            properties: {
                usuario_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al usuario autor del comentario'
                },
                beat_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al beat comentado'
                },
                contenido: {
                    bsonType: 'string',
                    minLength: 1,
                    description: 'Contenido del comentario'
                },
                fecha: {
                    bsonType: 'date',
                    description: 'Fecha del comentario'
                },
                editado: {
                    bsonType: 'bool',
                    description: 'Indica si el comentario fue editado'
                },
                comentario_padre_id: {
                    bsonType: ['objectId', 'null'],
                    description: 'Referencia a comentario padre (para respuestas)'
                }
            }
        }
    }
});

// Crear índices
db.comentario.createIndex({ usuario_id: 1 });
db.comentario.createIndex({ beat_id: 1 });
db.comentario.createIndex({ fecha: -1 });
db.comentario.createIndex({ comentario_padre_id: 1 });

// ===== 8. LIKES =====
db.createCollection('like_beat', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['usuario_id', 'beat_id'],
            properties: {
                usuario_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al usuario que dio like'
                },
                beat_id: {
                    bsonType: 'objectId',
                    description: 'Referencia al beat que recibió like'
                },
                fecha: {
                    bsonType: 'date',
                    description: 'Fecha del like'
                }
            }
        }
    }
});

// Crear índice compuesto único para evitar likes duplicados
db.like_beat.createIndex({ usuario_id: 1, beat_id: 1 }, { unique: true });
db.like_beat.createIndex({ beat_id: 1 });

// ===== MENSAJE DE CONFIRMACIÓN =====
console.log('Todas las colecciones han sido creadas exitosamente');
console.log('Colecciones disponibles:', db.getCollectionNames());
