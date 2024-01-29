import Dexie from 'dexie';
import {
    notificarError,
} from "src/Services/NotificacionesService";

// Create your instance
var Database = new Dexie("DBISMM");

// Define your schema
Database.version(2).stores({
    personas: `++id,
    id_persona,
    nombre,
    apellido,
    sexo,
    fecha_nacimiento,
    fecha_ingreso,
    telefono,
    email,
    comentario,
    testimonio,
    bautizado,
    edad,
    foto_url,
    foto_data,
    iglesia,
    direccion,
    barrio,
    estado`,
    estados: `++id,descripcion`,
});

// Open the database
Database.open().catch(function (e) {
    console.error("Falló al abrir la base de Dexie: " + e);
    notificarError("Falló al abrir la base de Dexie: " + e);
});

export default Database;

