<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.meta.app" />
  </div>
</template>

<script>

import Footer from './components/Footer'

export default {
  components: {
    Footer
  },
  mounted() {
  }
}
</script>

