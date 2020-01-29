<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="新增地址"></van-nav-bar>
    <van-field v-model="text" label="联系人" placeholder="姓名" />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="tel" type="tel" label="电话" placeholder="手机号码" />
    <!-- 允许输入整数，调起数字键盘 -->
    <van-field
      v-model="digit"
      type="digit"
      label="地址"
      placeholder="选择收货地址"
      disabled
      right-icon="arrow"
    />
    <!-- 允许输入数字，调起全键盘 -->
    <van-field v-model="number" type="number" label="门牌号" placeholder="例：5号楼203室" />
    <div class="form-submit">
      <van-button type="primary" block class="font-md">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { tel: "", text: "", digit: "", number: "", password: "" };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>