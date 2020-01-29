<template>
  <div class="order">
    <div class="order-action">
      <PageAction
        v-if="!isLogin"
        :pic="require('../assets/images/no02.png')"
        title="未登录"
        text="登录后查看订单"
        button="登录"
        @click="$router.push({name: 'login'})"
      />
      <PageAction :pic="require('../assets/images/no03.png')" title="近三个月无外卖订单记录">
        <p class="limit-text">
          查看三个月前的外卖订单
          <van-icon name="arrow-down" />
        </p>
      </PageAction>
    </div>

    <ordercard />
  </div>
</template>

<script>
import PageAction from "@/components/PageAction.vue";
import ordercard from "@/components/pages/ordercard.vue";

export default {
  name: "order",
  components: {
    PageAction,
    ordercard
  },
  data() {
    return {
      isLogin: true,
      orders: [],
    }
  }
};
</script>


<style lang="scss" scoped>
.limit-text {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.order-action {
  padding: 100px 10px;
}
</style>
