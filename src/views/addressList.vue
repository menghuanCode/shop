<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="$router.go(-1)"
      title="收货地址"
      right-text="新增地址"
      @click-right="$router.push({name: 'addressForm', query: { edit: false }})"
    >
    </van-nav-bar>
    <van-cell-group >
      <userAddress :data="item" v-for="(item, index) in addressList" :key="index" />
    </van-cell-group>
  </div>
</template>

<script>
import userAddress from "@/components/pages/address";

export default {
  data() {
    return {
      addressList: [
        {
          username: "你好呀",
          phone: "13411586357",
          describe:
            "广东省广州市天河区凤凰街道渔西路163号广东省广州市天河区凤凰街道渔西路163号",
          edit: true
        },
        {
          username: "张先生",
          phone: "13411586357",
          describe: "网咖先生(极点店)",
          edit: true
        }
      ]
    };
  },
  components: {
    userAddress
  }
};
</script>

<style lang="scss" scoped>
</style>