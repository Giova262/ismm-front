<style>
.q-header {
  height: 30px;
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="row bg-indigo-10 q-pt-xs">
        <div class="col text-white flex flex-center">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </div>

        <div class="col-9 flex flex-center">
          <div class="jg-text-14 text-bold text-grey-4 text-uppercase">
            Santuario Mundial de los Milagros
          </div>
        </div>

        <div class="col jg-text-13 text-grey-5 text-right flex flex-center">
          {{ version }}
        </div>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-indigo-10 text-grey-3"
      :width="240"
    >
      <q-list>
        <q-item-label header class="text-bold text-grey-2 q-pb-sm q-pt-md">
          MENU
        </q-item-label>

        <q-separator class="bg-grey-5 q-mx-md q-mb-md" />

        <q-item clickable tag="a" :to="'/persona/crear'">
          <q-item-section avatar>
            <q-icon :name="'person_add'" color="green-3" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Agregar</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Registra una persona</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator class="bg-blue-9 q-my-xs q-mx-xl" />

        <q-item clickable tag="a" :to="'/personas/show'">
          <q-item-section avatar>
            <q-icon :name="'search'" color="grey-3" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="">Ver Miembros</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Lista completa</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator class="bg-blue-9 q-mx-xl q-my-xs" />

        <q-item clickable tag="a" :to="'/personas/show/revision'">
          <q-item-section avatar>
            <q-icon :name="'person_search'" color="purple-3" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="">Ver en Revision</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Pendientes a contactarse</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator class="bg-blue-9 q-mx-xl q-my-xs" />

        <q-item
          clickable
          tag="a"
          target="_blank"
          :href="'https://online.bibliadeestudio.org'"
        >
          <q-item-section avatar>
            <q-icon :name="'favorite'" color="red-3" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Ver Biblia</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Biblia Online</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator class="bg-blue-9 q-mx-xl q-my-xs" />

        <q-item
          clickable
          tag="a"
          target="_blank"
          :href="'https://www.facebook.com/profile.php?id=100069881769785'"
        >
          <q-item-section avatar>
            <q-icon :name="'public'" color="blue-3" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Redes Sosciales</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator class="bg-grey-5 q-mx-md q-mt-md" />

        <q-item clickable flat @click.native="desloguear" class="q-mt-sm">
          <q-item-section avatar>
            <q-icon name="exit_to_app" color="red-5" />
          </q-item-section>

          <q-item-section>
            <q-item-label>SALIR</q-item-label>
            <q-item-label class="text-grey-5" caption
              >Cerrar Sesion</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="q-mt-sm">
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
