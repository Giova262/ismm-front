<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>

<template>
  <div class="">
    <div v-if="isReady" class="row q-gutter-y-sm bg-white q-pa-md">
      <div class="col-12">
        <span class="q-mr-sm">Datos de Persona involucrada en el evento</span>
        <q-icon
          v-if="verMas"
          name="minimize"
          size="xs"
          class=""
          @click="verMas = false"
        />
        <q-icon v-else name="add" size="xs" class="" @click="verMas = true" />
      </div>

      <q-select
        v-model="persona.personaSelecionada"
        :options="optionesPersonas"
        label="Personas"
        virtual-scroll-slice-size="60"
        use-chips
        filled dense
        stack-label
        clearable
        @update:model-value="onPersonaChange"
        class="col-6 q-px-sm q-mb-sm"
        options-selected-class="text-deep-orange"
      >
        <template v-slot:selected-item="scope">
          <span text-color="grey-8" class="q-ma-none q-px-md q-py-sm">
            {{ scope.opt.nombre }}
          </span>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              No options slot
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.nombre }}</q-item-label>
              <q-item-label caption>{{ scope.opt.id }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        filled
        dense
        clearable
        :disable="modoVista"
        v-model="persona.nombre"
        label="Nombre"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Oscar"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.apellido"
        label="Apellido"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Perez"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.sexo"
        label="Sexo"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="1"
        hint="Ej: M o F"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.edad"
        label="Edad"
        class="col-6 q-pr-sm"
        type="number"
        maxlength="200"
        hint="Ej: 32"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.nacionalidad"
        label="Nacionalidad"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Italiano"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.documento"
        label="Documento"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: DNI"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.profesion"
        label="Profesion"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Arquitecto"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.religion"
        label="Religion"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Cristiano"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.orientacion"
        label="Orientacion"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Heterosexual"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.fecha_nacimiento"
        label="Fecha Nacimiento"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: 15/02/1910"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.fecha_muerte"
        label="Fecha Muerte"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: 15/02/1911"
        hide-bottom-space
      />
      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="true"
        v-model="persona.id"
        label="ID"
        class="col-6 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: 15/02/1911"
        hide-bottom-space
      />
      <q-btn
        dense
        v-if="verMas"
        class="col-12 q-my-sm"
        label="Reset persona"
        @click="onResetClick"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import Persona from "src/Models/Persona";
import PersonaAPIService from "./PersonaAPIService";

export default defineComponent({
  name: "EventoCrearAbm",
  components: {
    // ..,
  },
  props: {
    persona: {
      type: Persona,
      required: false,
    },
    modoVista: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup({ persona }) {
    const $q = useQuasar();
    const isReady = ref(false);
    const verMas = ref(false);
    const optionesPersonas = ref([]);

    function onResetClick() {
      persona.reset();
    }

    function onGrabarClick() {
      if (persona.validacionParaCrear()) {
        persona.crear();
      }
    }

    async function getPersonas() {
      const res = await PersonaAPIService.getPersonas();
      if (res) {
        optionesPersonas.value = res.data;
      }
    }

    function onPersonaChange() {
      console.log("onPersonaChange");
      console.log(persona.personaSelecionada);
      persona.cargarDatos(persona.personaSelecionada);
    }

    onMounted(async () => {
      await getPersonas();
      isReady.value = true;
    });

    return {
      isReady,
      verMas,
      optionesPersonas,
      onPersonaChange,
      onResetClick,
      onGrabarClick,
    };
  },
});
</script>
