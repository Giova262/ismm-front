<style lang="sass" scoped></style>

<template>
  <div class="">
    <div v-if="isReady" class="row q-gutter-y-sm bg-white q-pa-xs">
      <div class="col-12 text-center q-pa-none q-mt-sm">
        <q-img
          alt="Foto"
          :src="getURLImagen"
          :contain="false"
          :ref="ImagenRef"
          spinner-color="green"
          class="text-grey-3"
          style="height: 200px; width: 200px"
          placeholder-src="~assets/imagenDefecto.png"
          @click="onSeleccionarArchivoClick()"
        />

        <div class="col-12 text-center q-py-sm q-ma-none">
          <!-- <q-btn
            @click="onSeleccionarArchivoClick()"
            dense
            class="q-px-sm no-caps text-center"
            :label="`Seleccionar foto / Tomar foto`"
          ></q-btn> -->

          <q-file
            :ref="ImagenDataRef"
            class="q-mt-sm fotoRef1"
            v-model="persona.foto_data"
            accept=".jpg, image/*"
          >
          </q-file>
        </div>
      </div>

      <q-input
        dense
        clearable
        :disable="modoVista"
        v-model="persona.nombre"
        label="Nombre*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        dense
        clearable
        :disable="modoVista"
        v-model="persona.apellido"
        label="Apellido*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        dense
        clearable
        :disable="modoVista"
        v-model="persona.telefono"
        label="Telefono*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        mask="+## # ## #### ####"
        placeholder="Ej: +54 9 11 1234 5678"
        hint="Ejemplo: +54 9 11 1234 5678"
        hide-bottom-space
      />

      <q-select
        v-model="persona.estado"
        label="Estado"
        virtual-scroll-slice-size="60"
        use-chips
        dense
        class="col-sm-6 col-12 q-pr-sm"
        options-selected-class="text-grey"
        :options="opcionesEstados"
        hide-bottom-space
      >
        <template v-slot:selected-item="scope">
          <span text-color="grey-8" class="q-ma-none q-py-sm">
            {{ scope.opt.descripcion }}
          </span>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.descripcion }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        dense
        clearable
        :disable="modoVista"
        v-model="persona.comentario"
        autogrow
        label="Comentario"
        class="col-sm-6 col-12 q-pr-sm q-pb-sm"
        type="text"
        maxlength="200"
        placeholder="Se mudo, le queda lejos, etc"
        hide-bottom-space
      />

      <q-btn-toggle
        v-model="persona.bautizado"
        spread
        dense
        no-caps
        class="col-12"
        toggle-color="green-8"
        color="white"
        text-color="black"
        :options="[
          { label: 'No esta Bautizado', value: false },
          { label: 'Si esta Bautizado', value: true },
        ]"
      />

      <q-btn
        v-if="verMas"
        flat
        class="q-pr-md q-mt-md q-mb-none text-red-4"
        @click="verMas = false"
        dense
        label="Ocultar datos opcionales"
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.direccion"
        label="Direccion"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        filled
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.barrio"
        label="Barrio"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        filled
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.email"
        label="Correo"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        filled
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.iglesia"
        label="Iglesia"
        filled
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        filled
        clearable
        :disable="modoVista"
        v-model="persona.edad"
        label="Edad"
        class="col-sm-6 col-12 q-pr-sm"
        type="number"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        label="Fecha de Nacimiento"
        dense
        filled
        v-model="persona.fecha_nacimiento"
        class="col-sm-6 col-12 q-pr-sm"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="persona.fecha_nacimiento"
                mask="YYYY-MM-DD HH:mm"
                default-view="Years"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <!--
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="persona.fecha_nacimiento"
                mask="YYYY-MM-DD HH:mm"
                default-view="Years"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template> -->
      </q-input>

      <q-input
        v-if="verMas"
        label="Fecha de Ingreso"
        dense
        filled
        v-model="persona.fecha_ingreso"
        class="col-sm-6 col-12 q-pr-sm"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              ref="qDateProxy1"
            >
              <q-date
                v-model="persona.fecha_ingreso"
                default-view="Years"
                emit-immediately
                mask="YYYY-MM-DD HH:mm"
                @update:model-value="onClickAnio"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <!-- <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="persona.fecha_ingreso"
                mask="YYYY-MM-DD HH:mm"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template> -->
      </q-input>

      <q-select
        v-if="verMas"
        v-model="persona.sexo"
        virtual-scroll-slice-size="60"
        use-chips
        filled
        dense
        clearable
        class="col-sm-6 col-12 q-pr-sm q-mb-xs"
        options-selected-class="text-grey"
        :options="[
          { descripcion: 'Hombre', codigo: 'M' },
          { descripcion: 'Mujer', codigo: 'F' },
        ]"
      >
        <template v-slot:selected-item="scope">
          <span text-color="grey-8" class="q-ma-none q-py-sm">
            {{ scope.opt.descripcion }}
          </span>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              Sin opciones
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.descripcion }}</q-item-label>
              <q-item-label caption>{{ scope.opt.codigo }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        v-if="verMas"
        filled
        clearable
        :disable="modoVista"
        v-model="persona.testimonio"
        label="Testimonio"
        autogrow
        class="col-sm-6 col-12 q-pr-sm q-mt-md"
        type="text"
        maxlength="200"
        hide-bottom-space
      />

      <q-btn
        v-if="!verMas"
        flat
        class="q-pr-md q-mt-md q-mb-none text-green-4"
        @click="verMas = true"
        dense
        label="Mostrar datos opcionales"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted, computed } from "vue";
