<template>
  <div class="ordercard" @click="$router.push({name: 'orderDetail'})">
    <div class="ordercard-body">
      <div class="ordercard-avatar">
        <img src="../../assets/images/shop.jpeg" alt="">
      </div>
      <div class="ordercard-content">
        <div class="ordercard-head">
          <div class="flex">
            <div class="ordercard-name">
              <span class="van-ellipsis">肥姐饭店</span>
              <van-icon name="arrow" class="font-xs" />
            </div>
            <div class="ordercard-status">订单已送达</div>
          </div>
          <div class="ordercard-time">2019-10-16 18:27</div>
        </div>
        <div class="ordercard-detail">
          <div class="ordercard-goods">
            <span class="van-ellipsis">蒸排骨+煎蛋+鸡扒+时蔬+米饭</span>
          </div>
          <span class="ordercard-price">¥11.64</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          name: "小店",
          rate: 5,
          mouthOther: 1000
        };
      }
    }
  },
  data() {
    return {
      openModal: false
    };
  }
};
</script>

<style lang="scss" scoped>
.ordercard {
  padding: 10px 0 0 10px;
  background-color: #fff;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  &-body {
    display: flex;
  }
  &-avatar {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    background-color: #ccc;
  }
  &-content {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
  &-head {
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
  &-detail {
    padding: 16px 10px 16px 0;
    display: flex;
    justify-content: space-between;
  }
  &-name {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    padding-right: 32px;
  }
  &-status {
    padding: 0 10px;
    line-height: 20px;
  }
  &-time {
    font-size: 10px;
    color: #999;
  }
  &-price {
    font-weight: bold;
    color: #333;
  }
  &-goods {
    overflow: hidden;
    display: flex;
    width: 64%;
  }
}
</style>