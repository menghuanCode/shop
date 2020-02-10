<template>
  <div>
    <NoDataTip>
      <img :src="require('@/assets/images/no01.gif')" alt="">
      <h3>123</h3>
    </NoDataTip>
    <NoDataTip
      :pic="require('@/assets/images/no01.gif')"
      title="输入地址后才能订餐哦！"
      button="手动选择地址"
      @click="isLocation = true"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoDataTip from "@/components/noDataTip";
export default {
  name: "HomeAction",
  computed: {
    ...mapState(["address"])
  },
  components: {
    NoDataTip
  }
};
</script>

<style lang="scss" scoped>
</style>