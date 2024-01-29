import {
  notificarError,
} from "src/Services/NotificacionesService";
import { isEmpty, isCorrectFormatDB } from "src/Services/ValidacionesService";
import PersonaAPIService from "src/components/ABM/Personas/Persona_ApiService";
import { uploadFile } from "src/firebase/config";
import { LocalStorage } from "quasar";
import EstadosDB from 'src/db/EstadosDB';



class Persona {
  constructor() {
    this.id = null;
    this.nombre = null;
    this.apellido = null;
    this.sexo = null;
    this.fecha_nacimiento = null;
    this.fecha_ingreso = null;
    this.telefono = '+54911';
    this.email = null;
    this.comentario = null;
    this.testimonio = null;
    this.bautizado = false;
    this.edad = null;
    this.foto_url = null;
    this.foto_data = null;
    this.iglesia = null;
    this.direccion = null;
    this.estado = {
      descripcion: "FIRME"
    };
  }


  reset() {
    this.id = null;
    this.nombre = null;
    this.apellido = null;
    this.sexo = null;
    this.fecha_nacimiento = null;
    this.fecha_ingreso = null;
    this.telefono = '+54911';
    this.email = null;
    this.comentario = null;
    this.testimonio = null;
    this.bautizado = false;
    this.edad = null;
    this.foto_url = null;
    this.foto_data = null;
    this.iglesia = null;
    this.direccion = null;
    this.barrio = null;
    this.estado = null;
  }

  fakeData() {
    this.id = 150;
    this.nombre = "nombre Persona";
    this.apellido = "apellido Persona";
    this.sexo = "M";
    this.fecha_nacimiento = "15/02/1500";
    this.fecha_ingreso = "15/02/1510";
    this.telefono = "+541126029026";
    this.email = "masterpat45@gmail.com";
    this.comentario = "masterpat45@gmail.com";
    this.testimonio = "masterpat45@gmail.com";
    this.bautizado = true;
    this.edad = 15;
    this.barrio = 'norte';
    this.estado = {
      descripcion: "FIRME"
    };
  }

  validated() {
    if (isEmpty(this.nombre) || !isCorrectFormatDB(this.nombre, 200)) {
      notificarError(`El Nombre es un dato requerido`);
      return false;
    }
    if (isEmpty(this.apellido)) {
      notificarError(`El Apellido es un dato requerido`);
      return false;
    }
    if (isEmpty(this.telefono)) {
      notificarError(`El Telefono es un dato requerido`);
      return false;
    }
    if (isEmpty(this.estado)) {
      notificarError(`El Estado es un dato requerido`);
      return false;
    }
    // if (isEmpty(this.sexo)) {
    //   notificarError(`El Sexo es un dato requerido`);
    //   return false;
    // }
    return true;
  }

  getPayload() {
    let ID_SEXO = null;
    if (this.sexo) {
      if (!this.sexo.codigo) ID_SEXO = this.sexo
      else ID_SEXO = String(this.sexo.codigo)
    }

    let ID_ESTADO = null;
    if (this.estado) {
      if (!this.estado.descripcion) ID_ESTADO = this.estado
      else ID_ESTADO = String(this.estado.descripcion)
    }

    const telefonoFormateado = String(this.telefono).replace(/ /g,'');

    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      sexo: ID_SEXO,
      fecha_nacimiento: this.fecha_nacimiento,
      fecha_ingreso: this.fecha_ingreso,
      telefono: telefonoFormateado,
      email: this.email,
      comentario: this.comentario,
      testimonio: this.testimonio,
      bautizado: this.bautizado,
      edad: this.edad,
      iglesia: this.iglesia,
      direccion: this.direccion,
      barrio: this.barrio,
      foto_url: this.foto_url,
      estado: ID_ESTADO,
    };
  }

  getPayloadImage() {
    return {
      id_persona: this.id,
      url: this.foto_url,
    };
  }

  saveLocalStorage() {
    LocalStorage.set("itemActual", JSON.stringify(this.getPayload()));
  }

  async loadLocalStorage() {
    const datos = JSON.parse(LocalStorage.getItem('itemActual'))
    await this.cargarDatos(datos);
  }

  async storePersona() {
    await PersonaAPIService.setAuthEncabezado()
    return await PersonaAPIService.store(this.getPayload());
  }

  async uploadImageFireBase() {
    this.foto_url = await uploadFile(this.foto_data, this.id);
  }

  async storeImagen() {
    const request = this.getPayloadImage()
    await PersonaAPIService.setAuthEncabezado()
    return await PersonaAPIService.storeImage(request);
  }

  async update() {
    await PersonaAPIService.setAuthEncabezado()
    return await PersonaAPIService.update(this.getPayload(), this.id);
  }

  async cargarDatos(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.fecha_ingreso = data.fecha_ingreso;
    this.telefono = data.telefono;
    this.email = data.email;
    this.comentario = data.comentario;
    this.testimonio = data.testimonio;
    this.bautizado = data.bautizado;
    this.edad = data.edad;
    this.iglesia = data.iglesia;
    this.foto_url = data.foto_url;
    this.direccion = data.direccion;
    this.barrio = data.barrio;
    this.estado = data.estado;

    if (data.sexo === 'M') {
      this.sexo = { descripcion: 'Hombre', codigo: 'M' };
    }
    if (data.sexo === 'F') {
      this.sexo = { descripcion: 'Mujer', codigo: 'F' };
    }

  }
}

export default Persona;
