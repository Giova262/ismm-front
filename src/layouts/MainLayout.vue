
<style>
/* .q-header {
  height: 30px !important;
} */
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row bg-green-10">
        <div class="col-2 text-white">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </div>

        <div class="col">
          <div class="jg-text-14 text-grey-4 text-uppercase">
            Santuario Mundial de los Milagros
          </div>
        </div>

        <div class="col-1 jg-text-13 text-grey-4 text-right text-italic">
          {{ version }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-grey-9 text-grey-2">
      <q-list>
        <q-item-label header class="text-grey-2 q-ml-sm"> MENU </q-item-label>

        <q-separator class="q-mx-xs bg-grey-6 q-mb-md"></q-separator>


        <q-item clickable tag="a" :to="'/persona/crear'">
          <q-item-section avatar>
            <q-icon :name="'person_add'" :style="{ color: '#a5d6a7' }" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Agregar</q-item-label>
            <!-- <q-item-label caption>Registra una persona</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-7 q-mx-xl " />


        <q-item clickable tag="a" :to="'/personas/show'">
          <q-item-section avatar>
            <q-icon :name="'search'" :style="{ color: '#eeeee' }" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Ver Miembros</q-item-label>
            <!-- <q-item-label caption>Muestra todos los ingresados</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-7 q-mx-xl " />


        <q-item clickable tag="a" :to="'/personas/show/revision'">
          <q-item-section avatar>
            <q-icon :name="'person_search'" :style="{ color: '#ce93d8' }" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Ver en Revision</q-item-label>
            <!-- <q-item-label caption>Muestra todos los ingresados</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-7 q-mx-xl " />

        <q-item
          clickable
          tag="a"
          target="_blank"
          :href="'https://www.facebook.com/profile.php?id=100069881769785'"
        >
          <q-item-section avatar>
            <q-icon :name="'public'" :style="{ color: '#90caf9' }" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <!-- <q-item-label caption>Santuario Mundial Fb</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-7 q-mx-xl " />

        <q-item
          clickable
          tag="a"
          target="_blank"
          :href="'https://online.bibliadeestudio.org'"
        >
          <q-item-section avatar>
            <q-icon :name="'favorite'" :style="{ color: '#ef9a9a' }" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Ver Biblia</q-item-label>
            <!-- <q-item-label caption>Biblia Online</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-7 q-mx-md q-my-md" />

        <q-item clickable flat @click.native="desloguear" class="">
          <q-item-section avatar>
            <q-icon size="md" name="exit_to_app" color="red-4" />
          </q-item-section>
          <q-item-section>SALIR</q-item-section>
        </q-item>


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { VERSION } from "src/config/app.config.js";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";



export default defineComponent({
  name: "MainLayout",

  components: {
    // ..
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const version = ref(VERSION);
    const router = useRouter();


    function desloguear() {
      LocalStorage.remove("usuario");
      router.push("/login").catch(() => {});
    }

    return {
      version,
      desloguear,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>


