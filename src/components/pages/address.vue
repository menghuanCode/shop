<template>
  <div class="address">
    <slot>
      <p>
        <span class="username">{{data.username}}</span>
        <span class="phone">{{data.phone}}</span>
      </p>
      <p class="describe">{{data.describe}}</p>
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
  + .address {
    border-top: 1px solid #eee;
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