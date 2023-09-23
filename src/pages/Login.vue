<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">

    <!-- Para pantallas chicas -->
    <div class="lt-sm contenedor">
      <LoginFormMobile />
    </div>

    <!-- Para pantallas Grandes -->
    <div class="gt-xs contenedor">
      <LoginFormDesktop />
    </div>
  </q-layout>
</template>

<script>
import LoginFormDesktop from "src/components/Login/Login_Desktop.vue";
import LoginFormMobile from "src/components/Login/Login_Mobile.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({
  name: "Login",

  components: {
    LoginFormMobile,
    LoginFormDesktop,
  },

  setup(props, ctx) {
    const router = useRouter();

    onMounted(async () => {
      // ..
    });

    return {
      // ..
    };
  },
});
</script>
