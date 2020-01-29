<template>
  <div class>
    <van-nav-bar left-arrow title="订单详情" @click-left="$router.go(-1)" class="navbar"></van-nav-bar>
    <div class="box">
      <div class="notice">
        <van-cell>感谢您对而了么的信任，欢迎下次光临</van-cell>
      </div>
      <van-image
        class="mb-1"
        width="100%"
        height="2.75rem"
        :src="require('@/assets/images/banner.webp')"
      />
      <van-panel class="orderpanel">
        <div slot="header" class="orderpanel-header">
          <span class="van-ellipsis">肥姐饭店</span>
          <van-icon class="font-xs" name="arrow" />
        </div>
        <div class="cell">
          <div class="cell-name">蒸排骨+煎蛋+鸡扒+时蔬+米饭</div>
          <span class="cell-number">
            <i class="small">x</i>1
          </span>
          <span class="cell-number">
            <i class="small">¥</i>15.64
          </span>
        </div>
        <div class="cell">
          <div class="cell-name">餐盒费</div>
          <span class="cell-number">
            <i class="small">x</i>1
          </span>
          <span class="cell-number">
            <i class="small">¥</i>1
          </span>
        </div>
        <div class="cell">
          <div class="cell-name">配送费</div>
          <span class="cell-number">
            <i class="small">¥</i>0
          </span>
        </div>
        <div class="cell flex-center cell--md">
          <span class="text-icon" style="background-color: red;">红</span>
          <div class="cell-name">会员专享全品类红包</div>
          <span class="cell-number color--price">
            <i class="small">-¥</i>0
          </span>
        </div>
        <div slot="footer" class="orderpanel-footer">
          <div class="flex-item"></div>
          <span>
            实付：
            <em class="big font-bold">
              <i class="small">¥</i>11.64
            </em>
          </span>
        </div>
      </van-panel>
      <van-panel class="orderpanel">
        <div slot="header" class="orderpanel-header">
          <span class="van-ellipsis">配送信息</span>
        </div>
        <div class="cell">
          <div class="cell-name">配送时间</div>
          <span class="cell-value">尽快送达</span>
        </div>
        <div class="cell">
          <div class="cell-name">收货方式</div>
          <span class="cell-value">
            远洋天骄8栋905
            <br />张(先生)
          </span>
        </div>
        <div class="cell">
          <div class="cell-name">配送方式</div>
          <span class="cell-value">商家配送</span>
        </div>
      </van-panel>
      <van-panel class="orderpanel">
        <div slot="header" class="orderpanel-header">
          <span class="van-ellipsis">订单信息</span>
        </div>
        <div class="cell">
          <div class="cell-name">订单号</div>
          <span class="cell-value">
            <span class="orderid">
              3052 1836 1357 9347 266
              <span class="orderid-copy">复制</span>
            </span>
          </span>
        </div>
        <div class="cell">
          <div class="cell-name">支付方式</div>
          <span class="cell-value">在线支付</span>
        </div>
        <div class="cell">
          <div class="cell-name">下单时间</div>
          <span class="cell-value">2019-10-16 18:27</span>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  components: {},
  data() {
    return {
      isLogin: true,
      orders: []
    };
  }
};
</script>


<style lang="scss" scoped>
.box {
  padding: 10px 5px 0;
}

.notice {
  font-weight: bold;
  margin-bottom: 5px;
}

.orderpanel {
  padding-left: 15px;
  font-size: 14px;
  margin-bottom: 8px;
  &-header {
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 12px 15px 12px 0;
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: "";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      border-bottom-width: 1px;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
  &-footer {
    display: flex;
    padding: 15px 10px 15px 0;
  }
}

.cell {
  display: flex;
  padding: 12px 10px 12px 0;
  position: relative;
  &--md {
    padding: 16px 10px 16px 0;
  }
  &-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
  }
  &-number {
    padding-left: 10px;
    font-size: 12px;
    font-weight: bold;
  }
  &-value {
    color: #333;
    text-align: right;
    font-size: 13px;
  }
  &:after {
    position: absolute;
    box-sizing: border-box;
    content: "";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    border-bottom-width: 1px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}

.orderid {
  font-size: 12px;
  line-height: 12px;
  &-copy {
    color: #0085ff;
    margin-left: 6px;
    padding-left: 10px;
    border-left: 1px solid #ddd;
  }
}
</style>
