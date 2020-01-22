<template>
  <section class="filter">
    <div class="filter-header" @click="selectFilterNavbar">
      <a
        class="filter-nav filter-sort"
        :class="{open: openSort, active: currentActive == 0}"
      >
        综合排序
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconarrowdown-copy"></use>
        </svg>
      </a>
      <a class="filter-nav" data-index="1" :class="{active: currentActive == 1}">距离最近</a>
      <a class="filter-nav" data-index="2" :class="{active: currentActive == 2}">销量最高</a>
      <a class="filter-nav" data-index="3" :class="{active: currentActive == 3}">
        筛选
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfilter"></use>
        </svg>
      </a>
    </div>
    <div class="filter-extend" :class="{open: openSort}" @click="selectSort">
      <van-cell center v-for="(item, index) in sort" :key="index" :data-index="index">
        {{item.text}}
        <img
          data-v-52820b2e=""
          src="../assets/images/icon01.png"
          :alt="item.text"
          class="selected"
          v-show="currentSort == item"
        >
      </van-cell>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      openSort: false,
      currentActive: 0,
      currentSort: {},
      sort: [
        {
          id: 1,
          text: "综合排序"
        },
        {
          id: 2,
          text: "好评优先"
        },
        {
          id: 3,
          text: "起送价最低"
        },
        {
          id: 4,
          text: "配送最快"
        },
        {
          id: 5,
          text: "配送费最低"
        },
        {
          id: 6,
          text: "人均从低到高"
        },
        {
          id: 7,
          text: "人均从高到低"
        },
        {
          id: 8,
          text: "通用排序"
        }
      ]
    };
  },
  methods: {
    selectFilterNavbar(event) {
      let sort = this.utils.queryPathSelector(event, 'filter-sort')
      let nav =  this.utils.queryPathSelector(event, 'filter-nav')
      
      // 如果是排序
      if(sort) {
        this.openSort = !this.openSort;
        return
      } 

      console.log(nav)
    },
    toggleSortPanel() {
      this.openSort = !this.openSort;
    },
    selectSort() {

    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  &-header {
    display: flex;
    height: 40px;
    line-height: 40px;
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
    z-index: 4;
    &.open {
      opacity: 1;
      visibility: visible;
      max-height: 1500%;
    }
  }
}

.selected {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: none;
}
</style>