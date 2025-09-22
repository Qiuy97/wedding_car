"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // 轮播数据 - 完全匹配HTML设计
      carouselList: [
        new UTSJSONObject({
          image: "https://picsum.photos/600/300?random=1",
          alt: "豪华婚车展示",
          title: "七夕婚车特惠",
          subtitle: "预订即享8折优惠"
        }),
        new UTSJSONObject({
          image: "https://picsum.photos/600/300?random=2",
          alt: "婚车车队展示",
          title: "热门车型推荐",
          subtitle: "奔驰S级立减2000元"
        }),
        new UTSJSONObject({
          image: "https://picsum.photos/600/300?random=3",
          alt: "婚车装饰展示",
          title: "婚车装饰套餐",
          subtitle: "满1000减300"
        })
      ],
      // 快捷入口 - 完全匹配HTML设计
      quickEntries: [
        new UTSJSONObject({ name: "豪华轿车", icon: "fa-car", type: "luxury" }),
        new UTSJSONObject({ name: "跑车系列", icon: "fa-bolt", type: "sports" }),
        new UTSJSONObject({ name: "SUV系列", icon: "fa-truck", type: "suv" }),
        new UTSJSONObject({ name: "特惠活动", icon: "fa-tag", type: "promotion" })
      ],
      // 推荐车型 - 完全匹配HTML设计
      recommendCars: [
        new UTSJSONObject({
          _id: "car001",
          name: "奔驰S级",
          image: "https://picsum.photos/600/400?random=10",
          alt: "奔驰S级婚车",
          rating: 4.9,
          specs: "黑色 / 5座 / 自动",
          price: 2800,
          tag: "热门",
          tagClass: "bg-primary"
        }),
        new UTSJSONObject({
          _id: "car002",
          name: "宝马7系",
          image: "https://picsum.photos/600/400?random=11",
          alt: "宝马7系婚车",
          rating: 4.8,
          specs: "黑色 / 5座 / 自动",
          price: 2500,
          tag: "特惠",
          tagClass: "bg-secondary"
        }),
        new UTSJSONObject({
          _id: "car003",
          name: "奥迪A8",
          image: "https://picsum.photos/600/400?random=12",
          alt: "奥迪A8婚车",
          rating: 4.7,
          specs: "黑色 / 5座 / 自动",
          price: 2200,
          tag: "",
          tagClass: ""
        })
      ]
    };
  },
  methods: {
    // 快捷入口点击处理 - 匹配HTML功能
    handleQuickEntry(entry = null) {
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
      common_vendor.index.setStorageSync("searchFilter", entry.type);
    },
    // 查看全部车辆
    goToSearch() {
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
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
  return {
    a: common_vendor.f($data.carouselList, (banner, index, i0) => {
      return {
        a: banner.image,
        b: banner.alt,
        c: common_vendor.t(banner.title),
        d: common_vendor.t(banner.subtitle),
        e: index
      };
    }),
    b: common_vendor.f($data.quickEntries, (entry, index, i0) => {
      return {
        a: common_vendor.n(entry.icon),
        b: common_vendor.t(entry.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleQuickEntry(entry), index)
      };
    }),
    c: common_vendor.o((...args) => $options.goToSearch && $options.goToSearch(...args)),
    d: common_vendor.f($data.recommendCars, (car, index, i0) => {
      return common_vendor.e({
        a: car.image,
        b: car.alt,
        c: car.tag
      }, car.tag ? {
        d: common_vendor.t(car.tag),
        e: common_vendor.n(car.tagClass)
      } : {}, {
        f: common_vendor.t(car.name),
        g: common_vendor.t(car.rating),
        h: common_vendor.t(car.specs),
        i: common_vendor.t(car.price),
        j: index,
        k: common_vendor.o(($event) => $options.goToCarDetail(car), index)
      });
    }),
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
