"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      searchKeyword: "",
      viewMode: "list",
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10,
      activeFilter: "all",
      // 车辆列表数据 - 完全匹配HTML设计
      carList: [
        new UTSJSONObject({
          _id: "car001",
          name: "奔驰S级",
          image: "https://picsum.photos/300/300?random=20",
          alt: "奔驰S级婚车",
          rating: 4.9,
          specs: "黑色 / 5座 / 自动",
          price: 2800,
          feature1: "免费装饰",
          feature2: "送花车"
        }),
        new UTSJSONObject({
          _id: "car002",
          name: "宝马7系",
          image: "https://picsum.photos/300/300?random=21",
          alt: "宝马7系婚车",
          rating: 4.8,
          specs: "黑色 / 5座 / 自动",
          price: 2500,
          feature1: "免费装饰",
          feature2: "送花车"
        }),
        new UTSJSONObject({
          _id: "car003",
          name: "奥迪A8",
          image: "https://picsum.photos/300/300?random=22",
          alt: "奥迪A8婚车",
          rating: 4.7,
          specs: "黑色 / 5座 / 自动",
          price: 2200,
          feature1: "免费装饰",
          feature2: "送花车"
        }),
        new UTSJSONObject({
          _id: "car004",
          name: "保时捷Panamera",
          image: "https://picsum.photos/300/300?random=23",
          alt: "保时捷婚车",
          rating: 4.9,
          specs: "白色 / 4座 / 自动",
          price: 5800,
          feature1: "豪华装饰",
          feature2: "送花车"
        }),
        new UTSJSONObject({
          _id: "car005",
          name: "宾利飞驰",
          image: "https://picsum.photos/300/300?random=24",
          alt: "宾利婚车",
          rating: 5,
          specs: "黑色 / 5座 / 自动",
          price: 12800,
          feature1: "高级装饰",
          feature2: "专属司机"
        })
      ]
    };
  },
  onLoad() {
    const filter = common_vendor.index.getStorageSync("searchFilter");
    if (filter) {
      this.activeFilter = filter;
      common_vendor.index.removeStorageSync("searchFilter");
    }
  },
  methods: {
    // 处理搜索输入
    handleSearch() {
      common_vendor.index.__f__("log", "at pages/search/search.uvue:212", "搜索关键词:", this.searchKeyword);
    },
    // 设置活动筛选项 - 匹配HTML功能
    setActiveFilter(filter = null) {
      this.activeFilter = filter;
      this.filterCars(filter);
    },
    // 筛选车辆功能 - 匹配HTML功能
    filterCars(category = null) {
      common_vendor.index.__f__("log", "at pages/search/search.uvue:225", "筛选车辆类别:", category);
    },
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1e3);
      }
    },
    // 跳转车辆详情
    goToCarDetail(car = null) {
      common_vendor.index.navigateTo({
        url: `/pages/car-detail/car-detail?id=${car._id}`
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.handleSearch && $options.handleSearch(...args)]),
    b: $data.searchKeyword,
    c: common_vendor.n($data.activeFilter === "all" ? "bg-primary text-white" : "bg-light text-neutral"),
    d: common_vendor.o(($event) => $options.setActiveFilter("all")),
    e: common_vendor.n($data.activeFilter === "price" ? "bg-primary text-white" : "bg-light text-neutral"),
    f: common_vendor.o(($event) => $options.setActiveFilter("price")),
    g: common_vendor.n($data.activeFilter === "rating" ? "bg-primary text-white" : "bg-light text-neutral"),
    h: common_vendor.o(($event) => $options.setActiveFilter("rating")),
    i: common_vendor.n($data.activeFilter === "benz" ? "bg-primary text-white" : "bg-light text-neutral"),
    j: common_vendor.o(($event) => $options.setActiveFilter("benz")),
    k: common_vendor.n($data.activeFilter === "bmw" ? "bg-primary text-white" : "bg-light text-neutral"),
    l: common_vendor.o(($event) => $options.setActiveFilter("bmw")),
    m: common_vendor.n($data.activeFilter === "audi" ? "bg-primary text-white" : "bg-light text-neutral"),
    n: common_vendor.o(($event) => $options.setActiveFilter("audi")),
    o: common_vendor.n($data.activeFilter === "more" ? "bg-primary text-white" : "bg-light text-neutral"),
    p: common_vendor.o(($event) => $options.setActiveFilter("more")),
    q: common_vendor.o(($event) => $data.viewMode = "grid"),
    r: common_vendor.o(($event) => $data.viewMode = "list"),
    s: common_vendor.f($data.carList, (car, index, i0) => {
      return {
        a: car.image,
        b: car.alt,
        c: common_vendor.t(car.name),
        d: common_vendor.t(car.rating),
        e: common_vendor.t(car.specs),
        f: common_vendor.t(car.feature1),
        g: common_vendor.t(car.feature2),
        h: common_vendor.t(car.price),
        i: car._id,
        j: common_vendor.o(($event) => $options.goToCarDetail(car), car._id)
      };
    }),
    t: $data.hasMore
  }, $data.hasMore ? common_vendor.e({
    v: !$data.loading
  }, !$data.loading ? {} : {}, {
    w: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  }) : {}, {
    x: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c1fadca8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
