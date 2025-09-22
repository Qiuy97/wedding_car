"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      orderId: "",
      paymentAmount: 0
    };
  },
  onLoad(options) {
    this.orderId = options.orderId || "ORDER20250101001";
    this.paymentAmount = options.amount || 4e3;
  },
  methods: {
    goToOrderDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/order-detail/order-detail?id=${this.orderId}`
      });
    },
    goToHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.orderId),
    b: common_vendor.t($data.paymentAmount),
    c: common_vendor.o((...args) => $options.goToOrderDetail && $options.goToOrderDetail(...args)),
    d: common_vendor.o((...args) => $options.goToHome && $options.goToHome(...args)),
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a57c70ee"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order-success/order-success.js.map
