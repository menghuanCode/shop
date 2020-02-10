<template>
  <div class="sort">
    <div
      class="cell van-hairline--bottom"
      :class="{active: sort.name === item.name}"
      v-for="item in list"
      :key="item.value"
      @click="$emit('select', item)"
    >
      {{item.name}}
      <img src="@/assets/images/icon01.png" alt class="selected" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    sort: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.sort {
  background-color: #fff;
}
.cell {
  font-size: 14px;
  line-height: 28px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.active {
    color: #3190e8;
    .selected {
      display: block;
    }
  }
}

.selected {
  width: 20px;
  display: none;
}
</style>