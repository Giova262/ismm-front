<style scoped>
.div-1 {
  background-color: #210149;
  width: 600px;
  height: auto;
  padding: 0px 24px 24px;
}
.bg-image2 {
  filter: blur(8px);
  -webkit-filter: blur(8px);
  height: auto;
  padding: 0px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: slideinRight 1s;
}
.sliding-background {
  animation: slideinLeft 1s;
}
@keyframes slideinLeft {
  from {
    margin-left: 90%;
  }
  to {
    margin-left: 0px;
  }
}
@keyframes slideinRight {
  from {
    margin-right: 90%;
  }
  to {
    margin-right: 0px;
  }
}
.test {
  animation: slideinRight 1s;
}

@keyframes rotating {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
</style>

<template>
  <q-layout>
    <q-layout v-if="!isLoading" class="bg-caja shadow-20 flex flex-center">
      <div class="q-pa-none q-ma-none q-pt-md">
        <div class="shadow-6 q-py-md bg-grey-3 jg-border-radius-2">
          <div class="text-center text-grey-9 text-weight-bolder">
            <img src="~assets/logo.jpeg" style="width: 240px" />
            <div class="jg-text-18 text-bold q-mt-md">
              Santuario Mundial de los Milagros
            </div>
          </div>
        </div>

        <div class="div-1 q-mb-sm q-mb-lg jg-border-radius-2 q-mt-sm">
          <q-input
            v-model="form.name"
            label="Usuario"
            type="text"
            dark
            autocomplete="new-password"
            autofocus
            :hide-bottom-space="true"
          />
          <q-input
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            dark
            autocomplete="new-password"
            :hide-bottom-space="true"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="col-12 text-center">
            <q-btn
              label="Ingresar"
              color="primary"
              class="q-mt-lg q-px-sm shadow-3"
              style="width: 200px"
              @click="ingresar"
            />
          </div>

          <div
            class="text-caption text-center text-grey-2 q-mt-xs text-weight-light q-pt-sm"
          >
            {{ appVersion }}
          </div>
        </div>
      </div>
    </q-layout>
  </q-layout>
</template>

<script>
import APIService from "src/components/Login/Login_ApiService";
import { defineComponent, onMounted, ref } from "vue";
import { VERSION } from "src/config/app.config";
import { useRouter } from "vue-router";
import {
  notificarError,
  notificarExito,
} from "src/Services/NotificacionesService";
import { isEmpty } from "src/Services/ValidacionesService";

export default defineComponent({
  name: "Login_Desktop",

  components: {},

  setup(props, ctx) {
    const appVersion = ref(VERSION);
    const router = useRouter();

    const form = ref({ name: "", password: "" });
    const isPwd = ref(true);
    const isLoading = ref(false);

    function validacion() {
      if (isEmpty(form.value.name)) {
        notificarError("Ingresá tu usuario");
        return false;
      }
      if (isEmpty(form.value.password)) {
        notificarError("Ingresá tu contraseña");
        return false;
      }
      return true;
    }

    async function ingresar() {
      if (!validacion()) return;

      const datos = await APIService.apiLogin(form.value);
      if (datos) {
        localStorage.setItem("usuario", JSON.stringify(datos.data));
        APIService.setAuthEncabezado(datos.data.accessToken);
        notificarExito("Conectado");
        router
          .push({
            name: "inicio",
          })
          .catch(() => {});
      }
    }

    onMounted(async () => {
      isLoading.value = false;
    });

    return {
      isLoading,
      appVersion,
      form,
      isPwd,
      ingresar,
    };
  },
});
</script>
