<template>
  <div v-if="show">
      <van-nav-bar left-arrow title="城市选择" @click-left="show = false" class="navbar"></van-nav-bar>
      <van-search
        placeholder="输入城市名或拼音"
        shape="round"
        v-model="value"
        background="linear-gradient(90deg, #0af, #0085ff)"
      />
    <div class="main">
      <van-index-bar :index-list="indexList">
        <div v-for="(list, key) in citys" :key="key">
          <van-index-anchor :index="key" />
          <van-cell :title="item"  v-for="(item, index) in list" :key="index" />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
const citys = require("./citys.json");
export default {
  data() {
    return {
      value: "",
      indexList: Object.keys(citys),
      citys: Object.freeze(citys),
      show: true
    };
  }
};
</script>

<style scoped>
</style>