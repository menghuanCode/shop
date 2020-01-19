<template>
  <div class="home">
    <CitySelect :data="city" />
  </div>
</template>

<script>
import city from '../assets/json/citys.json'
// @ is an alias to /src
import CitySelect from '@/components/CitySelect'

export default {
  name: 'home',
  data() {
    return {
      city: Object.freeze(city)
    }
  },
  components: {
    CitySelect
  }
}
</script>
