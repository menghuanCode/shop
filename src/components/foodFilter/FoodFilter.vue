<template>
  <section class="homeFilter filter" :class="{active: shade}" ref="foodFilter" v-if="list">
    <div class="filter-header" v-if="outside">
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
        :class="{active: more_number, open: isMorefilter}"
        @click="handlePanel('morefilter')"
      >
        <em class="nav-text">筛选</em>
        <svg class="icon" aria-hidden="true" v-show="!more_number">
          <use xlink:href="#iconfilter1" />
        </svg>
        <em class="nav-tag" v-show="more_number">{{more_number}}</em>
      </span>
    </div>
    <div class="filter-panel" :class="{open: isSort}">
      <FilterSort :list="inside_sort_filter" :sort="sort" @select="handleSort" />
    </div>
    <div class="filter-panel" :class="{open: isMorefilter}">
      <FilterMore :list="bar" :selects="more" :show="isMorefilter" @comfirm="handleFilterMore" />
    </div>
    <div class="shade" v-if="shade" @click="closeShade"></div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FilterSort from "./components/Sort";
import FilterMore from "./components/More";
export default {
  props: {
    list: Object
  },
  data() {
    return {
      bar: null,
      outside: null,
      inside_sort_filter: null,
      outside_sort_filter: null,
      firstSort: {},
      sort: {},
      shade: false,
      bodyStyle: document.body.style,
      more: {},
      activePanel: "",
      offsetTop: 0,
      filterParams: {},
      filterData: {}
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
    more_number: {
      get() {
        let number = 0;
        let more = this.more;
        if (!more) {
          return number;
        }

        for (let key in more) {
          let item = more[key];
          number += item.length;
        }

        return number;
      }
    },
    ...mapState(["memory_session"])
  },
  watch: {
    list: function(data) {
      let { bar, outside } = data;
      this.bar = bar;
      this.outside = outside;
      this.formatOutside(outside);
    },
    activePanel(panel) {
      let isOpen = panel ? true : false;
      this.toggleShade(isOpen);
    },
    memory_session: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          return;
        }
        let { filterParams = {}, filterData = {} } = value;
        this.filterParams = filterParams;
        this.filterData = filterData;
      }
    },
    filterData: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          return;
        }
        let { sort = {}, more = {} } = value;
        this.sort = sort;
        this.more = more;
      }
    }
  },
  components: {
    FilterSort,
    FilterMore
  },
  mounted() {},
  updated() {
    this.offsetTop = this.$refs["foodFilter"].offsetTop;
  },
  methods: {
    handlePanel(panel) {
      this.activePanel = this.activePanel === panel ? "" : panel;

      if (this.activePanel === "morefilter") {
        this.filterData = JSON.parse(JSON.stringify(this.filterData));
      }
    },
    handleSort(item) {
      this.activePanel = "";
      this.sort = this.sort === item ? {} : item;
      this.changeMemorySession();
      window.scrollTo(0, 0);
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
    handleFilterMore(more) {
      this.more = more;
      this.changeMemorySession();
    },
    formatOutside(outside) {
      if (!outside) {
        return;
      }
      let { inside_sort_filter = [], outside_sort_filter = [] } = outside;

      this.formatVipSort(outside_sort_filter);
      // update 距离最近
      this.inside_sort_filter = inside_sort_filter;
      this.outside_sort_filter = outside_sort_filter;
      this.firstSort = outside.inside_sort_filter[0];
    },
    formatVipSort(list) {
      if (!list) {
        return;
      }
      for (let item of list) {
        if (item.value === 5) {
          item.is_svip = true;
          item.ubt_type = 1;
          return;
        }
      }
    },
    changeMemorySession() {
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

      this.$emit("select", this.filterParams);
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
    transition: all 0.25s ease-in-out;
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

.nav {
  &-tag {
    font-size: 10px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: inline-block;
    background-color: rgba(49, 144, 232, 0.2);
    color: #3190e8;
    border-radius: 50%;
    margin-left: 3px;
  }
}
</style>