<template>
  <div class="rates" :style="{width: width, height: height, backgroundSize: width}">
    <div class="rates-value" :style="{width: rateNumber, backgroundSize: width}"></div>
  </div>
</template>

<script>
export default {
  props: ["value", "size"],
  computed: {
    rateNumber() {
      return this.value * 20 + "%";
    },
    width() {
      let [size, value, unit] = this.size.match(/([\d.]+)([a-z]*)/);

      if (!value) {
        throw "尺寸大小请输入正确的值";
      }

      // 没有单位
      if (!unit) {
        return size + "px";
      }

      return size;
    },
    height() {
      let [size, value, unit] = this.size.match(/([\d.]+)([a-z]*)/);

      if (!value) {
        throw "尺寸大小请输入正确的值";
      }

      // 没有单位
      if (!unit) {
        return size/4.6 + "px";
      }

      return value/4.6 + unit;
    }
  }
};
</script>

<style lang="scss" scoped>
$size: 64px;
.rates {
  position: relative;
  background: url("../../assets/images/ratebg.svg") left center no-repeat;
  background-size: $size;
  width: $size;
  height: 16px;
  &-value {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/rateall.svg") left center no-repeat;
    background-size: $size;
  }
}
</style>