<template>
  <q-page>
    <div v-if="isReady" class="fit">
      <PersonasDetalles :persona="persona"/>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted, computed } from "vue";
import Persona from "src/Models/Persona";
import PersonasDetalles from "src/components/ABM/Personas/Persona_Detalles";

export default defineComponent({
  name: "PersonaShow",
  components: {
    PersonasDetalles,
  },
  setup() {
    const $q = useQuasar();
    const isReady = ref(false);
    const persona = ref(new Persona());

    onMounted(async () => {
      persona.value.loadLocalStorage()
      isReady.value = true;
    });

    return {
      persona,
      isReady,
    };
  },
});
</script>
