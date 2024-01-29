<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>

<template>
  <q-page class="q-ma-sm">
    <div v-if="isReady" class="row q-gutter-y-md">
      <PersonaInputs :persona="persona" class="col-12" :estaEditando="true"/>

      <div class="col-12 row q-px-xl q-mb-md q-mt-xl text-center">
        <q-btn
          label="Volver"
          color="grey-8"
          flat
          class="q-ml-sm"
          @click="onVolverCLick"
        />
        <q-space />

        <q-btn label="Modificar" color="green-5" @click="onModificarClick" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import PersonaInputs from "src/components/ABM/Personas/Persona_Inputs.vue";
import Persona from "src/Models/Persona";
import { useRouter } from "vue-router";

import { notificarExito } from "src/Services/NotificacionesService";

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
    const router = useRouter();

    const persona = ref(new Persona());

    function onResetClick() {
      persona.value.reset();
    }

    async function onModificarClick() {
      if (persona.value.validated()) {
        const respondStore = await persona.value.update();
        if (respondStore) {

          if (persona.value.foto_data) {
            await persona.value.uploadImageFireBase();
            await persona.value.storeImagen();
          }

          router
            .push({
              name: "show",
            })
            .catch(() => {
              notificarExito("Modificado exitosamente!");
            });
        }
      }
    }

    function onVolverCLick() {
      router
        .push({
          name: "show",
        })
        .catch(() => {});
    }

    onMounted(async () => {
      persona.value.loadLocalStorage();
      isReady.value = true;
    });

    return {
      isReady,
      persona,
      onResetClick,
      onModificarClick,
      onVolverCLick,
    };
  },
});
</script>
