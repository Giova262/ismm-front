import Database from "src/db/dexiedb";


async function migrar(lista) {
  await Database.personas
    .clear()
    .then(function () {
      console.log("Tabla personas borrada exitosamente");
    })
    .catch(alert);

  for await (let item of lista) {
    addItem(item);
  }

  return;
}

async function migrarLista(lista) {
  for await (let item of lista) {
    addItem(item);
  }
  return;
}

async function clear() {
  await Database.personas
    .clear()
    .then(function () {
      console.log("Tabla personas borrada exitosamente");
    })
    .catch(alert);

  return;
}

async function addItem(item) {
  return await Database.personas.add({
    id_persona: item.id,
    nombre: item.nombre,
    apellido: item.apellido,
    sexo: item.sexo,
    fecha_nacimiento: item.fecha_nacimiento,
    fecha_ingreso: item.fecha_ingreso,
    telefono: item.telefono,
    email: item.email,
    comentario: item.comentario,
    testimonio: item.testimonio,
    bautizado: item.bautizado,
    edad: item.edad,
    foto_url: item.foto_url,
    foto_data: item.foto_data,
    iglesia: item.iglesia,
    direccion: item.direccion,
    barrio: item.barrio,
    estado: item.estado,
  });
}

async function getAll() {
  return await Database.personas.toArray();
}

async function getAllFiltrado(estadoFilter) {
  return await Database.personas.where('estado').notEqual(estadoFilter).toArray();
}

async function getAllWhereEstado(estadoFilter) {
  return await Database.personas.where({ estado: estadoFilter }).toArray();
}

async function getByID(id) {
  return await Database.personas.get({ id_persona: id });
}

async function deleteByID(id) {
  let respuesta = null;
  await Database.personas
    .where({ id_persona: id })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
      respuesta = true;
    });
  return respuesta;
}

export default {
  clear,
  migrar,
  getAll,
  getByID,
  deleteByID,
  migrarLista,
  getAllFiltrado,
  getAllWhereEstado,
};
