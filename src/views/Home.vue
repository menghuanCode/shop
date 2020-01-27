<template>
  <div class="home">
    <van-nav-bar
      left-arrow
      left-text="正在获取地址中..."
      @click-left="isLocation = true"
      class="navbar font-bold home-header"
    >
      <div slot="left" class="font-lg flex-center">
        <van-icon name="location" />
        <span class="address">{{address.name || '未能获取到地址'}}</span>
        <van-icon name="arrow-down" size="0.32rem" class="ml-1" />
      </div>
    </van-nav-bar>
    <van-sticky>
      <search class="foods-search" background="linear-gradient(90deg, #0af, #0085ff)">
        <div class="foods-search__content">
          <svg class="icon icon-sm pr-1" aria-hidden="true">
            <use xlink:href="#iconsearch" />
          </svg>
          <span>搜索饿了么商家、商品名称</span>
        </div>
      </search>
    </van-sticky>
    <PageAction
      v-if="!address"
      :pic="require('../assets/images/no01.gif')"
      title="输入地址后才能订餐哦！"
      button="手动选择地址"
      @click="isLocation = true"
    />
    <div v-if="address">
      <div class="footenter">
        <van-grid class="menu" center clickable :column-num="5" :border="false">
          <van-grid-item v-for="(item, index) in menu" :key="index">
            <div class="menu-item">
              <van-image :src="item.pic" class="menu-pic" />
              <div class="menu-text">{{item.text}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <section class="section">
        <banner
          class="banner"
          title="品质套餐"
          desc="搭配齐全吃得好"
          link="立即抢购 >"
          :pic="require('../assets/images/foods03.png')"
        />
        <div class="vipbar">
          <div class="vipbar-content">
            <img src="../assets/images/icon01.jpeg" alt class="mr-1" />
            <span class="font-sm font-bold mr-1">超级会员</span>
            <span class="font-xs">
              <b class="dot"></b>每月领20元红包
            </span>
          </div>
          <a href="javascript:;" class="vipbar-link">立即开通</a>
        </div>
      </section>
      <div class="shoplist-title">推荐商家</div>
      <FoodFilter class="home-filter" :morefilter="morefilter" />
      <div class="home-shop" v-if="isLogin">
        <shop />
        <shop-activity />
      </div>
      <PageAction
        :pic="require('../assets/images/no02.png')"
        title="没有结果"
        text="登录后查看更多商家"
        button="登录"
        @click="$router.push({name: 'login'})"
      />
    </div>
    <transition name="sildeleft">
      <AddressSelector
        v-if="isLocation"
        @select="getSelectCity"
        @back="isLocation = false"
        @selectCity="isCitySelection = true"
      />
    </transition>
    <CitySelector
      v-if="isCitySelection"
      :data="citys"
      @select="getSelectCity"
      @back="isCitySelection = false"
      zindex="9999"
    />
  </div>
</template>

<script>
import morefilter from "../assets/json/morefilter.json";
import search from "@/components/pages/search.vue";
import banner from "@/components/adversiting/banner.vue";
import CitySelector from "@/components/CitySelector.vue";
import AddressSelector from "@/components/AddressSelector.vue";
import FoodFilter from "@/components/FoodsFilter.vue";
import PageAction from "@/components/PageAction.vue";
import shop from "@/components/pages/shop.vue";
import shopActivity from "@/components/pages/shopActivity.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      citys: {},
      morefilter: Object.freeze(morefilter),
      isLocation: false,
      isLogin: false,
      isCitySelection: false,
      openFilter: false,
      menu: [
        {
          pic: require("../assets/images/menu01.jpeg"),
          text: "美食"
        },
        {
          pic: require("../assets/images/menu02.jpeg"),
          text: "晚餐"
        },
        {
          pic: require("../assets/images/menu03.jpeg"),
          text: "跑腿代购"
        },
        {
          pic: require("../assets/images/menu04.jpeg"),
          text: "汉堡披萨"
        },
        {
          pic: require("../assets/images/menu05.jpeg"),
          text: "速食简餐"
        },
        {
          pic: require("../assets/images/menu06.jpeg"),
          text: "地方小吃"
        },
        {
          pic: require("../assets/images/menu07.jpeg"),
          text: "大牌惠吃"
        },
        {
          pic: require("../assets/images/menu08.jpeg"),
          text: "速食简餐"
        }
      ]
    };
  },
  components: {
    CitySelector,
    AddressSelector,
    search,
    banner,
    FoodFilter,
    PageAction,
    shop,
    shopActivity
  },
  computed: mapState(["city", "address"]),
  mounted() {
    this.citys = Object.freeze(JSON.parse(this.utils.storageGetter('cityList')))
    if(!this.citys) {
      let cityList = require('../assets/json/cityList.json')
      this.citys = cityList
      this.utils.storageSetter('cityList', JSON.stringify(cityList))
    }
  },
  methods: {
    getSelectCity() {
      this.isCitySelection = false;
    },
    onCloseShade() {}
  }
};
</script>

<style lang="scss" scoped>
.sildeleft-enter-active,
.sildeleft-leave-active {
  transition: transform 0.2s ease-in-out;
}
.sildeleft-enter, .sildeleft-leave-to /* .sildeleft-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}
.home-header {
  padding: 8px 0 0 8px;
  height: 32px;
  line-height: 32px;
}

.menu {
  font-size: 12px;
  height: 160px;
  &-item {
    flex-basis: 20%;
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
  }
  &-pic {
    width: 45px;
  }
}

.footenter {
  height: 172px;
}

.foods-search {
  height: 50px;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #999;
    font-size: 13px;
    width: 91%;
    height: 72%;
  }
}

.banner {
  margin-bottom: 3px;
}

.section {
  font-size: 0;
  line-height: 0;
  margin-bottom: 10px;
  padding: 0 10px;
}

.vipbar {
  height: 40px;
  background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  color: #644f1b;
  &-content {
    height: 18px;
    display: flex;
    align-items: center;
  }
  &-link {
    display: flex;
    align-items: center;
    font-size: 10px;
    position: relative;
    height: 100%;
    &:after {
      content: "";
      display: block;
      border: 1px solid #8c632b;
      border-width: 0px 1px 1px 0px;
      transform: rotate(-45deg);
      margin-left: 2px;
      width: 4px;
      height: 4px;
    }
  }
}

.dot {
  &::after {
    content: "\B7";
    margin: 0 0.106667rem;
    margin: 0 1.066667vw;
    font-weight: 700;
  }
}

.home-shop {
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f2f2;
}

.shop-activity {
  padding-left: 86px;
}

.shoplist {
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    height: 36px;
    color: #000;
    &::before,
    &::after {
      display: block;
      content: "";
      width: 20px;
      height: 1px;
      background-color: #999;
    }
    &::before {
      margin-right: 12px;
    }
    &::after {
      margin-left: 12px;
    }
  }
}

.home-filter {
  position: sticky;
  top: 50px;
  z-index: 100;
}
</style>
