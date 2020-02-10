<template>
  <div class="vipbar">
    <div class="vipbar-content">
      <img :src="require('@/assets/images/icon01.jpeg')" alt />
      <span class="vipbar-name">超级会员</span>
      <span class="vipbar-desc"><b class="dot"></b>每月领20元红包</span>
    </div>
    <a href="javascript:;" class="vipbar-link">立即开通</a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.vipbar {
  height: 40px;
  background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  color: #644f1b;
  margin-bottom: 3px;
  &-content {
    height: 18px;
    display: flex;
    align-items: center;
  }
  &-link {
    display: flex;
    align-items: center;
    font-size: 10px;
    position: relative;
    height: 100%;
    &:after {
      content: "";
      display: block;
      border: 1px solid #8c632b;
      border-width: 0px 1px 1px 0px;
      transform: rotate(-45deg);
      margin-left: 2px;
      width: 4px;
      height: 4px;
    }
  }
  &-name {
    font-weight: bold;
    font-size: 14px;
    margin: 0 4px;
  }
  &-desc {
    font-size: 12px;
  }
}
</style>