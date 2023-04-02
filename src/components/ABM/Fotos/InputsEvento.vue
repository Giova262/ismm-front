<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>

<template>
  <div class="bg-red">
    <div v-if="isReady" class="row q-gutter-y-md bg-white q-pa-md">
      <div class="col-12">
        <span class="q-mr-sm">Datos del Evento</span>
        <q-icon
          v-if="verMas"
          name="minimize"
          size="xs"
          class=""
          @click="verMas = false"
        />
        <q-icon 
          v-else
          name="add"
          size="xs"
          class=""
          @click="verMas = true"
        />
      </div>

      <q-input
        filled
        dense
        clearable
        :disable="modoVista"
        v-model="evento.nombre"
        label="Nombre"
        class="col-4"
        type="text"
        maxlength="200"
        hint="Nombre del evento"
        hide-bottom-space
      />

      <q-input
        filled
        dense
        clearable
        type="text"
        :disable="modoVista"
        class="col-4 q-px-md"
        v-model="evento.titulo"
        label="Titulo"
        hint="Escribe un titulo"
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        type="text"
        class="col-4"
        :disable="modoVista"
        v-model="evento.subtitulo"
        label="Subtitulo"
        hint="Escribe un subtitulo"
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        filled
        dense
        clearable
        type="text"
        :disable="modoVista"
        v-model="evento.descripcion"
        label="Descripcion"
        class="col-12"
        autogrow
        maxlength="500"
        hint="Detalla lo ocurrido en el evento"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="evento.color"
        label="Color"
        hint="Selecciona un color"
        class="col-3 q-pr-md my-input"
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
            :style="{ color: evento.color }"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="evento.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-if="verMas"
        dense
        clearable
        type="text"
        :disable="modoVista"
        v-model="evento.icono"
        class="col-3 q-pr-md"
        hint="Selecciona un icono"
        label="Icono"
        hide-bottom-space
      />

      <q-input
        dense
        clearable
        type="text"
        :disable="modoVista"
        v-model="evento.foto"
        label="Foto"
        class="col-6 q-px-md"
        hide-bottom-space
        hint="Seleciona una foto"
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        type="text"
        v-model="evento.video"
        label="Video"
        class="col-6 q-pr-md"
        hint="Seleciona un video"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        type="text"
        v-model="evento.sonidoa"
        label="Sonido"
        class="col-6"
        hint="Seleciona un sonido"
        hide-bottom-space
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted } from 'vue'
import Evento from 'src/Models/Evento'

export default defineComponent({
  name: 'EventoCrearAbm',
  components: {
    // ..,
  },
  props: {
    evento: {
      type: Evento,
      required: true,
    },
    modoVista: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  setup({ evento }) {
    const $q = useQuasar()
    const isReady = ref(false)
    const verMas = ref(false)

    function onResetClick() {
      evento = new Evento()
    }

    function onGrabarClick() {
      if (evento.validacionParaCrear()) {
        evento.crear()
      }
    }

    onMounted(async () => {
      isReady.value = true
    })

    return {
      isReady,
      verMas,
      onResetClick,
      onGrabarClick,
    }
  },
})
</script>
