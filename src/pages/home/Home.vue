<template>
  <div class="page">
    <HomeHeader />
    <HomeSearch />
    <NoDataTip v-if="!address" :tip="tip"></NoDataTip>
    <div v-else>
      <HomeEnter :list="entries"></HomeEnter>
      <section class="home-section">
        <HomeBanner></HomeBanner>
        <HomeVipbar></HomeVipbar>
      </section>
      <div class="shoplist-title">推荐商家</div>
      <HomeFoodFilter :list="batch_filter" />
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
      <div>123123</div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "./components/Header";
import HomeSearch from "./components/Search";
import HomeEnter from "./components/Enter";
import HomeBanner from "./components/Banner";
import HomeVipbar from "./components/Vipbar";
import HomeFoodFilter from "@/components/foodFilter/FoodFilter";

import NoDataTip from "@/components/noDataTip/NoDataTip";

import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSearch,
    HomeEnter,
    HomeBanner,
    HomeVipbar,
    HomeFoodFilter,
    NoDataTip
  },
  computed: {
    ...mapState(["address"])
  },
  data() {
    return {
      isLocation: false,
      tip: null,
      entries: null,
      batch_filter: {}
    };
  },
  mounted() {
    axios.get("/api/batch_filter.json").then(res => {
      this.batch_filter = res.data;
    });
  },
  methods: {
    handleFoodFilter(params) {
      console.log(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~scss/variable.scss";
.home {
  &-section {
    padding: 0 10px;
    margin-bottom: 8px;
  }
}
</style>