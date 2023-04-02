<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>

<template>
  <q-layout class="bg-grey-2 q-ma-xs">
    <div v-if="isReady" class="row q-gutter-y-md bg-white">

      <InputsEvento :evento="evento" class="col-12" />
      <InputsTiempo :tiempo="tiempo" class="col-12" />
      <InputsUbicacion :ubicacion="ubicacion" class="col-12" />
      <InputsPersona :persona="persona" class="col-12" />
      <div class="col-12 row q-px-xl q-mb-md q-mt-xl text-center">
        <q-btn label="Reset" color="grey-8" flat class="q-ml-sm" @click="onResetClick" />
        <q-space />

        <q-btn label="CREAR" color="green-5" @click="onGrabarClick" />

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

import InputsEvento from './InputsEvento'
import InputsTiempo from 'src/components/ABM/Tiempo/InputsTiempo'
import InputsUbicacion from 'src/components/ABM/Ubicacion/InputsUbicacion'
import InputsPersona from 'src/components/ABM/Persona/InputsPersona'

export default defineComponent({
  name: 'EventoCrearAbm',
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
    const isReady = ref(false)

    const evento = ref(new Evento())
    const tiempo = ref(new Tiempo())
    const ubicacion = ref(new Ubicacion())
    const persona = ref(new Persona())

    function onResetClick() {
      evento.value = new Evento()
      tiempo.value = new Tiempo()
      ubicacion.value = new Ubicacion()
      persona.value.reset()
    }

    async function onGrabarClick() {
      if (
        evento.value.validacionParaCrear() &&
        tiempo.value.validacionParaCrear() &&
        ubicacion.value.validacionParaCrear() &&
        persona.value.validacionParaCrear()
      ) {
        const newEvento = await evento.value.crear()
        const newTiempo = await tiempo.value.crear()
        const newUbicacion = await ubicacion.value.crear()
        const newPersona = await persona.value.crear()

        const request = {
          tiempo_id: newTiempo.data.data.id,
          ubicacion_id: newUbicacion.data.data.id,
          persona_id: newPersona.data.data.id,
          multimedia_id: null,
          etiqueta_id: null,
        }

        await evento.value.vincular(request, newEvento.data.data.id)
        onResetClick();
      }
    }

    onMounted(async () => {
      // evento.value.fakeData()
      // tiempo.value.fakeData()
      // ubicacion.value.fakeData()
      // persona.value.fakeData()
      isReady.value = true
    })

    return {
      isReady,
      evento,
      tiempo,
      ubicacion,
      persona,
      onResetClick,
      onGrabarClick,
    }
  },
})
</script>
