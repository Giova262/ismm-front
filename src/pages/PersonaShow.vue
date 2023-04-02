<template>
  <q-page >
    <div class="fit">
      <PersonasList />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PersonasList from "src/components/ABM/Personas/Persona_List";

export default defineComponent({
  name: "PersonaShow",
  components: {
    PersonasList,
  },
});
</script>
