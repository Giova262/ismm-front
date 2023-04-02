<template>
  <div>
    <q-select
      dense
      :label="label"
      :value="value"
      @input="evt => $emit('input', evt)"
      use-input
      input-debounce="0"
      :options="opcionesItemsFiltrados"
      @filter="filterFn"
      :option-label="optionLabel"
      emit-value
      map-options
      clearable
      filled
      hide-bottom-space
      class="ellipsis"
      :disabled="disabled"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No hay resultados </q-item-section>
        </q-item>
      </template>

      <template #option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section>
            <q-item-label>
              <span class="text-light">{{ scope.opt[labelMostrar] }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Fuse from 'fuse.js';

export default {
  name: 'CustomSelectPublicaciones',
  props: {
    value: {
      type: Object,
      required: false,
    },
    modo: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      required: true,
      default: 'Desc',
    },
    labelMostrar: {
      type: String,
      required: false,
      default: 'descripcion',
    },
    opciones: {
      type: Array,
      required: true,
      default: [],
    },
    keys: {
      type: Array,
      required: true,
      default: [],
    },
    funcionFilter: {
      type: Function,
      required: false,
      default: () => {},
    },
    optionLabel: {
      type: String,
      required: false,
      default: 'descripcion',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const opcionesItemsFiltrados = ref([]);
    const fuse = ref(null);
    const filtroOpciones = ref({
      isCaseSensitive: false,
      includeScore: false,
      includeMatches: false,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: false,
      threshold: 0.3, // 0.0 es match exacto
      location: 0,
      distance: 100,
      ignoreLocation: false,
      useExtendedSearch: true,
      ignoreFieldNorm: false,
      keys: [],
    });

    function filterFn(val, update) {
      if (val === '') {
        update(() => {
          opcionesItemsFiltrados.value = props.opciones;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        if (props.opciones.length > 0) {
          filtroOpciones.value.keys = props.keys;
        }

        fuse.value = new Fuse(props.opciones, filtroOpciones.value);

        let nuevo = [];
        fuse.value.search(needle).forEach(element => {
          nuevo.push(element.item);
        });

        opcionesItemsFiltrados.value = [...nuevo];
      });
    }

    onMounted(async () => {
      // ..
    });

    return {
      opcionesItemsFiltrados,
      filterFn,
    };
  },
};
</script>

<style></style>
