<template>
  <div class="search" :style="{background}">
    <slot>
      <svg class="icon search-icon" aria-hidden="true" :style="iconStyle">
        <use xlink:href="#iconsearch"></use>
      </svg>
      <input
        type="text"
        :placeholder="placeholder"
        class="search-input"
        :class="{ 'search--round': shape == 'round' }"
        :style="inputStyle"
        @compositionstart="isInputing = true"
        @input="!isInputing && $emit('input', $event.target.value)"
        @compositionend="onInputed"
      >
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    "placeholder": String,
    "background": String, 
    "shape": String, 
    "iconStyle": Object,
    "inputStyle": Object
  },
  data() {
    return {
      isInputing: false,
      value: ""
    };
  },
  methods: {
    onInputed(event) {
      (this.isInputing = false), this.$emit("input", event.data);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.search {
  height: 45px;
  text-align: center;
  position: relative;
  background-color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-icon {
    position: absolute;
    top: 50%;
    left: 36px;
    width: 13px;
    height: 13px;
    transform: translate(0, -50%)
  }
  &-input {
    width: 80%;
    height: 64%;
    padding-left: 32px;
    border: none;
    font-size: 13px;
    background-color: #f7f8fa;
  }
  &--round {
    border-radius: 16px;
  }
}
</style>