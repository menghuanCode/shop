<template>
  <div class="address">
    <slot>
      <div class="address-content">
        <p>
          <span class="username">{{data.username}}</span>
          <span class="phone">{{data.phone}}</span>
        </p>
        <p class="describe">{{data.describe}}</p>
      </div>
      <div class="address-handler">
        <van-icon name="edit" class="address-btn" v-if="data.edit" />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
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
.address {
  padding: 10px 15px;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal;
  white-space: inherit;
  color: #333;
  display: flex;
  align-items: center;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  + .address {
    border-top: 1px solid #eee;
  }
  &-content {
    flex: 1;
  }
  &-handler {
    margin-left: 20px;
  }
  &-btn {
    font-size: 20px;
    padding: 10px;
    + &-btn {
      margin-left: 5px;
    }
  }
}

.username {
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  margin-right: 3px;
}

.describe {
  margin-top: 2px;
}
</style>