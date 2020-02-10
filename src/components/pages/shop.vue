<template>
  <section class="shop">
    <div class="shop-logo">
      <img :src="data.pic" alt />
    </div>
    <div class="shop-info">
      <div class="shop-line">
        <div class="shop-name">{{data.name}}</div>
        <div class="shop-support" @click="openModal = true">
          <svg class="icon ml-1" aria-hidden="true">
            <use xlink:href="#iconmore" />
          </svg>
        </div>
      </div>
      <div class="shop-line">
        <div class="shop-rate">
          <rates :value="data.rate" size="2rem" gutter="0.03rem" class="mr-1" />
          <span class="mr-1">{{data.rate.toFixed(1)}}</span>
          <span v-if="data.mouthOther">月售{{data.mouthOther}}单</span>
        </div>
        <span class="fengniao-tag ml-1" v-if="data.fengniao">蜂鸟转送</span>
      </div>
      <div class="shop-line">
        <div class="flex-item">
          <span class="shop-limit">¥13起送</span>
          <span class="shop-limit">免配送费</span>
        </div>
        <span class="shop-limit timelimit">377m</span>
        <span class="shop-limit timelimit">60分钟</span>
      </div>
    </div>
    <div class="shop-modal" :class="{open: openModal}" @click="onClickModal">
      <div class="shop-modal__handler j_handler">不喜欢</div>
    </div>
  </section>
</template>

<script>
import rates from "../pages/rates";

export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          name: "小店",
          rate: 5,
          mouthOther: 1000
        };
      }
    }
  },
  data() {
    return {
      openModal: false
    };
  },
  components: {
    rates
  },
  methods: {
    onClickModal(event) {
      if (!handler) {
        return (this.openModal = false);
      }

      this.$emit("handler", handler);
    }
  }
};
</script>

<style lang="scss" scoped>
.shop {
  font-size: 12px;
  color: #666;
  position: relative;
  user-select: none;
  display: flex;
  padding: 10px;
  &-logo {
    position: relative;
    width: 64px;
    height: 64px;
    border: 1px solid #ccc;
  }
  &-info {
    padding-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-name {
    font-size: 15px;
    line-height: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px;
    flex: 1;
    color: #333;
  }
  &-line {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-rate {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-support {
    padding: 0 10px;
    cursor: point;
  }
  &-limit {
    font-size: 12px;
    line-height: 16px;
    &:last-child::after {
      content: unset;
    }
    &:after {
      content: "";
      border-left: 1px solid #ccc;
      display: inline-block;
      height: 12px;
      margin: 0 4px;
      vertical-align: -2px;
    }
    &.timelimit {
      color: #999;
    }
  }
  &-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    &.open {
      display: flex;
    }
    &__handler {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      background-color: rgba(255, 255, 255, 1);
    }
  }
}

.fengniao-tag {
  background-image: linear-gradient(45deg, #0085ff, #0af);
  color: #fff;
  border: 1px solid #0097ff;
  border-radius: 0.4vw;
  line-height: 1.2;
  padding: 0 4px;
  font-size: 12px;
}
</style>