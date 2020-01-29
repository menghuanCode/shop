<template>
  <div class="">
    <div class="my-header" @click="$router.push({ name: 'user' })">
      <div class="media">
        <div class="media-pic avatar"></div>
        <div class="media-body">
          <div class="username">梦幻</div>
          <div class="phone">
            账号: 13411586357
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- <van-cell-group class="mt-1">
      <van-cell class="cell-center">
        <van-icon name="paid" color="#0089dc" size="0.45rem" class="mr-1" />支付
      </van-cell>
    </van-cell-group> -->
    <van-cell-group class="mt-1">
      <van-cell class="cell-center" to="addressList">
        <van-icon name="location-o" color="#0089dc" size="0.45rem" class="mr-1" />收货地址
      </van-cell>
      <van-cell class="cell-center">
        <van-icon name="service-o" color="#0089dc" size="0.45rem" class="mr-1" />我的客服
      </van-cell>
      <!-- <van-cell class="cell-center"><van-icon name="setting-o" color="#0089dc" size="0.45rem" class="mr-1" />设置</van-cell> -->
    </van-cell-group>
    <van-cell-group class="mt-1">
      <van-cell class="cell-center logout-cell">退出登录</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my {
  &-header {
    background-color: #fff;
    padding: 20px 20px 25px;
  }
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.phone {
  font-size: 12px;
  line-height: 24px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logout-cell {
  font-size: 16px;
  text-align: center;
  padding: 12px 0;
  margin-top: 20px;
  .van-cell__value {
    justify-content: center;
    color: red;
  }
}
</style>