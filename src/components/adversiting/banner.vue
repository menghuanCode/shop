<template>
  <div class="banner">
    <div class="banner-title" v-if="title" v-text="title"></div>
    <div class="banner-desc" v-if="desc" v-text="desc"></div>
    <div class="banner-link" v-if="link" v-text="link"></div>
    <van-image :src="pic" v-if="pic" class="banner-pic"/>
  </div>
</template>

<script>
export default {
  props: ["title", "desc", "link", "pic"]
};
</script>

<style lang="scss" scoped>

.banner {
  position: relative;
  padding: 12px 0 0 15px;
  background: linear-gradient(0deg, #f4f4f4 5%, #fafafa 95%);
  font-size: 13px;
  line-height: 1;
  height: 100px;
  &-title {
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }
  &-desc {
    font-size: 13px;
    line-height: 16px;
    color: #777;
    margin-bottom: 8px;
  }
  &-link {
    font-size: 12px;
    color: #af8260;
    font-weight: 700;
  }
  &-pic {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 140px;
  }
}
</style>