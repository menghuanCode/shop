<template>
  <van-swipe class="wrapper" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(page, index) in pages" :key="index">
      <div class="enter">
        <div class="enter-item" v-for="item in page" :key="item.name">
          <img src alt class="enter-pic" />
          <span class="enter-name">123</span>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: Array
  },
  computed: {
    pages() {
      if (!this.list || !this.list.length) {
        return [];
      }

      const pages = [];
      this.list.forEach(function(item, index) {
        let page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 172px;
}

.enter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    flex-basis: 25%;
    text-align: center;
    margin-top: 10px;
  }
  &-pic {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: #eee;
  }
  &-name {
    display: block;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>