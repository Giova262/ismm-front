<template>
  <q-page >
    <div class="fit">
      <PersonasListRevision />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PersonasListRevision from "src/components/ABM/Personas/Persona_List_revision";

export default defineComponent({
  name: "PersonaShowRevision",
  components: {
    PersonasListRevision,
  },
});
</script>
