<template>
  <div class="shop-activity">
    <div class="tag-line">
      <span class="tag tag-xs">{{data.tag}}</span>
    </div>
    <div class="activity-main" v-if="data.list">
      <div class="activity-list">
        <div class="activity-list__item" v-for="(item, index) in data.list" :key="index" v-show="open || index < 2">
          <span class="text-icon" style="background-color: rgb(240, 115, 115);" v-if="item.type == 1">减</span>
          <span class="text-icon" style="background-color: rgb(241, 136, 79);"  v-if="item.type == 2">特</span>
          <span class="text-icon" style="background-color: rgb(112, 188, 70);" v-if="item.type == 3">新</span>
          <span class="text-icon" style="background-color: rgb(60, 199, 145);" v-if="item.type == 4">折</span>
          <span class="text-icon" style="background-color: rgb(102, 102, 102);" v-if="item.type == 5">保</span>
          <span class="van-ellipsis flex-item">{{item.text}}</span>
        </div>
      </div>
      <span class="activity-quantity" @click="open = !open">
        {{data.list.length}}个活动
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconarrowdown-copy" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          tag: "披萨",
          list: [
            {
              type: 1,
              text: "满20元减20元，满40元减30元"
            },
            {
              type: 2,
              text: "特价商品0.01元起"
            },
            {
              type: 3,
              text: "饿了么新用户首单立减17元"
            },
            {
              type: 1,
              text: "商品立减1元"
            },
            {
              type: 4,
              text: "折扣商品5折起"
            },
            {
              type: 5,
              text: "该商户食品安全已由国泰产险承担，食品安全有保障"
            }
          ]
        };
      }
    }
  },
  data() {
      return {
          open: false
      }
  }
};
</script>

<style lang="scss" scoped>
.shop-activity {
  position: relative;
  overflow: hidden;
}

.tag-line {
  display: flex;
  margin-top: 0;
  line-height: 20px;
}

.activity {
  &-main {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
  &-quantity {
    font-size: 12px;
    color: #999;
    display: flex;
    padding: 0 10px;
    cursor: pointer;
  }
  &-list {
    flex: 1;
    color: #666;
    width: 100%;
    overflow: hidden;
    &__item {
      width: 100%;
      font-size: 10px;
      line-height: 22px;
      display: flex;
      align-items: center;
      position: relative;
    }
  }
}
</style>