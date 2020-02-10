<template>
  <div class="selector">
    <van-nav-bar left-arrow title="城市选择" @click-left="$emit('back')" class="navbar"></van-nav-bar>
    <search
      placeholder="输入城市名或拼音"
      @input="onSearchCitys"
      background="linear-gradient(90deg, #0af, #0085ff)"
      shape="round"
    />
    <div class="result-panel" @click="onSelectCity">
      <span v-for="(item, key) in test" :key="key">{{item}}</span>
      <van-cell-group title="当前定位城市" v-if="city">
        <van-cell :title="city" />
      </van-cell-group>
      <div v-once id="list" v-if="!value && !searchlist.length">
        <div :id="list.idx" v-for="(list, key) of data.cityList" :key="key">
          <div class="city-anchor">{{list.idx}}</div>
          <div class="city-cell" v-for="item of list.cities" :key="item.name">{{item.name}}</div>
        </div>
      </div>
      <div v-once class="no-result" v-else-if="value && !searchlist.length">无结果</div>
      <div v-else class="search-result">
        <div class="city-cell" v-for="item of searchlist" :key="item.name">{{item.name}}</div>
      </div>
    </div>
    <div v-once class="alphabet" v-if="!value" @click="onSelectAlphabet">
      <span class="alphabet-item" v-for="item of data.alphabet" :key="item">{{item}}</span>
    </div>
  </div>
</template>

<script>
import search from "@/components/pages/search";
import debounce from "../helper/debounce";

export default {
  components: {
    search
  },
  data() {
    return {
      value: "",
      show: true,
      test: [],
      data: {}
    };
  },
  computed: {
    searchlist() {
      if (!this.value) {
        return [];
      }

      let value = this.value.toLowerCase();
      let isPinyin = /^[A-Za-z]+$/.test(value);
      let isNumber = /\d/.test(value);

      // 数字无效
      if (isNumber) {
        return [];
      }

      let list = [];

      for (let { cities } of this.data.cityList) {
        let searchList = isPinyin
          ? cities.filter(item => item.pinyin.indexOf(value) !== -1)
          : cities.filter(item => item.name.indexOf(value) !== -1);

        list.push(...searchList);
      }

      return list;
    },
    city() {
      if (!this.value) {
        return this.$store.state.city;
      }

      return null;
    }
  },
  created() {
    if (!this.utils.storageGetter("cityList")) {
      let cityList = require("../assets/json/cityList.json");
      this.data = cityList;
      this.utils.storageSetter("cityList", JSON.stringify(cityList));
      return;
    }
    this.data = Object.freeze(JSON.parse(this.utils.storageGetter("cityList")));
  },
  mounted() {},
  methods: {
    onSelectCity(e) {
      let cell = this.utils.queryPathSelector(e, "city-cell");
      // 如果不是选择城市
      if (!cell) {
        return;
      }

      let cities = this.data.cityList.filter(
        item => item.idx === cell.parentElement.id
      )[0].cities;
      let city = cities.filter(item => item.name === cell.innerText)[0];
      alert(JSON.stringify(city), cell.innerText);
      // let name = cell.innerText;
      // this.$store.commit("setCity", name);
      // this.$emit("select", name);
    },
    onSelectAlphabet(e) {
      let item = this.utils.queryPathSelector(e, "alphabet-item");
      // 如果不是字母表
      if (!item) {
        return;
      }

      let panel = document.querySelector(".result-panel");
      let anchor = document.getElementById(item.innerText);
      panel.scrollTop = anchor.offsetTop;
    },
    onSearchCitys: debounce(function(value) {
      this.value = value;
    })
  }
};
</script>

<style lang="scss" scoped>
.result-panel {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  font-size: 14px;
  background-color: #fff;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
  opacity: 1;
}

.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #666;
}

.van-cell-group__title {
  background-color: #f5f5f5;
}

.search-result {
  opacity: 1;
}

.city-cell {
  line-height: 44px;
  margin-left: 15px;
  border-bottom: 1px solid #f2f2f2;
}

.alphabet {
  position: fixed;
  top: 120px;
  right: 0;
  color: #666;
  font-size: 12px;
  &-item {
    display: block;
    padding: 2px 5px;
    text-align: center;
  }
}

.city-anchor {
  background-color: #f2f2f2;
  padding-left: 15px;
  line-height: 36px;
}
</style>