<template>
  <div class="selector" :style="{zindex: zindex}">
    <van-nav-bar left-arrow title="城市选择" @click-left="$emit('back')" class="navbar"></van-nav-bar>
    <search
      placeholder="输入城市名或拼音"
      @input="onSearchCitys"
      background="linear-gradient(90deg, #0af, #0085ff)"
      shape="round"
    />
    <div class="result-panel" @click="onSelectCity">
      <span  v-for="(item, key) in test" :key="key">{{item}}</span>
      
      <van-cell-group title="当前定位城市" v-if="city">
        <van-cell :title="city" />
      </van-cell-group>
      <van-index-bar
        class="result"
        :index-list="indexList"
        :sticky="false"
        highlight-color="rgb(0, 136, 255)"
        v-if="!value && !searchlist.length"
      >
        <div v-for="(list, key) in citys" :key="key">
          <van-index-anchor class="van-anchor" :index="list.idx" />
          <div class="city-cell" v-for="item in list.cities" :key="item.name">{{item.name}}</div>
        </div>
      </van-index-bar>
      <div class="no-result" v-if="value && !searchlist.length">无结果</div>
      <div v-if="value && searchlist.length" class="search-result">
        <div class="city-cell" v-for="(item, index) in searchlist" :key="index">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/pages/search";

export default {
  props: {
    data: {
      type: [Object],
      required: true
    },
    zindex: [String, Number]
  },
  components: {
    search
  },
  data() {
    return {
      value: "",
      indexList: [],
      citys: [],
      show: true,
      test: []
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
  mounted() {
    this.onUpdateData();
    this.indexList = this.data.alphabet;
    this.onSearchCitys = this._.debounce(this._searchCitys, 20, {
      leading: false,
      maxWait: 200
    });
  },
  methods: {
    onSelectCity(e) {
      let cell = this.utils.queryPathSelector(e, "city-cell");
      // 如果不是选择城市
      if (!cell) {
        return;
      }

      let name = cell.innerText;
      this.$store.commit("changeCity", name);
      this.$emit("select", name);
    },
    onUpdateData() {
      // 如果等价，就停止
      if(this.citys.length === this.data.cityList.length) {
        return;
      }

      let len = this.citys.length
      let data = this.data.cityList.filter((item, index) => index <= len)
      this.citys = Object.freeze(data)
      requestAnimationFrame(this.onUpdateData)
    },
    onSearchCitys() {},
    _searchCitys(value) {
      this.value = value;
      if (!value) {
        setTimeout(this.onUpdateData);
        return;
      }

      setTimeout(() => {
        this.citys = Object.freeze([this.data.cityList[0]]);
      });
    }
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
</style>