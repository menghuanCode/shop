<template>
  <div class="search">
    <div class="search-content">
      <svg class="search-icon" aria-hidden="true">
        <use xlink:href="#iconsearch" />
      </svg>
      <span>搜索饿了么商家、商品名称</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomeSearch",
  computed: {
    ...mapState(["address"])
  }
};
</script>

<style lang="scss" scoped>
@import "~scss/variable.scss";
@import "~scss/mixin.scss";

.search {
  box-sizing: border-box;
  height: $homeSearchHeight;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  &::before,
  &::after {
    content: "";
    background-image: linear-gradient(90deg, #0af, #0085ff);
  }
  position: sticky;
  top: 0;
  z-index: $homeSearchZindex;
  padding: 7.5px 14px;
  margin: -0.5px auto;
  &-content {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    background: #fff;
    color: #999;
    font-size: 15px;
  }
  &-icon {
    width: 16px;
    height: 16px;
    margin-right: 3px;
    fill: currentColor;
  }
}
</style>