<template>
  <div class="banner" v-if="showBanner">
    <div class="banner-title">{{banner.title}}</div>
    <div class="banner-subject">{{banner.subject}}</div>
    <div class="banner-desc">{{banner.desc}}</div>
    <van-image :src="pic" class="banner-pic" />
  </div>
</template>

<script>
export default {
  props: {
    banner: Object
  },
  computed: {
    showBanner() {
      return this.banner;
    }
  }
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
  margin-bottom: 3px;
  &-title {
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }
  &-subject {
    font-size: 13px;
    line-height: 16px;
    color: #777;
    margin-bottom: 8px;
  }
  &-desc {
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