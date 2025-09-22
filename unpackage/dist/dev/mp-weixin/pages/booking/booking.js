"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      carId: "",
      // 车辆信息 - 完全匹配HTML设计
      carInfo: new UTSJSONObject({
        _id: "car001",
        name: "奔驰S级",
        image: "https://picsum.photos/300/300?random=70",
        alt: "奔驰S级婚车",
        rating: 4.9,
        price: 2800
      }),
      // 预订表单数据 - 完全匹配HTML设计
      formData: new UTSJSONObject({
        serviceDate: "",
        serviceTime: "",
        pickupAddress: "",
        destination: "",
        contactPhone: "",
        remarks: ""
      }),
      // 服务选项 - 完全匹配HTML设计
      serviceOptions: [
        new UTSJSONObject({
          id: 1,
          name: "婚车装饰",
          description: "包含鲜花装饰、拉花布置等",
          price: 0,
          selected: true
        }),
        new UTSJSONObject({
          id: 2,
          name: "专业司机",
          description: "经验丰富的专业司机",
          price: 0,
          selected: true
        }),
        new UTSJSONObject({
          id: 3,
          name: "跟拍服务",
          description: "专业摄影师全程跟拍",
          price: 500,
          selected: false
        }),
        new UTSJSONObject({
          id: 4,
          name: "迎宾服务",
          description: "专业迎宾团队",
          price: 300,
          selected: false
        })
      ]
    };
  },
  computed: {
    // 计算最小日期（今天）
    minDate() {
      const today = /* @__PURE__ */ new Date();
      return today.toISOString().split("T")[0];
    },
    // 已选择的服务
    selectedServices() {
      return this.serviceOptions.filter((service) => {
        return service.selected && service.price > 0;
      });
    },
    // 计算总金额
    totalAmount() {
      const basePrice = this.carInfo.price;
      const servicesPrice = this.selectedServices.reduce((total, service) => {
        return total + service.price;
      }, 0);
      return basePrice + servicesPrice;
    }
  },
  onLoad(options) {
    this.carId = options.carId || "car001";
    if (options.carName) {
      this.carInfo.name = options.carName;
    }
    if (options.price) {
      this.carInfo.price = parseInt(options.price);
    }
  },
  methods: {
    // 日期选择
    onDateChange(e = null) {
      this.formData.serviceDate = e.detail.value;
    },
    // 时间选择
    onTimeChange(e = null) {
      this.formData.serviceTime = e.detail.value;
    },
    // 地址选择
    selectLocation(type = null) {
      const addresses = [
        "北京市朝阳区国贸大厦",
        "北京市海淀区中关村",
        "北京市西城区金融街",
        "北京市东城区王府井"
      ];
      common_vendor.index.showActionSheet({
        itemList: addresses,
        success: (res) => {
          const selectedAddress = addresses[res.tapIndex];
          if (type === "pickup") {
            this.formData.pickupAddress = selectedAddress;
          } else if (type === "destination") {
            this.formData.destination = selectedAddress;
          }
        }
      });
    },
    // 切换服务选项
    toggleService(service = null) {
      if (service.id <= 2) {
        return null;
      }
      service.selected = !service.selected;
    },
    // 表单验证
    validateForm() {
      if (!this.formData.serviceDate) {
        common_vendor.index.showToast({ title: "请选择服务日期", icon: "none" });
        return false;
      }
      if (!this.formData.serviceTime) {
        common_vendor.index.showToast({ title: "请选择服务时间", icon: "none" });
        return false;
      }
      if (!this.formData.pickupAddress) {
        common_vendor.index.showToast({ title: "请选择接车地址", icon: "none" });
        return false;
      }
      if (!this.formData.destination) {
        common_vendor.index.showToast({ title: "请选择目的地", icon: "none" });
        return false;
      }
      if (!this.formData.contactPhone) {
        common_vendor.index.showToast({ title: "请输入联系电话", icon: "none" });
        return false;
      }
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.formData.contactPhone)) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return false;
      }
      return true;
    },
    // 提交预订
    submitBooking() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!this.validateForm()) {
          return Promise.resolve(null);
        }
        common_vendor.index.showLoading({ title: "提交中..." });
        try {
          const orderData = new UTSJSONObject({
            carId: this.carId,
            carName: this.carInfo.name,
            serviceDate: this.formData.serviceDate,
            serviceTime: this.formData.serviceTime,
            pickupAddress: this.formData.pickupAddress,
            destination: this.formData.destination,
            contactPhone: this.formData.contactPhone,
            remarks: this.formData.remarks,
            selectedServices: this.selectedServices,
            totalAmount: this.totalAmount
          });
          yield new Promise((resolve) => {
            return setTimeout(resolve, 1500);
          });
          common_vendor.index.hideLoading();
          const orderId = "WC" + Date.now();
          common_vendor.index.redirectTo({
            url: `/pages/payment/payment?orderId=${orderId}&amount=${this.totalAmount}&carName=${encodeURIComponent(this.carInfo.name)}`
          });
        } catch (error) {
          common_vendor.index.hideLoading();
          common_vendor.index.__f__("error", "at pages/booking/booking.uvue:365", "提交预订失败:", error);
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
  return {
    a: $data.carInfo.image,
    b: $data.carInfo.alt,
    c: common_vendor.t($data.carInfo.name),
    d: common_vendor.t($data.carInfo.rating),
    e: common_vendor.t($data.carInfo.price),
    f: common_vendor.t($data.formData.serviceDate || "选择日期"),
    g: common_vendor.n($data.formData.serviceDate ? "text-neutral" : "text-neutral-light"),
    h: $data.formData.serviceDate,
    i: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    j: $options.minDate,
    k: common_vendor.t($data.formData.serviceTime || "选择时间"),
    l: common_vendor.n($data.formData.serviceTime ? "text-neutral" : "text-neutral-light"),
    m: $data.formData.serviceTime,
    n: common_vendor.o((...args) => $options.onTimeChange && $options.onTimeChange(...args)),
    o: common_vendor.t($data.formData.pickupAddress || "选择接车地址"),
    p: common_vendor.n($data.formData.pickupAddress ? "text-neutral" : "text-neutral-light"),
    q: common_vendor.o(($event) => $options.selectLocation("pickup")),
    r: common_vendor.t($data.formData.destination || "选择目的地"),
    s: common_vendor.n($data.formData.destination ? "text-neutral" : "text-neutral-light"),
    t: common_vendor.o(($event) => $options.selectLocation("destination")),
    v: $data.formData.contactPhone,
    w: common_vendor.o(($event) => $data.formData.contactPhone = $event.detail.value),
    x: $data.formData.remarks,
    y: common_vendor.o(($event) => $data.formData.remarks = $event.detail.value),
    z: common_vendor.f($data.serviceOptions, (service, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(service.name),
        b: common_vendor.t(service.description),
        c: common_vendor.t(service.price > 0 ? "+¥" + service.price : "免费"),
        d: service.selected
      }, service.selected ? {} : {}, {
        e: common_vendor.n(service.selected ? "bg-primary" : ""),
        f: service.id,
        g: common_vendor.o(($event) => $options.toggleService(service), service.id)
      });
    }),
    A: common_vendor.t($data.carInfo.price),
    B: common_vendor.f($options.selectedServices, (service, k0, i0) => {
      return {
        a: common_vendor.t(service.name),
        b: common_vendor.t(service.price),
        c: service.id
      };
    }),
    C: common_vendor.t($options.totalAmount),
    D: common_vendor.t($options.totalAmount),
    E: common_vendor.o((...args) => $options.submitBooking && $options.submitBooking(...args)),
    F: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4970f422"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/booking/booking.js.map
