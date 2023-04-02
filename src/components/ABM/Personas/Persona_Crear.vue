<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>

<template>
  <q-page class="q-ma-sm">
    <div v-if="isReady" class="row q-gutter-y-md">
      <PersonaInputs :persona="persona" class="col-12" />

      <div class="col-12 row q-px-xl q-mb-md q-mt-xl text-center">
        <q-btn
          label="Reset"
          color="grey-8"
          flat
          class="q-ml-sm"
          @click="onResetClick"
        />
        <q-space />

        <q-btn label="Grabar" color="green-5" @click="onGrabarClick" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import PersonaInputs from "src/components/ABM/Personas/Persona_Inputs.vue";
import Persona from "src/Models/Persona";
import {
  notificarError,
  notificarExito,
  notificarAPIError,
} from "src/Services/NotificacionesService";

export default defineComponent({
  name: "Persona_Crear",
  components: {
    PersonaInputs,
  },
  props: {
    // ..
  },
  setup() {
    const $q = useQuasar();
    const isReady = ref(false);

    const persona = ref(new Persona());

    function onResetClick() {
      persona.value.reset();
    }

    async function onGrabarClick() {
      if (persona.value.validated()) {
        const respondStore = await persona.value.storePersona();
        if (respondStore) {
          persona.value.id = await respondStore.data.data.id;
          await persona.value.uploadImageFireBase();
          await persona.value.storeImagen();
          notificarExito("Registrado exitosamente!");
          onResetClick();
        }
      }
    }

    onMounted(async () => {
      isReady.value = true;
    });

    return {
      isReady,
      persona,
      onResetClick,
      onGrabarClick,
    };
  },
});
</script>
