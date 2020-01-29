<template>
  <footer class="footer">
    <div class="footer-tabbar">
      <router-link
        class="footer-tabbar__item"
        :to="item.to"
        v-for="item in tabbar"
        :key="item.text"
      >
        <svg class="icon footer-tabbar__icon" aria-hidden="true">
          <use :xlink:href="item.icon" />
        </svg>
        {{item.name}}
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      tabbar: [
        {
          to: "/",
          icon: "#iconhome1",
          name: "首页"
        },
        {
          to: "/order",
          icon: "#iconorder",
          name: "订单"
        },
        {
          to: "/my",
          icon: "#iconwode",
          name: "我的"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 60px;
  &-tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding-top: 5px;
    min-height: 50px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    &__item {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    &__icon {
      display: block;
      width: 22px;
      height: 22px;
      margin: 0 auto 2px;
    }
  }
}

.router-link-exact-active {
  color: #0089dc;
}
</style>