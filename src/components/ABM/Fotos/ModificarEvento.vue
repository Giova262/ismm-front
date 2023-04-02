<template>
  <q-layout v-if="isReady" class="bg-grey-2">
    <div class="row q-gutter-y-md bg-white q-pa-md q-pb-lg">
      <div class="col-12">
        <q-select
          v-model="eventoSelecionadoID"
          label="Eventos"
          use-input
          input-debounce="200"
          option-label="nombre"
          option-value="id"
          emit-value
          map-options
          :options="eventos"
          @update:model-value="onEventoChange()"
          dense
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <!-- <q-item-label v-html="scope.opt.id" /> -->
                <q-item-label class="text-grey-9">
                  {{scope.opt.id}} - {{ scope.opt.nombre }}
                </q-item-label>
                <q-item-label class="text-grey">
                  {{ scope.opt.titulo }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <div v-if="encontroEvento" class="row q-gutter-y-md bg-white">
      <InputsEvento :evento="evento" @actualiza="asd" />
      <InputsTiempo :tiempo="tiempo" class="col-12" />
      <InputsUbicacion :ubicacion="ubicacion" class="col-12" />
      <InputsPersona :persona="persona" class="col-12" />
      <div class="col-12 q-my-md text-center">
        <q-btn label="Actualizar" color="green-5" @click="onModificarClick" v-close-popup/>
        <q-space/>
        <q-btn
          label="Cancelar"
          color="red-8"
          flat
          class="q-ml-sm"
          v-close-popup
        />
        <q-btn
          label="Reset"
          color="grey-8"
          flat
          class="q-ml-sm"
          @click="onResetClick"
        />
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted } from 'vue'

import Evento from 'src/Models/Evento'
import Tiempo from 'src/Models/Tiempo'
import Ubicacion from 'src/Models/Ubicacion'
import Persona from 'src/Models/Persona'

import EventoApiService from 'src/components/ABM/Evento/EventoAPIService'

import InputsEvento from './InputsEvento'
import InputsTiempo from 'src/components/ABM/Tiempo/InputsTiempo'
import InputsUbicacion from 'src/components/ABM/Ubicacion/InputsUbicacion'
import InputsPersona from 'src/components/ABM/Persona/InputsPersona'


export default defineComponent({
  name: 'EssentialLink',
  components: {
    InputsEvento,
    InputsTiempo,
    InputsUbicacion,
    InputsPersona,
  },
  props: {
    idEvento: {
      type: String,
      required: false
    },
  },
  setup({idEvento}, { root, emit }) {
    const $q = useQuasar()

    const evento = ref(new Evento())
    const tiempo = ref(new Tiempo())
    const ubicacion = ref(new Ubicacion())
    const persona = ref(new Persona())

    const isReady = ref(false)
    const encontroEvento = ref(false)
    const eventoSelecionadoID = ref(null)
    const eventos = ref([])

    function onResetClick() {
      evento.value = new Evento()
    }

    async function onModificarClick() {
      if (evento.value.validacionParaCrear()) {
        evento.value.editar()
      }
      if (tiempo.value.validacionParaCrear()) {
        tiempo.value.editar()
      }
      if (ubicacion.value.validacionParaCrear()) {
        ubicacion.value.editar()
      }
      if (persona.value.validacionParaCrear()) {
        if (!persona.value.id) {
          const newPersona = await persona.value.crear();
          evento.value.updateVinculoPersona(newPersona.data.data.id);
        } else {
          persona.value.editar()
          evento.value.updateVinculoPersona(persona.value.id);
        }
      }

      // const request = {
      //   tiempo_id: newTiempo.data.data.id,
      //   ubicacion_id: newUbicacion.data.data.id,
      //   persona_id: newPersona.data.data.id,
      //   multimedia_id: null,
      //   etiqueta_id: null,
      // }

      // await evento.value.updateVinculos(request, newEvento.data.data.id)

      // emit('onresetview');
    }

    async function getEventos() {
      const respond = await EventoApiService.getEventos()
      if (respond) {
        eventos.value = respond.data
      }
    }

    async function onEventoChange() {
      const respond1 = await EventoApiService.getEvento(
        eventoSelecionadoID.value,
      )
      const respond2 = await EventoApiService.getTiempoByEventoID(
        eventoSelecionadoID.value,
      )
      const respond3 = await EventoApiService.getUbicacionByEventoID(
        eventoSelecionadoID.value,
      )
      const respond4 = await EventoApiService.getPersonaByEventoID(
        eventoSelecionadoID.value,
      )

      if (respond1) {
        evento.value.cargarDatos(respond1.data)
        tiempo.value.cargarDatos(respond2.data)
        ubicacion.value.cargarDatos(respond3.data)
        persona.value.cargarDatos(respond4.data)

        encontroEvento.value = true
      }
    }

    onMounted(async () => {
      await getEventos()
      console.log('props.idEvento');
      console.log(idEvento);
      if (idEvento) {
        eventoSelecionadoID.value = Number(idEvento);
        onEventoChange();
      }
      isReady.value = true
    })

    return {
      isReady,

      evento,
      tiempo,
      ubicacion,
      persona,

      eventos,
      encontroEvento,
      eventoSelecionadoID,
      onResetClick,
      onModificarClick,
      onEventoChange,
    }
  },
})
</script>
