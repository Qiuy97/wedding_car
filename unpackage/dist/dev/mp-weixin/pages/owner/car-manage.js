"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      carList: []
    };
  },
  onLoad() {
    this.loadCarList();
  },
  onShow() {
    this.loadCarList();
  },
  methods: {
    loadCarList() {
      this.carList = [
        {
          _id: "car001",
          brand: "劳斯莱斯",
          model: "幻影",
          year: "2023",
          color: "珍珠白",
          images: ["/static/cars/rolls1.jpg"],
          price_per_hour: 2e3,
          order_count: 156,
          status: 1
        },
        {
          _id: "car002",
          brand: "奔驰",
          model: "S级",
          year: "2024",
          color: "香槟金",
          images: ["/static/cars/benz1.jpg"],
          price_per_hour: 800,
          order_count: 89,
          status: 1
        }
      ];
    },
    goToAddCar() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/car-add"
      });
    },
    editCar(car = null) {
      common_vendor.index.navigateTo({
        url: `/pages/owner/car-edit?id=${car._id}`
      });
    },
    toggleCarStatus(car = null) {
      car.status = car.status === 1 ? 0 : 1;
      common_vendor.index.showToast({
        title: car.status === 1 ? "车辆已上线" : "车辆已下线",
        icon: "success"
      });
    },
    deleteCar(car = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "删除车辆",
        content: "确定要删除这辆车吗？删除后无法恢复。",
        success: (res) => {
          if (res.confirm) {
            const index = this.carList.findIndex((item) => {
              return item._id === car._id;
            });
            if (index > -1) {
              this.carList.splice(index, 1);
            }
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      }));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goToAddCar && $options.goToAddCar(...args)),
    b: common_vendor.f($data.carList, (car, k0, i0) => {
      return {
        a: car.images[0],
        b: common_vendor.t(car.brand),
        c: common_vendor.t(car.model),
        d: common_vendor.t(car.year),
        e: common_vendor.t(car.color),
        f: common_vendor.t(car.price_per_hour),
        g: common_vendor.t(car.order_count),
        h: common_vendor.t(car.status === 1 ? "上线中" : "已下线"),
        i: common_vendor.n(car.status === 1 ? "online" : "offline"),
        j: common_vendor.n(car.status === 1 ? "fa-pause" : "fa-play"),
        k: common_vendor.o(($event) => $options.toggleCarStatus(car), car._id),
        l: common_vendor.o(($event) => $options.editCar(car), car._id),
        m: common_vendor.o(($event) => $options.deleteCar(car), car._id),
        n: car._id,
        o: common_vendor.o(($event) => $options.editCar(car), car._id)
      };
    }),
    c: $data.carList.length === 0
  }, $data.carList.length === 0 ? {
    d: common_vendor.o((...args) => $options.goToAddCar && $options.goToAddCar(...args))
  } : {}, {
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-320d2de6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/owner/car-manage.js.map
