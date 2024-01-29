<style lang="sass" scoped></style>

<template>
  <div class="">
    <div v-if="isReady" class="row q-gutter-y-sm bg-grey-1 q-pa-xs">
      <div class="col-12 text-center q-my-md">
        <q-img
          alt="Foto"
          :fit="'scale-down'"
          loading="lazy"
          :src="persona.foto_url"
          spinner-color="green"
          class="text-grey-3 q-mr-sm"
          placeholder-src="~assets/imagenDefecto.png"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
      </div>

      <div class="col-12 q-pr-sm text-center text-grey-7 text-bold">
        {{ persona.nombre }} {{ persona.apellido }} ({{ persona.edad || "?" }})
        ({{ persona.sexo ? persona.sexo.codigo : "?" }})
      </div>

      <div
        v-if="persona.iglesia"
        class="col-12 q-pr-sm text-center text-grey-6"
      >
        Iglesia: {{ persona.iglesia }}
      </div>

      <div class="col-12 row text-center text-grey-6">
        <div size="xl" class="col-12 bg-transparent q-pa-none q-ma-none">
          <q-img
            width="30px"
            height="30px"
            src="~assets/whatssap.png"
            class="q-pa-none q-ma-none"
            :ratio="1"
          />
          <span class="text-bold">Telefono:</span>
          {{ persona.telefono }}

          <q-btn
            dense
            icon="call"
            @click="onWhatsappClick"
            flat
            color="blue-5"
            class=""
          ></q-btn>
        </div>
      </div>

      <div
        v-if="persona.email"
        class="col-12 q-pr-sm text- text-grey-6 row flex flex-center"
      >
        <div class="q-pr-sm">
          <q-img
            width="15px"
            height="15px"
            src="~assets/email.png"
            class="q-pa-none q-ma-none"
            :ratio="1"
            :fit="'scale-down'"
            @click="onWhatsappClick"
          />
        </div>
        <span class="text-bold q-pr-xs">Email:</span>
        <span class="q-pr-sm"> {{ persona.email }}</span>
        <div>
          <q-btn
            dense
            icon="send"
            @click="onEmailClick"
            flat
            color="blue-5"
            class="q-ml-sm"
          ></q-btn>
        </div>
      </div>

      <div
        v-if="persona.direccion"
        class="col-12 q-pr-sm text-center text-grey-6"
      >
        <span class="text-bold">Direccion:</span> {{ persona.direccion }}
      </div>

      <div
        v-if="persona.barrio"
        class="col-12 q-pr-sm text-center text-grey-6"
      >
        <span class="text-bold">Barrio:</span> {{ persona.barrio }}
      </div>

      <div
        v-if="persona.fecha_ingreso"
        class="col-12 q-pr-sm text-center text-grey-6"
      >
        <span class="text-bold">Fecha de Ingreso:</span>
        {{ persona.fecha_ingreso }}
      </div>

      <div
        v-if="persona.fecha_nacimiento"
        class="col-12 q-pr-sm text-center text-grey-6"
      >
        <span class="text-bold">Fecha de Nacimiento:</span>
        {{ persona.fecha_nacimiento }}
      </div>

      <div
        v-if="persona.bautizado"
        class="col-12 text-bold q-pr-sm text-center text-green-6"
      >
        Si esta Bautizado
      </div>
      <div v-else class="col-12 text-bold q-pr-sm text-center text-red-4">
        No esta Bautizado
      </div>

      <div class="col-12 text-center text-grey-8 bg-green-1 q-pa-sm">
        <span class="text-bold">Comentario:</span> <br />
        {{ persona.comentario }}
      </div>

      <div class="col-12 text-center text-grey-8 bg-blue-1 q-pa-sm">
        <span class="text-bold">Testimonio:</span> <br />
        {{ persona.testimonio }}
      </div>

      <div class="col-12 row q-px-xl q-mb-md q-mt-xl text-center">
        <q-btn
          label="Editar"
          color="grey-8"
          flat
          class="q-ml-sm"
          @click="onEditarClick"
        />
        <q-space />

        <q-btn label="Volver" color="green-5" @click="onVolverClick" />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import Persona from "src/Models/Persona";
import CustomSelect from "src/components/CustomComponents/Custom.select.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PersonaDetalles",
  components: {
    CustomSelect,
  },
  props: {
    persona: {
      type: Persona,
      required: true,
    },
  },
  setup({ persona }) {
    const $q = useQuasar();
    const router = useRouter();
    const isReady = ref(false);

    function onEditarClick() {
      router
        .push({
          name: "edit",
        })
        .catch(() => {});
    }

    function onVolverClick() {
      router
        .push({
          name: "show",
        })
        .catch(() => {});
    }

    function onWhatsappClick() {
      const link = `whatsapp://send/?phone=${
        persona.telefono
      }&text=${`Hola ${persona.nombre}! Como estas?`}`;
      window.open(link);
    }

    function onEmailClick() {
      const link = `mailto:${persona.email}?subject=Santuario Mundial de los Milagros&body=Hola ${persona.nombre}! Como estas?`;
      window.open(link);
    }

    onMounted(async () => {
      isReady.value = true;
    });

    return {
      isReady,
      onWhatsappClick,
      onEmailClick,
      onEditarClick,
      onVolverClick,
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
