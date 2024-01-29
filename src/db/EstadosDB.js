import Database from "src/db/dexiedb";


async function migrar(lista) {
  await Database.estados
    .clear()
    .then(function () {
      console.log("Tabla estados borrada exitosamente");
    })
    .catch(alert);

  for await (let item of lista) {
    addItem(item);
  }

  return;
}

async function addItem(item) {
  return await Database.estados.add({
    descripcion: item,
  });
}

async function getAll() {
  return await Database.estados.toArray();
}

async function getAllFiltrado(value) {
  return await Database.estados.where('descripcion').notEqual(value).toArray();
}

async function getByDesc(valor) {
  return await Database.estados.get({ descripcion: valor }).toArray();
}

async function updateEstadoByID(valor, estado) {
  const item = await getByDesc(valor);

  if (item.descripcion == estado) {
    return false;
  }

  await Database.estados
    .where({ descripcion: valor })
    .modify({ descripcion: estado })
    .then(function (updateedCount) { console.log("Updated " + updateedCount + " items"); });
  return true;
}


async function deleteByID(valor) {
  let respuesta = null;
  await Database.estados
    .where({ descripcion: valor })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
      respuesta = true;
    });
  return respuesta;
}

export default {
  migrar,
  getAll,
  getByDesc,
  deleteByID,
  updateEstadoByID,
  getAllFiltrado,
};
