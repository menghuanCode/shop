<template>
  <section class="filter" ref="foodsFilter" :class="{active: openShade}">
    <div class="filter-header" @click="selectFilterNavbar">
      <a
        class="filter-nav"
        data-panel="sort"
        data-id="0"
        :class="{open: openSort, active: currentActive == 0}"
      >
        {{currentSort.name || '综合排序'}}
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconarrowdown-copy" />
        </svg>
      </a>
      <a class="filter-nav" data-id="1" :class="{active: currentActive == 1}">距离最近</a>
      <a class="filter-nav" data-id="2" :class="{active: currentActive == 2}">销量最高</a>
      <a
        class="filter-nav"
        data-panel="filter"
        data-id="3"
        :class="{active: currentActive == 3, open: openFilter}"
      >
        筛选
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfilter1" />
        </svg>
      </a>
    </div>
    <div class="filter-extend" :class="{open: openSort}" @click="onSelectCategory">
      <van-cell center v-for="(item, index) in sort" :key="index" :data-index="index">
        <div class="category" :class="{active: currentSort.id == item.id}">
          {{item.name}}
          <img
            src="../assets/images/icon01.png"
            :alt="item.name"
            class="selected"
            v-show="currentSort.id == item.id"
          />
        </div>
      </van-cell>
    </div>
    <div class="filter-extend" :class="{open: openFilter}" @click="onSelectMore">
      <div class="morefilter">
        <div class="morefilter__dl" v-for="(area, index) in morefilter" :key="index">
          <div class="morefilter__dt">{{area.title}}</div>
          <div class="morefilter__dd">
            <div
              class="morefilter__cell"
              v-for="(item, cindex) in area.list"
              :key="cindex"
              :data-multi="area.multi"
            >
              <img :src="item.pic" alt class="morefilter__icon" v-if="item.pic" />
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <button class="flex-item clear-btn" @click="onClearFilter">清空</button>
        <button class="flex-item confirm-btn" @click="onConfirmFilter">确定</button>
      </div>
    </div>
    <div class="shade" v-if="openShade" @click="onCloseShade"></div>
  </section>
</template>

<script>
export default {
  props: ["top", "morefilter"],
  data() {
    return {
      openSort: false,
      openFilter: false,
      openShade: false,
      currentActive: 0,
      currentSort: {
        id: 1,
        name: "综合排序"
      },
      sort: [
        {
          id: 1,
          name: "综合排序"
        },
        {
          id: 2,
          name: "好评优先"
        },
        {
          id: 3,
          name: "起送价最低"
        },
        {
          id: 4,
          name: "配送最快"
        },
        {
          id: 5,
          name: "配送费最低"
        },
        {
          id: 6,
          name: "人均从低到高"
        },
        {
          id: 7,
          name: "人均从高到低"
        },
        {
          id: 8,
          name: "通用排序"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    selectFilterNavbar(event) {
      let navbar = this.utils.queryPathSelector(event, "filter-nav");
      let panel = navbar && navbar.dataset["panel"];

      // 如果没有值
      if (!navbar) {
        return;
      }

      // 如果已经是选中的，而且不是面板，直接加载就好了
      if (navbar.classList.contains("active") && !panel) {
        this.onResetAjax(navbar.id);
        return;
      }

      if (panel) {
        this.onTogglePanel(panel);
      } else {
        this.onResetAjax(navbar.id);
        this.currentActive = navbar.dataset["id"];
        this.currentSort = {};
      }
    },
    toggleSortPanel() {
      this.openSort = !this.openSort;
    },
    onSelectCategory() {
      let item = this.utils.queryPathSelector(event, "van-cell");
      if (!item) {
        return;
      }

      let index = item.dataset["index"];
      this.currentSort = this.sort[index];
      this.onResetAjax(this.currentSort.id);
    },
    onCloseShade() {
      this.openSort = false;
      this.openShade = false;
      this.openFilter = false;
      document.body.style.overflow = "auto";
    },
    onTogglePanel(panel) {
      let isOpen = false;
      switch (panel) {
        case "sort": {
          this.openFilter = false;
          this.openSort = !this.openSort;
          isOpen = this.openSort;
          break;
        }
        case "filter": {
          this.openSort = false;
          this.openFilter = !this.openFilter;
          isOpen = this.openFilter;
        }
      }

      this.openShade = isOpen;
      let offsetTop = this.$refs["foodsFilter"].offsetTop;
      window.scrollTo(0, offsetTop);
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    },
    onResetAjax() {
      this.onCloseShade();
      window.scrollTo(0, 0);
      // 加载新的数据
    },
    onSelectMore(event) {
      let item = this.utils.queryPathSelector(event, "morefilter__cell");

      if (!item) {
        return;
      }

      // 如果点击过了
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        return;
      }

      // 如果不是多选，清除之前的
      if (!item.dataset["multi"]) {
        let activeItem = item.parentElement.querySelector(".active");
        activeItem && activeItem.classList.remove("active");
      }

      item.classList.add("active");
    },
    onClearFilter(event) {
      let panel = this.utils.queryPathSelector(event, "filter-extend");

      if (!panel) {
        return;
      }

      let cells = panel.querySelectorAll(".morefilter__cell.active");
      cells.forEach(item => item.classList.remove("active"));

      console.log(panel);
    },
    onConfirmFilter(event) {
      let panel = this.utils.queryPathSelector(event, "filter-extend");

      if (!panel) {
        return;
      }

      let types = []
      let cells = panel.querySelectorAll(".morefilter__cell.active");
      cells.forEach(item => {
        types.push({ text: item.innerHTML })
      });

      this.onResetAjax(types);
    }
  }
};
</script>

<style lang="scss" scoped>
$top: 96px;
.filter {
  position: sticky;
  top: 0;
  z-index: 10000;
  &-header,
  &-extend {
    position: relative;
    z-index: 10000;
  }
  &-header {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  &-nav {
    flex: 1;
    color: #666;
    position: relative;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    padding:0 15px;
    &.active {
      font-weight: bold;
      color: #333;
    }
    &.open {
      color: #3190e8;
      font-weight: 700;
    }
  }
  &-extend {
    left: 0;
    right: 0;
    top: 100%;
    border-top: 1px solid #ddd;
    position: absolute;
    max-height: 0;
    background-color: #fff;
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

.shade {
  top: $top;
}

.category {
  display: flex;
  justify-content: space-between;
  &.active {
    color: #2395fc;
  }
}

.selected {
  width: 20px;
}

.morefilter {
  overflow: auto;
  height: 100%;
  padding: 0 10px;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  line-height: normal;
  &__dl {
    margin: 10px 0;
    overflow: hidden;
  }
  &__dt {
    margin-left: 1%;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }
  &__dd {
    flex-wrap: wrap;
    background: #fff;
    position: relative;
    display: flex;
  }
  &__cell {
    align-items: center;
    justify-content: center;
    flex: 0 0 31.33%;
    height: 36px;
    font-size: 12px;
    margin: 3px 1%;
    background: #fafafa;
    display: flex;
    &.active {
      font-weight: 700;
      color: #3190e8;
      background-color: #edf5ff;
    }
  }
  &__icon {
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
</style>