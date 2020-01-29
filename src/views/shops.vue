<template>
  <div class="page">
    <van-nav-bar
      left-arrow
      left-text="美食"
      @click-left="$router.go(-1)"
      class="navbar font-bold home-header"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-tabs
      v-model="active"
      background="linear-gradient(90deg, #0af, #0085ff)"
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="rgba(255, 255, 255, .66)"
      line-width="2.3rem"
      class="foods-tabs"
      animated
      sticky
      lazy-render
      :offsetTop="40"
    >
      <van-tab :title="item.name" v-for="item in tabs" :key="item.type">
        <FoodFilter class="home-filter" :morefilter="morefilter" />
        <shop :data="shop" v-for="(shop, index) in item.list" :key="index" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import morefilter from "../assets/json/morefilter.json";
import FoodFilter from "@/components/FoodsFilter.vue";
import shop from "@/components/pages/shop.vue";
export default {
  name: "shops",
  data() {
    return {
      morefilter: Object.freeze(morefilter),
      active: 0,
      tabs: [
        {
          type: 0,
          name: "全部",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 1,
          name: "粉面粥店",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 2,
          name: "简餐便当",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 3,
          name: "汉堡披萨",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 4,
          name: "香锅冒菜",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 5,
          name: "小吃炸串",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 6,
          name: "地方菜系",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 7,
          name: "全球美食",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 8,
          name: "轻食简陋",
          list: [],
          loading: false,
          finished: false
        },
        {
          type: 9,
          name: "甜品饮品",
          list: [],
          loading: false,
          finished: false
        }
      ]
    };
  },
  components: { FoodFilter, shop },
  methods: {}
};
</script>

<style lang="scss" scoped>
.van-tab--active {
  color: #fff;
}
.foods-tabs {
  .van-tab {
    &--active {
      color: #fff;
    }
  }
}
</style>
