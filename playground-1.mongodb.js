// MongoDB Playground
// Imagina que aqui haces tus consultas como en el editor de SQL

// Seleccionar la base de datos
use('fullsound');

// Crear colección (TABLA) de usuarios
db.users.insertMany([
    {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        role: 'artist',
        createdAt: new Date()
    },
    {
        name: 'María García',
        email: 'maria@example.com',
        role: 'listener',
        createdAt: new Date()
    }
]);

// Crear colección de canciones
db.songs.insertMany([
    {
        title: 'Canción de Prueba',
        artist: 'Juan Pérez',
        album: 'Mi Primer Álbum',
        duration: 180,
        genre: 'Pop',
        releaseDate: new Date('2024-01-15'),
        plays: 0
    },
    {
        title: 'Melodía Nocturna',
        artist: 'Juan Pérez',
        album: 'Mi Primer Álbum',
        duration: 240,
        genre: 'Jazz',
        releaseDate: new Date('2024-02-01'),
        plays: 0
    }
]);

// Crear colección de playlists
db.playlists.insertOne({
    name: 'Mis Favoritas',
    owner: 'maria@example.com',
    songs: ['Canción de Prueba', 'Melodía Nocturna'],
    isPublic: true,
    createdAt: new Date()
});

// Consultas de ejemplo
console.log('=== Usuarios ===');
db.users.find();

console.log('=== Canciones ===');
db.songs.find();

console.log('=== Playlists ===');
db.playlists.find();

// Actualizar plays de una canción
db.songs.updateOne(
    { title: 'Canción de Prueba' },
    { $inc: { plays: 1 } }
);

// Buscar canciones por género
db.songs.find({ genre: 'Pop' });