import Persona from "src/Models/Persona";
import EstadosDB from "src/db/EstadosDB";
import CustomSelect from "src/components/CustomComponents/Custom.select.vue";

export default defineComponent({
  name: "EventoCrearAbm",
  components: {
    CustomSelect,
  },
  props: {
    persona: {
      type: Persona,
      required: true,
    },
    modoVista: {
      type: Boolean,
      required: false,
      default: false,
    },
    estaEditando: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup({ persona, estaEditando }) {
    const $q = useQuasar();
    const isReady = ref(false);
    const verMas = ref(false);
    const ImagenRef = ref();
    const qDateProxy1 = ref(null);
    const ImagenDataRef = ref();
    const opcionesEstados = ref([]);

    const getURLImagen = computed(() => {
      if (!persona.foto_data) return persona.foto_url;
      const url = window.URL.createObjectURL(persona.foto_data);
      persona.foto_url = url;
      return url;
    });

    function onResetClick() {
      persona = new Persona();
    }

    function onGrabarClick() {
      if (persona.validacionParaCrear()) {
        persona.crear();
      }
    }

    function customFilterFunction(p, needle) {
      return (
        (p.id && p.id.toLowerCase().includes(needle)) ||
        (p.articulo && p.articulo.toLowerCase().includes(needle)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(needle)) ||
        (p.Descripcion && p.Descripcion.toLowerCase().includes(needle)) ||
        (p.rubro && p.rubro.toLowerCase().includes(needle)) ||
        (p.marca && p.marca.toLowerCase().includes(needle)) ||
        (p.precio && p.precio.toLowerCase().includes(needle)) ||
        (p.stock && p.stock.toLowerCase().includes(needle)) ||
        (p.modelo && p.modelo.toLowerCase().includes(needle))
      );
    }

    function onSeleccionarArchivoClick() {
      const fileInputRef = document.getElementsByClassName("fotoRef1");
      fileInputRef[0].click();
    }

    async function cargarEstados() {
      opcionesEstados.value = await EstadosDB.getAll();
    }

    function onClickAnio() {
      qDateProxy1.value.hide();
    }

    onMounted(async () => {
      await cargarEstados();
      if (estaEditando) {
        persona.estado = opcionesEstados.value.find((v) => {
          return String(v.descripcion) === String(persona.estado);
        });
      }
      isReady.value = true;
    });

    return {
      qDateProxy1,
      onClickAnio,
      ImagenDataRef,
      ImagenRef,
      isReady,
      verMas,
      getURLImagen,
      opcionesEstados,

      onResetClick,
      onGrabarClick,
      customFilterFunction,
      onSeleccionarArchivoClick,
    };
  },
});
</script>

<style>
.fotoRef1 {
  background: transparent;
  display: none;
}
</style>
