<template>
  <div id="app">
    <keep-alive>
      <router-view />
      <Footer v-if="$route.meta.app" />
    </keep-alive>
  </div>
</template>

<script>
import Footer from "./components/Footer";

export default {
  components: {
    Footer
  },
  mounted() {}
};
</script>

