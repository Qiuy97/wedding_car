"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      favoriteList: []
    };
  },
  onLoad() {
    this.loadFavoriteList();
  },
  onShow() {
    this.loadFavoriteList();
  },
  methods: {
    loadFavoriteList() {
      this.favoriteList = [
        {
          _id: "car001",
          brand: "劳斯莱斯",
          model: "幻影",
          images: ["/static/cars/rolls1.jpg"],
          rating: 4.9,
          order_count: 156,
          price_per_hour: 2e3,
          service_area: "朝阳区"
        },
        {
          _id: "car002",
          brand: "奔驰",
          model: "S级",
          images: ["/static/cars/benz1.jpg"],
          rating: 4.8,
          order_count: 89,
          price_per_hour: 800,
          service_area: "海淀区"
        }
      ];
    },
    removeFavorite(car = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "取消收藏",
        content: "确定要取消收藏这辆车吗？",
        success: (res) => {
          if (res.confirm) {
            const index = this.favoriteList.findIndex((item) => {
              return item._id === car._id;
            });
            if (index > -1) {
              this.favoriteList.splice(index, 1);
            }
            common_vendor.index.showToast({
              title: "已取消收藏",
              icon: "success"
            });
          }
        }
      }));
    },
    goToCarDetail(car = null) {
      common_vendor.index.navigateTo({
        url: `/pages/car-detail/car-detail?id=${car._id}`
      });
    },
    goToSearch() {
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.favoriteList.length > 0
  }, $data.favoriteList.length > 0 ? {
    b: common_vendor.f($data.favoriteList, (car, k0, i0) => {
      return {
        a: car.images[0],
        b: common_vendor.t(car.brand),
        c: common_vendor.t(car.model),
        d: common_vendor.t(car.rating),
        e: common_vendor.t(car.order_count),
        f: common_vendor.t(car.price_per_hour),
        g: common_vendor.t(car.service_area),
        h: common_vendor.o(($event) => $options.removeFavorite(car), car._id),
        i: car._id,
        j: common_vendor.o(($event) => $options.goToCarDetail(car), car._id)
      };
    })
  } : {
    c: common_vendor.o((...args) => $options.goToSearch && $options.goToSearch(...args))
  }, {
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fdf2765d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/favorites/favorites.js.map
