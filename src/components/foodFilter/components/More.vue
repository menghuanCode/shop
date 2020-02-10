<template>
  <div class="more">
    <div class="more-content">
      <div class="morefillter-area" v-for="area of filter" :key="area.name">
        <div class="more-title">{{area.title}}</div>
        <div class="more-list">
          <span
            class="label"
            :class="{selected: more[area.name] && more[area.name].some(label => label.id === item.id)}"
            @click="handleMore(area.name, item, area.multiple)"
            v-for="item of area.list"
            :key="item.id"
          >
            <img :src="item.icon_hash" alt class="label-icon" v-if="item.icon_hash" />
            <em class="label-text">{{ item.text || item.name }}</em>
          </span>
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        class="flex-item clear-btn"
        :class="{active: Object.keys(more).length}"
        @click="clearFilterMore"
      >清空</button>
      <button class="flex-item confirm-btn" @click="comfirmFilterMore">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
    selects: Object
  },
  data() {
    return {
      more: {}
    };
  },
  computed: {
    filter() {
      if (!this.list) {
        return {};
      }

      let {
        activity_types,
        average_costs,
        delivery_mode,
        supports
      } = this.list;

      // 商家服务， 优惠活动， 人均消费
      let attribute = [];
      let activities = [];
      let average = [];
      let filter = {};

      // 商家服务
      attribute = this.simpleArray(delivery_mode, supports);
      filter["attribute"] = {
        title: "商家服务（可多选）",
        name: "attribute",
        multiple: true,
        list: attribute
      };

      // 优惠活动
      activities = this.simpleArray(activity_types);
      filter["activities"] = {
        title: "优惠活动（单选）",
        name: "activities",
        list: activities
      };

      // 人均消费
      average = this.simpleArray(average_costs);
      average.forEach(item => {
        item.name = item.description;
      });
      filter["average"] = {
        title: "人均消费",
        name: "average",
        list: average
      };

      return filter;
    }
  },
  watch: {
    selects: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          return;
        }
        this.more = JSON.parse(JSON.stringify(value));
      }
    }
  },
  methods: {
    handleMore(name, item, multiple = false) {
      if (!this.more[name]) {
        this.$set(this.more, name, []);
      }

      let more = this.more[name];

      let index = -1;
      for (let i = 0; i < more.length; i++) {
        if (item.id === more[i].id) {
          index = i;
          break;
        }
      }

      // 单选
      if (!multiple && index === -1 && more.length) {
        more.pop();
      }

      index !== -1 ? more.splice(index, 1) : more.push(item);
      this.$emit("select", this.more);
    },
    clearFilterMore() {
      let moreKeys = Object.keys(this.more);
      if (!moreKeys && !moreKeys.length) {
        return;
      }
      this.more = {};
      this.$emit("clear", this.more);
    },
    comfirmFilterMore() {
      this.$emit("comfirm", this.more);
    },
    simpleArray(...arr) {
      let result = [];
      if (!arr) {
        return result;
      }
      for (let item of arr) {
        if (!item) {
          continue;
        }

        if (item instanceof Array) {
          result = result.concat(item);
        } else {
          result.push(item);
        }
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~scss/mixin.scss";
.more {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  max-height: 500px;
  &-content {
    padding: 0 10px 10px;
    height: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    line-height: normal;
    background: #fff;
  }
  &-area {
    margin: 10px 0;
    overflow: hidden;
  }
  &-title {
    margin-left: 1%;
    margin-top: 16px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }
  &-list {
    flex-wrap: wrap;
    background: #fff;
    position: relative;
    display: flex;
  }

  &-icon {
    height: 14px;
    margin-right: 3px;
  }
}

.clear-btn {
  background-color: #fff;
  border: none;
  border-top: 0.5px solid #ccc;
  border-bottom: 0.5px solid #ccc;
  font-size: 16px;
  line-height: 32px;
  padding: 10px;
  color: #ddd;
  &.active {
    color: #000;
  }
}

.confirm-btn {
  background-color: #56d176;
  color: #fff;
  border: none;
  border-top: 0.5px solid #56d176;
  font-size: 16px;
  line-height: 32px;
  padding: 10px;
}

.label {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex: 0 0 31.33%;
  height: 36px;
  font-size: 12px;
  margin: 3px 1%;
  background: #fafafa;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  &-text {
    flex: 1;
    @include ellipse;
  }
  &.selected {
    font-weight: 700;
    color: #3190e8;
    background-color: #edf5ff;
  }
}

.icon {
  vertical-align: middle;
}
</style>