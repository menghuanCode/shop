<template>
  <div class="home">
    <CitySelect />
  </div>
</template>

<script>
// @ is an alias to /src
import CitySelect from '@/components/CitySelect'

export default {
  name: 'home',
  components: {
    CitySelect
  }
}
</script>
