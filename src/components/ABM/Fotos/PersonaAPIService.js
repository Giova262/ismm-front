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

  async getPersonas() {
    let response = null
    try {
      Loading.show({ message: 'cargando personas...', messageColor: 'info' })
      response = await Axios.get(`persona`)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async store(request) {
    let response = null
    try {
      Loading.show({ message: 'creando persona...', messageColor: 'info' })
      response = await Axios.post(`persona`, request)
      // notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }

  async update(request, id) {
    let response = null
    try {
      Loading.show({ message: 'Enviando...', messageColor: 'info' })
      response = await Axios.put(`persona/${id}`, request)
      // notificarExito(response.data.mensaje, response.statusText)
    } catch (error) {
      console.error(error.message)
      notificarAPIError(error)
    } finally {
      Loading.hide()
    }
    return response
  }
}

const ApiServiceClassInstance = new ApiServiceClass()

export default ApiServiceClassInstance
