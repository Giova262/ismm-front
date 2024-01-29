<template>
  <q-page class="flex flex-center fit">
    <div class="row fit">
      <div class="col-12 text-center q-py-sm text-grey-8 text-uppercase">Modificar Persona</div>
      <div class="fit">
        <PersonaModificar />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PersonaModificar from "src/components/ABM/Personas/Persona_Modificar";

export default defineComponent({
  name: "PersonaEdit",
  components: {
    PersonaModificar,
  },
});
</script>
