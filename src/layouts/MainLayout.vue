<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Quasar Notes
        </q-toolbar-title>

        <div v-if="!!$route.meta.backButton" >
          <q-btn
            icon="arrow_back"
            flat
            @click="redirect"
          />
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    function redirect () {
      this.$router.push('/')
    }

    return {
      redirect
    }
  }
})
</script>
