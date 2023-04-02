<template>
  <q-page class="flex flex-center fit">
    <div class="row fit">
      <div class="col-12 text-center q-py-sm text-grey-8 text-uppercase">Registrar Persona</div>
      <div class="fit">
        <CrearPersona />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CrearPersona from "src/components/ABM/Personas/Persona_Crear";

export default defineComponent({
  name: "PersonaStore",
  components: {
    CrearPersona,
  },
});
</script>
