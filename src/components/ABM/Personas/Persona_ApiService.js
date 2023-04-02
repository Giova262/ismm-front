import { Loading, Notify, SessionStorage, LocalStorage } from 'quasar'
import {
  notificarError,
  notificarExito,
  notificarAPIError,
} from 'src/Services/NotificacionesService'
import Axios from 'axios'

class ApiServiceClass {
  constructor() {
    this.urlAPiExterna = ''
  }

  async setAuthEncabezado() {
    const usuario = JSON.parse(LocalStorage.getItem('usuario'))
    let response = true
    try {
      Axios.defaults.headers.common.authorization = `Bearer ${usuario.access_token}`
    } catch (error) {
      console.error(error.message)
      notificarError(error.message)
      response = false
    }
    return response
  }

  async store(request) {
    let response = null
    try {
      Loading.show({ message: 'Enviando..', messageColor: 'info' })
      response = await Axios.post(`persona`, request)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async storeImage(request) {
    let response = null
    try {
      Loading.show({ message: 'Guardando foto..', messageColor: 'info' })
      response = await Axios.post(`foto/persona`, request)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getAll() {
    let response = null
    try {
      Loading.show({ message: 'Cargando mienbros..', messageColor: 'info' })
      response = await Axios.get(`persona`)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async showImageByIdPersona(idPersona) {
    let response = null
    try {
      Loading.show({ message: 'Cargando foto..', messageColor: 'info' })
      response = await Axios.get(`foto/persona/${idPersona}`)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }


  // --------


  async update(request, id) {
    let response = null
    try {
      Loading.show({ message: 'Enviando...', messageColor: 'info' })
      response = await Axios.put(`evento/${id}`, request)
      // notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async destroy(id) {
    let response = null
    try {
      Loading.show({ message: 'Eliminando...', messageColor: 'info' })
      response = await Axios.delete(`evento/${id}`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async vincular(request, id) {
    let response = null
    try {
      Loading.show({ message: 'Vinculando...', messageColor: 'info' })
      response = await Axios.post(`vincular/evento/${id}`, request)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async updateVinculoPersona(request, id_evento) {
    let response = null
    try {
      Loading.show({ message: 'Vinculando...', messageColor: 'info' })
      response = await Axios.put(`vincular/evento/persona/${id_evento}`, request)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getEventosCompletos() {
    let response = null
    try {
      Loading.show({ message: 'Cargando eventos...', messageColor: 'info' })
      response = await Axios.get(`eventos/completos`)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getEventosByPersona(id_persona) {
    let response = null
    try {
      Loading.show({ message: 'Cargando eventos...', messageColor: 'info' })
      response = await Axios.get(`eventos/persona/${id_persona}`)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getEventos() {
    let response = null
    try {
      Loading.show({ message: 'Cargando eventos...', messageColor: 'info' })
      response = await Axios.get(`evento`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getEvento(id) {
    let response = null
    try {
      Loading.show({ message: 'Cargando eventos...', messageColor: 'info' })
      response = await Axios.get(`evento/${id}`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getTiempoByEventoID(id) {
    let response = null
    try {
      Loading.show({ message: 'Cargando tiempo...', messageColor: 'info' })
      response = await Axios.get(`evento/${id}/tiempo`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getUbicacionByEventoID(id) {
    let response = null
    try {
      Loading.show({ message: 'Cargando ubicacion...', messageColor: 'info' })
      response = await Axios.get(`evento/${id}/ubicacion`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async getPersonaByEventoID(id) {
    let response = null
    try {
      Loading.show({ message: 'Cargando persona...', messageColor: 'info' })
      response = await Axios.get(`evento/${id}/persona`)
      notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  // async storeImageSQLServer(request) {
  //   let respuesta = false;
  //   try {
  //     Loading.show({ message: 'Subiendo imagen...', messageColor: 'info' });
  //     respuesta = await Axios({
  //       method: 'POST',
  //       url: `foto/${id}/crear`,
  //       data: formData,
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //     notificarAPIError(error);
  //   } finally {
  //     Loading.hide();
  //   }
  //   return respuesta;
  // }

}

const ApiServiceClassInstance = new ApiServiceClass()

export default ApiServiceClassInstance
