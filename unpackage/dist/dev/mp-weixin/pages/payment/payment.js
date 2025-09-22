"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      orderId: "",
      paymentAmount: 0,
      selectedMethod: "wechat",
      countdown: 900,
      countdownTimer: null
    };
  },
  computed: {
    countdownText() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.paymentAmount = parseFloat(options.amount);
    this.startCountdown();
  },
  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  methods: {
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
          common_vendor.index.showModal(new UTSJSONObject({
            title: "支付超时",
            content: "订单已超时，请重新下单",
            showCancel: false,
            success: () => {
              common_vendor.index.navigateBack();
            }
          }));
        }
      }, 1e3);
    },
    selectMethod(method = null) {
      this.selectedMethod = method;
    },
    handlePayment() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (this.selectedMethod === "wechat") {
          this.wechatPay();
        }
      });
    },
    wechatPay() {
      common_vendor.index.showLoading({
        title: "发起支付..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: `/pages/order-success/order-success?orderId=${this.orderId}`
        });
      }, 2e3);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.paymentAmount),
    b: common_vendor.t($options.countdownText),
    c: common_vendor.n($data.selectedMethod === "wechat" ? "fa-check-circle" : "fa-circle-o"),
    d: $data.selectedMethod === "wechat" ? 1 : "",
    e: common_vendor.o(($event) => $options.selectMethod("wechat")),
    f: common_vendor.t($data.paymentAmount),
    g: common_vendor.o((...args) => $options.handlePayment && $options.handlePayment(...args)),
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4eefaf23"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/payment/payment.js.map
