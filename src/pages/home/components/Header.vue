<template>
  <div class="header">
    <div class="location">
      <van-icon name="location" />
      <span class="address">{{address.name || '未能获取到地址'}}</span>
      <van-icon name="arrow-down" size="0.32rem" class="ml-1" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomeHeader",
  computed: {
    ...mapState(["address"])
  }
};
</script>

<style lang="scss" scoped>
@import "~scss/mixin.scss";
.header {
  padding: 10px 14px 0;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  color: #fff;
}

.location {
  width: 60%;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 2;
}

.address {
  @include ellipse;
}
</style>