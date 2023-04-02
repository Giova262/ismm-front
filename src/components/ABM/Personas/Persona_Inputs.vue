<style lang="sass" scoped></style>

<template>
  <div class="">
    <div v-if="isReady" class="row q-gutter-y-sm bg-white q-pa-xs">
      <div class="col-12 q-mb-sm">
        <span class="q-mr-sm">Datos de la persona</span>
        <q-icon
          v-if="verMas"
          name="add"
          rounded
          size="xs"
          class="bg-green-3"
          @click="verMas = false"
        />
        <q-icon
          v-else
          rounded
          name="add"
          size="xs"
          class=""
          @click="verMas = true"
        />
      </div>

      <!-- Foto -->
      <div class="col-12 text-center">
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
          <q-btn
            @click="onSeleccionarArchivoClick()"
            dense
            class="q-px-sm no-caps text-center"
            :label="`Seleccionar foto / Tomar foto`"
          ></q-btn>

          <q-file
            :ref="ImagenDataRef"
            class="q-mt-sm fotoRef1"
            v-model="persona.foto_data"
            accept=".jpg, image/*"
          >
          </q-file>
        </div>
      </div>
      <!-- Foto -->

      <q-input
        filled
        dense
        clearable
        :disable="modoVista"
        v-model="persona.nombre"
        label="Nombre*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Fulanito"
        hide-bottom-space
      />

      <q-input
        filled
        dense
        clearable
        :disable="modoVista"
        v-model="persona.apellido"
        label="Apellido*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Perez"
        hide-bottom-space
      />

      <q-input
        filled
        dense
        clearable
        :disable="modoVista"
        v-model="persona.telefono"
        label="Telefono*"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: +541126251235"
        hide-bottom-space
      />

      <q-select
        v-model="persona.sexo"
        label="Sexo*"
        virtual-scroll-slice-size="60"
        use-chips
        filled
        dense
        hint="Ej: Mujer"
        clearable
        class="col-sm-6 col-12 q-pr-sm"
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

      <div v-if="verMas" class="col-12 q-mt-lg">
        <span class="q-mr-sm">Datos adicioneles opcionales</span>
      </div>

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.direccion"
        label="Direccion"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        hint="Ej: Calle falsa 123"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.email"
        label="Correo electronico / Email"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: prz@gmail.com"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.iglesia"
        label="Iglesia Cede"
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Madero"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.comentario"
        label="Comentario"
        autogrow
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Tiene pelo rojo"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.testimonio"
        label="Testimonio"
        autogrow
        class="col-sm-6 col-12 q-pr-sm"
        type="text"
        maxlength="200"
        hint="Ej: Supero la depresion"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        dense
        clearable
        :disable="modoVista"
        v-model="persona.edad"
        label="Edad"
        class="col-sm-6 col-12 q-pr-sm"
        type="number"
        hint="Ej: 45"
        hide-bottom-space
      />

      <q-input
        v-if="verMas"
        label="Fecha de Nacimiento"
        dense
        clearable
        hint="Ej: 26-02-1800"
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
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

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
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-if="verMas"
        label="Fecha de Ingreso"
        dense
        clearable
        hint="Ej: 06-02-1830"
        v-model="persona.fecha_ingreso"
        class="col-sm-6 col-12 q-pr-sm"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="persona.fecha_ingreso" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
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
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted, computed } from "vue";
import Persona from "src/Models/Persona";
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
  },
  setup({ persona }) {
    const $q = useQuasar();
    const isReady = ref(false);
    const verMas = ref(false);
    const ImagenRef = ref();
    const ImagenDataRef = ref();

    const getURLImagen = computed(() => {
      if (!persona.foto_data) return null;
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

    onMounted(async () => {
      isReady.value = true;
    });

    return {
      ImagenDataRef,
      ImagenRef,
      isReady,
      verMas,
      getURLImagen,

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
