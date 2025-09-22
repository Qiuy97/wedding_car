"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      statusBarHeight: 0,
      chartPeriod: 0,
      pendingOrders: 3,
      ownerInfo: new UTSJSONObject({
        nickname: "王师傅",
        avatar: "/static/avatar/owner1.jpg"
      }),
      ownerStats: new UTSJSONObject({
        todayIncome: 1200,
        monthIncome: 15600,
        totalOrders: 156
      }),
      recentOrders: []
    };
  },
  onLoad() {
    this.getStatusBarHeight();
    this.loadRecentOrders();
  },
  methods: {
    getStatusBarHeight() {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight || 0;
    },
    loadRecentOrders() {
      this.recentOrders = [
        {
          _id: "order001",
          car: { brand: "劳斯莱斯", model: "幻影" },
          service_date: "2025-02-14",
          service_time: "09:00",
          pickup_location: "朝阳区三里屯",
          total_amount: 4e3,
          owner_amount: 3800,
          status: 1
        },
        {
          _id: "order002",
          car: { brand: "奔驰", model: "S级" },
          service_date: "2025-01-20",
          service_time: "14:00",
          pickup_location: "海淀区中关村",
          total_amount: 2400,
          owner_amount: 2280,
          status: 2
        }
      ];
    },
    onChartPeriodChange(e = null) {
      this.chartPeriod = e.detail.value;
    },
    getOrderStatusClass(status = null) {
      const classMap = new UTSJSONObject({
        1: "pending",
        2: "confirmed",
        3: "ongoing",
        4: "completed"
      });
      return classMap[status] || "";
    },
    getOrderStatusText(status = null) {
      const textMap = new UTSJSONObject({
        1: "待确认",
        2: "已确认",
        3: "进行中",
        4: "已完成"
      });
      return textMap[status] || "";
    },
    goToSettings() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/settings"
      });
    },
    goToCarManage() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/car-manage"
      });
    },
    goToOrderManage() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/order-manage"
      });
    },
    goToIncome() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/income"
      });
    },
    goToWithdraw() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/withdraw"
      });
    },
    goToOrderDetail(order = null) {
      common_vendor.index.navigateTo({
        url: `/pages/order-detail/order-detail?id=${order._id}`
      });
    },
    goToProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/profile"
      });
    },
    goToReviews() {
      common_vendor.index.navigateTo({
        url: "/pages/owner/reviews"
      });
    },
    goToHelp() {
      common_vendor.index.navigateTo({
        url: "/pages/help/help"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.ownerInfo.avatar,
    b: common_vendor.t($data.ownerInfo.nickname),
    c: common_vendor.o((...args) => $options.goToSettings && $options.goToSettings(...args)),
    d: common_vendor.t($data.ownerStats.todayIncome),
    e: common_vendor.t($data.ownerStats.monthIncome),
    f: common_vendor.t($data.ownerStats.totalOrders),
    g: $data.statusBarHeight + "px",
    h: common_vendor.t(["本周", "本月", "本年"][$data.chartPeriod]),
    i: $data.chartPeriod,
    j: ["本周", "本月", "本年"],
    k: common_vendor.o((...args) => $options.onChartPeriodChange && $options.onChartPeriodChange(...args)),
    l: common_vendor.o((...args) => $options.goToCarManage && $options.goToCarManage(...args)),
    m: $data.pendingOrders > 0
  }, $data.pendingOrders > 0 ? {
    n: common_vendor.t($data.pendingOrders)
  } : {}, {
    o: common_vendor.o((...args) => $options.goToOrderManage && $options.goToOrderManage(...args)),
    p: common_vendor.o((...args) => $options.goToIncome && $options.goToIncome(...args)),
    q: common_vendor.o((...args) => $options.goToWithdraw && $options.goToWithdraw(...args)),
    r: common_vendor.o((...args) => $options.goToOrderManage && $options.goToOrderManage(...args)),
    s: common_vendor.f($data.recentOrders, (order, k0, i0) => {
      return {
        a: common_vendor.t(order.car.brand),
        b: common_vendor.t(order.car.model),
        c: common_vendor.t(order.service_date),
        d: common_vendor.t(order.service_time),
        e: common_vendor.t(order.pickup_location),
        f: common_vendor.t(order.owner_amount || order.total_amount),
        g: common_vendor.t($options.getOrderStatusText(order.status)),
        h: common_vendor.n($options.getOrderStatusClass(order.status)),
        i: order._id,
        j: common_vendor.o(($event) => $options.goToOrderDetail(order), order._id)
      };
    }),
    t: common_vendor.o((...args) => $options.goToProfile && $options.goToProfile(...args)),
    v: common_vendor.o((...args) => $options.goToReviews && $options.goToReviews(...args)),
    w: common_vendor.o((...args) => $options.goToHelp && $options.goToHelp(...args)),
    x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-31997c8d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/owner/dashboard.js.map
