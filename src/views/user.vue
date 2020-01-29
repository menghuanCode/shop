<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="$router.go(-1)"
      title="个人资料"
      @click-right="$router.push({name: 'addressForm', query: { edit: false }})"
    ></van-nav-bar>
    <van-cell title="头像" is-link center>
      <span class="avatar"></span>
    </van-cell>
    <van-cell title="手机" is-link center value="13411586357"></van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>