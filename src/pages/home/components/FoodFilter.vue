<template>
  <section class="homeFilter filter" :class="{active: shade}" ref="foodFilter">
    <div class="filter-header">
      <span
        class="filter-nav"
        :class="{active: isActiveFirstNav, open: isSort}"
        @click="handlePanel('sort')"
      >
        <em class="nav-text">{{isActiveFirstNav ? sort.name : firstSort.name}}</em>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconarrowdown-copy" />
        </svg>
      </span>
      <span
        class="filter-nav"
        :class="{active: sort.value === item.value}"
        v-for="item of outside_sort_filter"
        :key="item.value"
        @click="handleSort(item)"
      >
        <em class="nav-text">{{item.name}}</em>
      </span>
      <span
        class="filter-nav"
        :class="{active: selectMoreNumber, open: isMorefilter}"
        @click="handlePanel('morefilter')"
      >
        <em class="nav-text">筛选</em>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfilter1" />
        </svg>
      </span>
    </div>
    <div class="filter-panel" :class="{open: isSort}">
      <div class="sort">
        <div
          class="sort-item van-hairline--bottom"
          :class="{active: sort.value === item.value}"
          v-for="item of inside_sort_filter"
          :key="item.value"
          @click="handleSort(item)"
        >
          {{item.name}}
          <img src="@/assets/images/icon01.png" alt class="selected" />
        </div>
      </div>
    </div>
    <div class="filter-panel" :class="{open: isMorefilter}">
      <div class="morefilter">
        <div class="morefilter-content">
          <div class="morefillter-area" v-for="area of morefilter" :key="area.name">
            <div class="morefilter-title">{{area.title}}</div>
            <div class="morefilter-list">
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
            :class="{active:selectMoreNumber}"
            @click="clearMoreSelect"
          >清空</button>
          <button class="flex-item confirm-btn" @click="confirmMoreSelect">
            确定
            <span class="more-tag" v-show="selectMoreNumber">{{selectMoreNumber}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="shade" v-if="shade" @click="closeShade"></div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      inside_sort_filter: {},
      outside_sort_filter: {},
      firstSort: {},
      sort: {},
      shade: false,
      bodyStyle: document.body.style,
      morefilter: {},
      more: {},
      activePanel: "",
      offsetTop: 0,
      selectMoreNumber: 0
    };
  },
  computed: {
    isSort() {
      return this.activePanel === "sort";
    },
    isMorefilter() {
      return this.activePanel === "morefilter";
    },
    isActiveFirstNav() {
      return this.sort.name && !this.sort.is_svip;
    },
    ...mapGetters(["filterParam", "filterData"])
  },
  watch: {
    filter: function(data) {
      let { bar, outside } = JSON.parse(JSON.stringify(data));
      this.formatOutside(outside);
      this.formatMorefilter(bar);
    },
    activePanel(panel) {
      let isOpen = panel ? true : false;
      this.toggleShade(isOpen);
    }
  },
  components: {},
  mounted() {
    let { sort = {}, more = {} } = this.filterData;
    this.sort = sort;
    this.more = more;
    Object.keys(more).forEach(name => {
      this.selectMoreNumber += more[name].length;
    });
    this.offsetTop = this.$refs["foodFilter"].offsetTop;
  },
  methods: {
    handlePanel(panel) {
      this.activePanel = this.activePanel === panel ? "" : panel;
    },
    handleSort(item) {
      this.activePanel = "";
      this.sort = this.sort === item ? {} : item;
      this.changeFilterParams();
      window.scrollTo(0, 0);
    },
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
        this.selectMoreNumber--;
      }

      if (index !== -1) {
        more.splice(index, 1);
        this.selectMoreNumber--;
      } else {
        more.push(item);
        this.selectMoreNumber++;
      }
    },
    closeShade() {
      this.activePanel = "";
    },
    toggleShade(open) {
      this.shade = open;
      if (open) {
        this.bodyStyle.overflow = "hidden";
        this.bodyStyle.minHeight = "3000px";
        window.scrollTo(0, this.offsetTop);
      } else {
        this.bodyStyle.overflow = "auto";
        this.bodyStyle.removeProperty("min-height");
      }
    },
    clearMoreSelect() {
      this.more = {};
      this.selectMoreNumber = 0;
    },
    confirmMoreSelect() {
      this.changeFilterParams();
    },
    formatOutside(outside) {
      if (!outside) {
        return;
      }

      let { inside_sort_filter, outside_sort_filter } = outside;

      // update 距离最近
      if (outside_sort_filter && outside_sort_filter.length) {
        for (let item of outside_sort_filter) {
          if (item.value === 5) {
            item.is_svip = true;
            item.ubt_type = 1;
            break;
          }
        }
      }
      this.inside_sort_filter = inside_sort_filter || [];
      this.outside_sort_filter = outside_sort_filter || [];
      this.firstSort = outside.inside_sort_filter[0] || {};
    },
    formatMorefilter(bar) {
      let { activity_types, average_costs, delivery_mode, supports } = bar;

      // 商家服务， 优惠活动， 人均消费
      let attribute = [];
      let activities = [];
      let average = [];
      let morefilter = {};

      // 商家服务
      attribute = this.simpleArray(delivery_mode, supports);
      morefilter["attribute"] = {
        title: "商家服务（可多选）",
        name: "attribute",
        multiple: true,
        list: attribute
      };

      // 优惠活动
      activities = this.simpleArray(activity_types);
      morefilter["activities"] = {
        title: "优惠活动（单选）",
        name: "activities",
        list: activities
      };

      // 人均消费
      average = this.simpleArray(average_costs);
      average.forEach(item => {
        item.name = item.description;
      });
      morefilter["average"] = {
        title: "人均消费",
        name: "average",
        list: average
      };

      this.bar = Object.freeze(bar);
      this.morefilter = morefilter;
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
    },
    changeFilterParams() {
      let filterParams = {};
      let { sort } = this;
      let { delivery_mode } = this.bar;
      let { attribute = [], activities = [] } = JSON.parse(
        JSON.stringify(this.more)
      );

      // 综合排序
      if (sort && sort.value) {
        filterParams["order_by"] = sort.value;
      }

      // delivery_mode 配送方式
      // support_ids 商家服务
      if (attribute && attribute.length) {
        let index = attribute.indexOf(delivery_mode.id);
        if (index !== -1) {
          let delivery_mode = attribute.splice(index, 1);
          filterParams["delivery_mode"] = delivery_mode.id;
        }
        filterParams["support_ids"] = attribute.map(item => item.id);
      }

      // 活动类型
      if (activities && activities.length) {
        filterParams["activity_types"] = activities.map(item => item.id);
      }

      this.setMemorySession({
        filterParams: filterParams,
        filterData: { more: this.more, sort: this.sort }
      });

      this.$emit("select", filterParams);
      this.closeShade();
    },
    ...mapMutations(["setMemorySession"])
  }
};
</script>

<style lang="scss" scoped>
@import "~scss/variable.scss";
@import "~scss/mixin.scss";
.homeFilter.filter {
  top: $homeSearchHeight;
  z-index: $homeFilterZindex;
  &.active {
    top: $homeSearchHeight;
  }
}

.filter {
  position: sticky;
  top: 0;
  z-index: 9999;
  &.active {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  &-header {
    position: relative;
    z-index: 10000;
    padding: 0 15px;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  &-nav {
    flex: 1;
    color: #666;
    position: relative;
    font-size: 14px;
    text-align: center;
    @include ellipse;
    &.active {
      font-weight: bold;
      color: #333;
    }
    &.open {
      color: #3190e8;
      font-weight: 700;
    }
  }
  &-panel {
    position: relative;
    z-index: 10000;
    left: 0;
    right: 0;
    top: 100%;
    border-top: 1px solid #ddd;
    position: absolute;
    max-height: 0;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    visibility: hidden;
    overflow: auto;
    opacity: 0;
    &.open {
      opacity: 1;
      visibility: visible;
      max-height: 1500%;
    }
  }
}

.sort {
  background-color: #fff;
}
.sort-item {
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

.morefilter {
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

.more-tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  color: #fff;
  vertical-align: middle;
}
</style>