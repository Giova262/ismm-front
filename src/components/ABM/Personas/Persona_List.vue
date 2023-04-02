<style lang="sass" scoped></style>

<template>
  <q-page v-if="isReady" class="q-pa-sm bg-grey-3">
    <q-item-label
      overline
      class="text-uppercase bg-blue-1 text-blue-grey-8 text-weight-medium q-px-md"
    >
      <div class="row justify-between">
        <div class="q-py-sm">
          Miembros
          <q-badge color="primary" class="">
            {{ personasList.length }}
          </q-badge>
          <q-badge v-if="searchText" color="secondary" class="q-ml-xs">
            {{ personasFilteredOut.length }}
          </q-badge>
        </div>
      </div>
    </q-item-label>

    <q-item-label class="q-pt-xs q-px-xs">
      <q-input
        v-model="searchText"
        rounded
        dense
        flat
        clearable
        placeholder="Buscar.."
        class="full-width"
        standout="bg-blue-4 text-grey-8"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item-label>

    <q-virtual-scroll
      separator
      :items="personasFilteredOut"
      :virtual-scroll-slice-size="15"
      style="max-height: 80vh"
      class="q-mt-none"
    >
      <template v-slot="{ item }">
        <q-slide-item
          :key="item.id"
          @left="(e) => onLeft(e, item)"
          @right="(e) => onRight(e, item)"
          @click="onItemClick(item)"
        >
          <template v-slot:left>
            <div class="row items-center">
              <q-icon left name="visibility" /> Mostrar
            </div>
          </template>

          <template v-slot:right>
            <div class="row items-center">
              Modificar <q-icon right name="edit" />
            </div>
          </template>

          <q-item class="bg-white jg-border-radius q-mt-sm">
            <div class="row items-center full-width">
              <div class="col q-pr-md">
                <q-img
                  alt="Foto"
                  :src="item.foto_url"
                  :contain="true"
                  spinner-color="green"
                  class="text-grey-3 q-mr-sm"
                  placeholder-src="~assets/imagenDefecto.png"
                />
              </div>

              <div class="col-9 q-px-none">
                <q-item-section class="">
                  <q-item-label
                    class="text-grey-5 row items-center no-wrap q-mt-xs"
                  >
                    <span class="col-6">Id: {{ item.id }} </span>
                    <span class="col text-right">{{ item.iglesia }}</span>
                  </q-item-label>

                  <q-item-label
                    class="row items-center text-uppercase no-wrap q-mt-xs"
                  >
                    <span class="text-weight-medium q-pr-sm"
                      >{{ item.nombre }} {{ item.apellido }}</span
                    >

                    <span class="text-grey-6 q-pr-xs">({{ item.edad }})</span>
                    <span class="text-grey-6"> ({{ item.sexo }})</span>
                  </q-item-label>

                  <q-item-label
                    caption
                    class="row justify-between items-center"
                  >
                    <span>
                      <q-icon name="place" class="q-mr-xs" />
                      {{ item.direccion }}
                    </span>
                  </q-item-label>

                  <q-item-label
                    class="row justify-between items-center text-grey-6"
                  >
                    <span>Telf: {{ item.telefono }}</span>
                    <span>Ingreso: {{ item.fecha_ingreso }}</span>
                  </q-item-label>

                  <q-item-label
                    class="row justify-between items-center text-grey-6"
                  >
                    <span>Correo: {{ item.email }}</span>
                  </q-item-label>
                </q-item-section>
              </div>
            </div>
          </q-item>
        </q-slide-item>
      </template>
    </q-virtual-scroll>
  </q-page>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  onBeforeUnmount,
} from "vue";
import { useQuasar } from "quasar";
import PersonaInputs from "src/components/ABM/Personas/Persona_Inputs.vue";
import PersonaAPIService from "src/components/ABM/Personas/Persona_ApiService";
import Persona from "src/Models/Persona";
import {
  notificarError,
  notificarExito,
  notificarAPIError,
  notificarNoFeature,
} from "src/Services/NotificacionesService";

export default defineComponent({
  name: "Persona_List",
  components: {
    PersonaInputs,
  },
  props: {
    // ..
  },
  setup() {
    const $q = useQuasar();
    const isReady = ref(false);
    let timer;

    const personasList = ref([]);
    const searchText = ref(null);

    const personasFilteredOut = computed(() => {
      let listTemp = searchText.value ? filtrarLista() : personasList.value;
      return listTemp;
    });

    function filtrarLista() {
      return personasList.value.filter(
        (c) =>
          (c.nombre &&
            c.nombre
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.apellido &&
            c.apellido
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.sexo &&
            c.sexo
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.edad &&
            c.edad
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.email &&
            c.email
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.bautizado &&
            c.bautizado
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.iglesia &&
            c.iglesia
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.telefono &&
            c.telefono
              .toString()
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase()))
      );
    }

    function ordenarLista(lista) {
      let listaOrdered = lista.sort(function (a, b) {
        return Number(a.id) > Number(b.id);
      });
      return listaOrdered;
    }

    async function loadPersonasList() {
      const respondGetAll = await PersonaAPIService.getAll();
      if (respondGetAll) {
        personasList.value = [];
        respondGetAll.data.forEach(async (persona) => {
          const newPersona = new Persona();
          newPersona.cargarDatos(persona);
          personasList.value.push(newPersona);
        });
      }
    }

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 1000);
    }

    function onLeft({ reset }, item) {
      notificarNoFeature();
      finalize(reset);
    }

    function onRight({ reset }, item) {
      notificarNoFeature();
      finalize(reset);
    }

    function onItemClick() {
      notificarNoFeature();
    }

    onMounted(async () => {
      await loadPersonasList();
      isReady.value = true;
    });

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      onLeft,
      onRight,
      onItemClick,
      isReady,
      personasList,
      personasFilteredOut,
      searchText,
    };
  },
});
</script>
