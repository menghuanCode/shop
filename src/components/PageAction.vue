<template>
  <div class="action">
    <img :src="pic" alt class="action-pic" />
    <div class="action-title">{{title}}</div>
    <div class="action-text">{{text}}</div>
    <slot>
      <button class="action-button" @click="$emit('click', $event)">{{button}}</button>
    </slot>
  </div>
</template>

<script>
export default {
  props: ["pic", "title", 'text', "button"]
};
</script>

<style lang="scss" scoped>
.action {
  text-align: center;
  padding-bottom: 10px;
  &-pic {
    width: 200px;
  }
  &-title {
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 1px;
    margin-bottom: 0px;
    color: #6a6a6a;
  }
  &-text {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0;
    color: #888888;
    margin-bottom: 10px;
  }
  &-button {
    padding: 10px;
    min-width: 120px;
    border: none;
    border-radius: 2px;
    background-color: #56d176;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-family: inherit;
  }
}
</style>