<template>
  <div class="page" v-if="show">
    <van-nav-bar left-arrow title="城市选择" @click-left="show = false" class="navbar"></van-nav-bar>
    <van-search
      placeholder="输入城市名或拼音"
      shape="round"
      v-model="value"
      background="linear-gradient(90deg, #0af, #0085ff)"
    />
    <div class="main">
      <div>
        <div class="index-anchor">
          <div class="van-index-anchor">当前定位城市</div>
          <van-cell title="赤峰"/>
        </div>
        <van-index-bar highlight-color="#000" :index-list="indexList" :sticky="false">
          <div v-for="(item, index) in citys" :key="index" class="area">
            <van-index-anchor :index="index" class="index-anchor"/>
            <van-cell v-for="(title, cellIndex) in item" :key="cellIndex" :title="title"/>
          </div>
        </van-index-bar>
      </div>
      <div class="touch">
        <!-- <div class="wh flex-center font-md" v-if="!searchList.length">无结果</div> -->

        <!-- <van-cell v-for="(item, index) in searchList" :key="index" :title="item"/> -->
      </div>
    </div>
  </div>
</template>
<script>
const citys = require("./citys.json");

export default {
  data() {
    return {
      show: true,
      indexList: Object.keys(citys),
      citys: citys,
      value: ""
    };
  },
  computed: {
    // searchList() {
    //   let list = [];
    //   let initial = this.pinyin4js.convertToPinyinString(
    //     this.value.charAt(0),
    //     "",
    //     this.pinyin4js.WITHOUT_TONE
    //   );
    //   list = this.citys[initial.toLocaleUpperCase()] || [];
    //   // 如果没有值，表示无结果
    //   if (!list.length) {
    //     return list;
    //   }
    //   let textFilter = list.filter(item => item.match(this.value));
    //   // 如果中文有值返回结果
    //   if (textFilter.length) {
    //     return textFilter;
    //   }
    //   let valuePinyin = this.pinyin4js.convertToPinyinString(
    //     this.value,
    //     "",
    //     this.pinyin4js.WITHOUT_TONE
    //   );
    //   let caseFilter = list.filter(item => {
    //     let itemPinyin = this.pinyin4js.convertToPinyinString(
    //       item,
    //       "",
    //       this.pinyin4js.WITHOUT_TONE
    //     );
    //     return itemPinyin.match(valuePinyin);
    //   });
    //   return caseFilter;
    // }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.main {
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 100%;
  overflow: auto;
  margin-bottom: 1.33333rem;
  -webkit-overflow-scrolling: touch;
}
</style>