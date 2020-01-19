<template>
  <div class="view flex-column">
    <van-nav-bar left-arrow title="城市选择" @click-left="onBack" class="navbar"></van-nav-bar>
    <van-search
      placeholder="输入城市名或拼音"
      shape="round"
      background="linear-gradient(90deg, #0af, #0085ff)"
      @model="value"
    />
    <div class="touch flex-item" @click="onSelectCity">
      <van-index-bar :index-list="indexList" highlight-color="rgb(0, 136, 255)" v-if="!value">
        <div :id="key" v-for="(list, key) in citys" :key="key">
          <van-index-anchor class="van-anchor" :index="key"/>
          <van-cell :title="item" v-for="(item, index) in list" :key="index"/>
        </div>
      </van-index-bar>
      <div class="touch flex-center" v-if="value && !list.length">无结果</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      value: "",
      indexList: [],
      citys: [],
      list: [],
      show: true
    };
  },
  mounted() {
    this.updateData()
  },
  methods: {
    onBack() {
    },
    updateData() {
      this.citys = this.data
      this.indexList = Object.keys(this.data)
    },
    updateValue(value) {
      console.log(value)
      this.value += value
    },
    onSelectCity(e) {
      let el = this.utils.getPathElement(e, 'van-cell')
      if(!el) {
        return;
      }
    }
  } 
};
</script>

<style>
</style>