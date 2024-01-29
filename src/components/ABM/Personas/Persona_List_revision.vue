<style lang="sass" scoped></style>

<template>
  <q-page v-if="isReady" class="q-px-sm bg-grey-3">
    <div
      overline
      class="row jg-border-radius-2 bg-blue-2 q-px-md justify-between q-mx-none q-mt-xs shadow-3"
    >
      <div class="q-py-sm">
        Miembros
        <q-badge color="primary" class="">
          {{ personasList.length }}
        </q-badge>
        <q-badge v-if="searchText" color="secondary" class="q-ml-xs">
          {{ personasFilteredOut.length }}
        </q-badge>
      </div>
      <div>
        <q-icon
          name="refresh"
          @click="onRefreshList"
          class="cursor-pointer q-py-sm"
          color="blue-9"
          size="sm"
        >
          <q-tooltip>Refrescar</q-tooltip>
        </q-icon>
      </div>
    </div>

    <q-input
      v-model="searchText"
      dense
      flat
      clearable
      rounded
      placeholder="Buscar.."
      class="fit q-mt-xs q-px-xs text-black q-mx-none"
      style="padding: 0px !important"
      standout="bg-blue-10 "
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-virtual-scroll
      :items="personasFilteredOut"
      :virtual-scroll-slice-size="15"
      style="height: 75vh !important"
      class="q-mt-sm"
    >
      <template v-slot="{ item }">
        <q-slide-item
          :key="item.id"
          class="jg-border-radius q-mb-sm q-mr-sm"
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

          <q-item class="bg-white">
            <div class="row items-center full-width">
              <div class="col q-pr-md">
                <q-img
                  alt="Foto"
                  :fit="'scale-down'"
                  loading="lazy"
                  :src="item.foto_url"
                  spinner-color="green"
                  class="text-grey-3 q-mr-sm"
                  placeholder-src="~assets/imagenDefecto.png"
                >
                  <template v-slot:error>
                    <div
                      class="absolute-full flex flex-center bg-negative text-white"
                    >
                      Cannot load image
                    </div>
                  </template>
                </q-img>
              </div>

              <div class="col-9 q-px-none">
                <q-item-section class="">
                  <q-item-label
                    class="text-grey-5 row items-center no-wrap q-mt-xs"
                  >
                    <div>
                      <span class="text-grey-7 q-pr-sm">Estado:</span>
                      <span class="col text-yellow-9 text-bold">
                        {{ item.estado }}
                      </span>
                    </div>
                    <span
                      v-if="item.iglesia"
                      class="col text-right text-purple-5 text-bold"
                      >{{ item.iglesia }}</span
                    >
                  </q-item-label>

                  <q-item-label
                    class="row items-center text-uppercase no-wrap q-mt-xs"
                  >
                    <span class="text-weight-medium q-pr-sm"
                      >{{ item.nombre }} {{ item.apellido }}</span
                    >

                    <span class="text-grey-6 q-pr-xs"
                      >({{ item.edad || "?" }})</span
                    >
                    <span class="text-grey-6"> ({{ item.sexo ? item.sexo.codigo : '-' }})</span>
                    <span class="text-grey-6 q-pl-xs">
                      <q-icon
                        v-if="item.bautizado"
                        color="green-8"
                        :name="'done'"
                    /></span>
                  </q-item-label>

                  <q-item-label
                    caption
                    class="row justify-between items-center"
                  >
                    <span>
                      <q-icon name="place" class="q-mr-none" />
                      {{ item.direccion || "No ingresada" }}
                    </span>
                  </q-item-label>

                  <q-item-label
                    class="row justify-between items-center text-grey-6"
                  >
                    <span>Telfono: {{ item.telefono }}</span>
                    <span v-if="item.fecha_ingreso"
                      >Fecha de ingreso: {{ item.fecha_ingreso }}</span
                    >
                  </q-item-label>

                  <q-item-label
                    class="row justify-between items-center text-grey-6"
                  >
                    <span v-if="item.email">Correo: {{ item.email }}</span>
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
import { useRouter } from "vue-router";
import PersonaInputs from "src/components/ABM/Personas/Persona_Inputs.vue";
import PersonaAPIService from "src/components/ABM/Personas/Persona_ApiService";
import Persona from "src/Models/Persona";
import PersonasDB from "src/db/PersonasDB";

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
    const router = useRouter();

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
          (c.edad &&
            c.edad
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.email &&
            c.email
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.direccion &&
            c.direccion
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.iglesia &&
            c.iglesia
              .toLowerCase()
              .includes(searchText.value.toString().toLowerCase())) ||
          (c.estado &&
            c.estado
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

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 1000);
    }

    function onLeft({ reset }, persona) {
      persona.saveLocalStorage();
      finalize(reset);
      router
        .push({
          name: "details",
        })
        .catch(() => {});
    }

    function onRight({ reset }, persona) {
      persona.saveLocalStorage();
      finalize(reset);
      router
        .push({
          name: "edit",
        })
        .catch(() => {});
    }

    function onItemClick(persona) {
      persona.saveLocalStorage();
      router
        .push({
          name: "details",
        })
        .catch(() => {});
    }

    async function cargarPersonasDesdeAPI() {
      await PersonaAPIService.setAuthEncabezado();
      const respondGetAll = await PersonaAPIService.getAll();
      if (respondGetAll) {
        await PersonasDB.migrar(respondGetAll.data);
        await cargarPersonasDesdeDexie();
      }
    }

    async function cargarPersonasDesdeDexie() {
      const respondGetAllFiltrado = await PersonasDB.getAllWhereEstado(
        "EN REVISION"
      );

      personasList.value = [];
      for (let i = 0; i < respondGetAllFiltrado.length; i++) {
        let persona = respondGetAllFiltrado[i];
        persona.id = persona.id_persona;
        const newPersona = new Persona();
        await newPersona.cargarDatos(persona);
        personasList.value.push(newPersona);
      }
    }

    async function onRefreshList() {
      await cargarPersonasDesdeAPI();
    }

    onMounted(async () => {
      await cargarPersonasDesdeDexie();
      isReady.value = true;
    });

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      onLeft,
      onRight,
      onItemClick,
      onRefreshList,
      isReady,
      personasList,
      personasFilteredOut,
      searchText,
    };
  },
});
</script>
