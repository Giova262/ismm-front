import PersonasDB from 'src/db/PersonasDB';
import EstadosDB from 'src/db/EstadosDB';
import {
  notificarError,
} from "src/Services/NotificacionesService";
import APIService from "src/components/Login/Login_ApiService";
import { Loading, LocalStorage } from 'quasar'

async function migrar() {
  const respGetNovedades = await APIService.getNovedades();
  const novedades = respGetNovedades.data;

  try {
    Loading.show({ message: 'Migrando...', messageColor: 'info' });
    await PersonasDB.migrar(novedades.personas);
    await EstadosDB.migrar(novedades.estados);
    LocalStorage.set('IncioDelDia', novedades.viajeIniciado ? 1 : 0)
  } catch (error) {
    console.error(error)
    notificarError(error)
  } finally {
    Loading.hide();
  }
}

export default {
  migrar,
};
