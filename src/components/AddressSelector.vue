<template>
  <div class="city-selector">
    <van-nav-bar left-arrow title="选择收货地址" @click-left="$emit('back')" class="navbar"></van-nav-bar>
    <search placeholder="请输入地址" @input="onSearchCitys" />
    <div class="touch flex-item" @click="onSelectCity">
      <van-index-bar
        class="result-panel"
        :index-list="indexList"
        highlight-color="rgb(0, 136, 255)"
        v-if="!value && !searchlist.length"
      >
        <div :id="key" v-for="(list, key) in citys" :key="key">
          <van-index-anchor class="van-anchor" :index="key"/>
          <van-cell :title="item" v-for="(item, index) in list" :key="index"/>
        </div>
      </van-index-bar>
      <div class="result-panel flex-center" v-if="value && !searchlist.length">无结果</div>
      <div class="result-panel" v-if="value && searchlist.length">
        <van-cell :title="item" v-for="(item, index) in searchlist" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/pages/search";
import pinyin4js from "pinyin4js";

export default {
  props: {
    data: {
      type: [Array, Object],
      required: true
    }
  },
  components: {
    search
  },
  data() {
    return {
      value: "",
      indexList: [],
      citys: [],
      show: true
    };
  },
  computed: {
    searchlist() {
      if (!this.value) {
        return [];
      }

      let list = [];
      let initial = "";
      let chineseReg = /[\u4e00-\u9fa5]+/;
      let isChinese = this.value.match(chineseReg);

      initial = pinyin4js.convertToPinyinString(
        this.value.charAt(0),
        "",
        pinyin4js.WITHOUT_TONE
      );

      list = this.data[initial[0].toLocaleUpperCase()] || [];
      // 如果没有值，表示无结果
      if (!list.length) {
        return list;
      }

      let textList = list.filter(item => item.match(this.value));
      // 如果輸入的是中文
      if (isChinese) {
        return textList;
      }

      let valuePinyin = pinyin4js.convertToPinyinString(
        this.value,
        "",
        pinyin4js.WITHOUT_TONE
      );

      // 拼音列表
      let caseList = list.filter(item => {
        let itemPinyin = pinyin4js.convertToPinyinString(
          item,
          "",
          pinyin4js.WITHOUT_TONE
        );
        return itemPinyin.match(valuePinyin);
      });

      return caseList;
    }
  },
  mounted() {
    this.citys = this.data;
    this.indexList = Object.keys(this.data);
    this.onSearchCitys = this._.debounce(
      value => {
        this.value = value;
        if (!value) {
          setTimeout(() => {
            this.citys = this.data;
          });
          return;
        }
        this.citys = Object.freeze({ A: this.data["A"] });
      },
      20,
      {
        leading: false,
        maxWait: 200
      }
    );
  },
  methods: {
    onSelectCity(e) {
      let cell = this.utils.queryPathSelector(e, "van-cell");
      // 如果不是选择城市
      if (!cell) { return; }
      this.$emit('select', cell.innerText)
    },
    onSearchCitys() {}
  }
};
</script>

<style lang="scss" scoped>
.result {
  &-panel {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
}
.city-selector {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
}
</style>