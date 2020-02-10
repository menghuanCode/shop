<template>
  <div class="wrapper" v-if="showTip">
    <img :src="tip.img" alt class="tip-img" />
    <h3 class="tip-title">{{tip.title}}</h3>
    <button class="tip-button">{{tip.button}}</button>
  </div>
</template>

<script>
export default {
  props: {
    tip: Object
  },
  computed: {
    showTip() {
      return this.tip;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tip {
  &-img {
    display: block;
    width: 200px;
  }
  &-title {
    margin: 12px 0 10px;
    color: #6a6a6a;
    font-weight: 400;
    font-size: 18px;
  }
  &-button {
    padding: 10px;
    min-width: 120px;
    border: none;
    border-radius: 2px;
    background-color: #56d176;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
    font-family: inherit;
  }
}
</style>