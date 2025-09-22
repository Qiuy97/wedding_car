"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      carImages: [],
      brandIndex: -1,
      brands: ["劳斯莱斯", "奔驰", "宝马", "奥迪", "林肯", "凯迪拉克", "雷克萨斯"],
      seatIndex: -1,
      seatOptions: ["2座", "4座", "5座", "6座", "7座", "8座"],
      minHourIndex: -1,
      minHourOptions: ["2小时", "3小时", "4小时", "6小时", "8小时"],
      formData: new UTSJSONObject({
        brand: "",
        model: "",
        color: "",
        year: "",
        seats: "",
        price_per_hour: "",
        service_area: "",
        description: ""
      }),
      availableFeatures: [
        "GPS导航",
        "车载WiFi",
        "真皮座椅",
        "天窗",
        "豪华内饰",
        "专业司机",
        "婚车装饰",
        "保险齐全",
        "24小时服务",
        "免费接送"
      ],
      selectedFeatures: []
    };
  },
  methods: {
    addImage() {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 6 - this.carImages.length,
        success: (res) => {
          this.carImages = [...this.carImages, ...res.tempFilePaths];
        }
      }));
    },
    removeImage(index = null) {
      this.carImages.splice(index, 1);
    },
    onBrandChange(e = null) {
      this.brandIndex = e.detail.value;
      this.formData.brand = this.brands[this.brandIndex];
    },
    onYearChange(e = null) {
      this.formData.year = e.detail.value;
    },
    onSeatChange(e = null) {
      this.seatIndex = e.detail.value;
      this.formData.seats = parseInt(this.seatOptions[this.seatIndex]);
    },
    onMinHourChange(e = null) {
      this.minHourIndex = e.detail.value;
    },
    toggleFeature(feature = null) {
      const index = this.selectedFeatures.indexOf(feature);
      if (index > -1) {
        this.selectedFeatures.splice(index, 1);
      } else {
        this.selectedFeatures.push(feature);
      }
    },
    validateForm() {
      if (this.carImages.length === 0) {
        common_vendor.index.showToast({
          title: "请至少上传一张车辆图片",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.brand) {
        common_vendor.index.showToast({
          title: "请选择车辆品牌",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.model) {
        common_vendor.index.showToast({
          title: "请输入车辆型号",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.price_per_hour) {
        common_vendor.index.showToast({
          title: "请输入每小时价格",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    submitCar() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!this.validateForm()) {
          return Promise.resolve(null);
        }
        common_vendor.index.showLoading({
          title: "提交中..."
        });
        try {
          yield new Promise((resolve) => {
            return setTimeout(resolve, 2e3);
          });
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "提交成功，等待审核",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } catch (error) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "提交失败，请重试",
            icon: "none"
          });
        }
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.carImages, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.removeImage(index), index),
        c: index
      };
    }),
    b: $data.carImages.length < 6
  }, $data.carImages.length < 6 ? {
    c: common_vendor.o((...args) => $options.addImage && $options.addImage(...args))
  } : {}, {
    d: common_vendor.t($data.brandIndex !== -1 ? $data.brands[$data.brandIndex] : "请选择品牌"),
    e: $data.brandIndex === -1 ? 1 : "",
    f: $data.brandIndex,
    g: $data.brands,
    h: common_vendor.o((...args) => $options.onBrandChange && $options.onBrandChange(...args)),
    i: $data.formData.model,
    j: common_vendor.o(($event) => $data.formData.model = $event.detail.value),
    k: $data.formData.color,
    l: common_vendor.o(($event) => $data.formData.color = $event.detail.value),
    m: common_vendor.t($data.formData.year || "请选择年份"),
    n: !$data.formData.year ? 1 : "",
    o: $data.formData.year,
    p: common_vendor.o((...args) => $options.onYearChange && $options.onYearChange(...args)),
    q: common_vendor.t($data.seatIndex !== -1 ? $data.seatOptions[$data.seatIndex] : "请选择座位数"),
    r: $data.seatIndex === -1 ? 1 : "",
    s: $data.seatIndex,
    t: $data.seatOptions,
    v: common_vendor.o((...args) => $options.onSeatChange && $options.onSeatChange(...args)),
    w: $data.formData.price_per_hour,
    x: common_vendor.o(($event) => $data.formData.price_per_hour = $event.detail.value),
    y: common_vendor.t($data.minHourIndex !== -1 ? $data.minHourOptions[$data.minHourIndex] : "请选择最低时长"),
    z: $data.minHourIndex === -1 ? 1 : "",
    A: $data.minHourIndex,
    B: $data.minHourOptions,
    C: common_vendor.o((...args) => $options.onMinHourChange && $options.onMinHourChange(...args)),
    D: $data.formData.service_area,
    E: common_vendor.o(($event) => $data.formData.service_area = $event.detail.value),
    F: common_vendor.f($data.availableFeatures, (feature, k0, i0) => {
      return {
        a: common_vendor.t(feature),
        b: common_vendor.n($data.selectedFeatures.includes(feature) ? "fa-check-circle" : "fa-circle-o"),
        c: feature,
        d: $data.selectedFeatures.includes(feature) ? 1 : "",
        e: common_vendor.o(($event) => $options.toggleFeature(feature), feature)
      };
    }),
    G: $data.formData.description,
    H: common_vendor.o(($event) => $data.formData.description = $event.detail.value),
    I: common_vendor.o((...args) => $options.submitCar && $options.submitCar(...args)),
    J: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fd53b458"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/owner/car-add.js.map
