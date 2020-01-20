<template>
  <div class="home">
    <AddressSelector v-if="!isCitySelection" @select="getSelectCity" @back="isCitySelection = false"  />
    <CitySelector :data="citys" v-else @select="getSelectCity" @back="isCitySelection = false"  />
  </div>
</template>

<script>
import citys from '../assets/json/citys.json'
import CitySelector from '@/components/CitySelector.vue'
import AddressSelector from '@/components/AddressSelector.vue'

export default {
  name: 'home',
  data() {
    return {
      citys: Object.freeze(citys),
      city: '',
      isCitySelection: true,
    }
  },
  components: {
    CitySelector,
    AddressSelector
  },
  methods: {
    getSelectCity(city) {
      this.city = city
      this.isCitySelection = false
    }
  }
}
</script>
