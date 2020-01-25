<template>
  <div class="selector">
    <van-nav-bar
      left-arrow
      title="选择收货地址"
      right-text="新增地址"
      @click-left="$emit('back')"
      class="navbar"
    ></van-nav-bar>
    <div class="flex">
      <span class="city" @click="$emit('selectCity')">
        <span class="flex-item van-ellipsis">{{city || '选择城市'}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconarrowdown-copy" />
        </svg>
      </span>
      <div class="flex-item">
        <search
          class="address-search"
          placeholder="请输入地址"
          @input="onSearch"
          :iconStyle="{left: '0.72rem'}"
          :inputStyle="{paddingLeft: '0.81rem'}"
        />
      </div>
    </div>
    <div class="touch flex-item">
      <van-cell-group title="当前地址">
        <van-cell>
          <div class="flex">
            <div class="current-address">{{address || '未知地址'}}</div>
            <div class="reset-location">
              <svg class="icon pr-1" aria-hidden="true">
                <use xlink:href="#iconaim" />
              </svg>
              重新定位
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="收货地址">
        <userAddress :data="item" v-for="(item, index) in addressList" :key="index" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import search from "@/components/pages/search";
import userAddress from "@/components/pages/address";
import { mapState } from "vuex";

export default {
  props: {},
  components: {
    search,
    userAddress
  },
  data() {
    return {
      value: "",
      indexList: [],
      show: true,
      addressList: [{
        username: '你好呀',
        phone: '13411586357',
        describe: '广东省广州市天河区凤凰街道渔西路163号广东省广州市天河区凤凰街道渔西路163号',
      }, {
        username: '张先生',
        phone: '13411586357',
        describe: '网咖先生(极点店)',
      }]
    };
  },
  computed: mapState(["city", "address"]),
  mounted() {},
  methods: {
    onSelect(e) {
      let cell = this.utils.queryPathSelector(e, "van-cell");
      // 如果不是选择城市
      if (!cell) {
        return;
      }
      this.$emit("select", cell.innerText);
    },
    onSearch() {}
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

.city {
  width: 50px;
  height: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
}

.address-search {
  height: 54px;
}

.reset-location {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2395ff;
}

.current-address {
  flex: 1;
  font-weight: bold;
  padding-right: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.van-nav-bar__text {
  color: #fff;
  &:active {
    background-color: transparent;
  }
}
</style>