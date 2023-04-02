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
                <q-item-label v-html="scope.opt.nombre" />
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
      <InputsEvento :evento="evento" :modoVista="true" class="col-12"/>
      <InputsTiempo :tiempo="tiempo" :modoVista="true" class="col-12" />
      <InputsUbicacion :ubicacion="ubicacion" :modoVista="true" class="col-12" />
      <InputsPersona :persona="persona" :modoVista="true" class="col-12" />
      <div class="col-12 q-my-md text-center">
        <q-btn label="Eliminar" color="red-5" @click="abrirConfirmarDialog" />
      </div>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" size="md" color="red-5" text-color="white" />
          <span class="q-ml-sm">Estas a punto de eliminar el evento selecionado, estas seguro de continuar</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="red-5" v-close-popup @click="onEliminarClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
    // ..
  },
  setup() {
    const $q = useQuasar()

    const evento = ref(new Evento())
    const tiempo = ref(new Tiempo())
    const ubicacion = ref(new Ubicacion())
    const persona = ref(new Persona())

    const isReady = ref(false)
    const confirm = ref(false)
    const encontroEvento = ref(false)
    const eventoSelecionadoID = ref(null)
    const eventos = ref([])

    function onResetClick() {
      evento.value = new Evento()
    }

    function abrirConfirmarDialog() {
      confirm.value = true;
    }

    function onEliminarClick() {
      evento.value.eliminar()
      evento.value = new Evento()
      tiempo.value = new Tiempo()
      ubicacion.value = new Ubicacion()
      persona.value = new Persona()
      encontroEvento.value = false
      eventoSelecionadoID.value = null
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
      isReady.value = true
    })

    return {
      isReady,
      confirm,

      evento,
      tiempo,
      ubicacion,
      persona,

      eventos,
      encontroEvento,
      eventoSelecionadoID,
      onResetClick,
      onEliminarClick,
      onEventoChange,
      abrirConfirmarDialog,
    }
  },
})
</script>
