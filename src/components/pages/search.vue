<template>
  <div class="search" :style="{background}">
    <svg class="icon search-icon" aria-hidden="true">
      <use xlink:href="#iconsearch"></use>
    </svg>
    <input
      type="text"
      :placeholder="placeholder"
      class="search-input"
      :class="{ 'search--round': shape == 'round' }"
      @compositionstart="isInputing = true"
      @input="!isInputing && $emit('input', $event.target.value)"
      @compositionend="onInputed"
    >
  </div>
</template>

<script>
export default {
  props: ["placeholder", "background", "shape"],
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
  &-icon {
    position: absolute;
    top: 16px;
    left: 36px;
    width: 13px;
    height: 13px;
  }
  &-input {
    width: 300px;
    height: 28px;
    padding-left: 32px;
    margin-top: 8px;
    border: none;
    font-size: 13px;
    background-color: #f7f8fa;
  }
  &--round {
    border-radius: 16px;
  }
}
</style>