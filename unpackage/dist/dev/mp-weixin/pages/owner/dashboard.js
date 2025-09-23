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
        avatar: "https://picsum.photos/100/100?random=90",
        level: "资深车主",
        ownerId: "776543210"
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
    onAvatarError() {
      common_vendor.index.__f__("log", "at pages/owner/dashboard.uvue:165", "头像加载失败");
      this.ownerInfo.avatar = "https://via.placeholder.com/100x100/cccccc/ffffff?text=头像";
    },
    loadRecentOrders() {
      this.recentOrders = [
        {
          _id: "order001",
          order_no: "WC202501150001",
          car: { brand: "劳斯莱斯", model: "幻影" },
          customer_name: "张先生",
          service_date: "2025-02-14",
          service_time: "09:00",
          pickup_location: "朝阳区三里屯",
          total_amount: 4e3,
          owner_amount: 3800,
          status: 1
          // 待确认
        },
        {
          _id: "order002",
          order_no: "WC202501140002",
          car: { brand: "奔驰", model: "S级" },
          customer_name: "李先生",
          service_date: "2025-01-20",
          service_time: "14:00",
          pickup_location: "海淀区中关村",
          total_amount: 2400,
          owner_amount: 2280,
          status: 2
          // 已确认
        },
        {
          _id: "order003",
          order_no: "WC202501130003",
          car: { brand: "宝马", model: "7系" },
          customer_name: "王女士",
          service_date: "2025-01-18",
          service_time: "16:30",
          pickup_location: "朝阳区国贸",
          total_amount: 2800,
          owner_amount: 2660,
          status: 1
          // 待确认
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
    // 联系客户
    contactCustomer(order = null) {
      common_vendor.index.showActionSheet({
        itemList: ["拨打电话", "发送短信"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "138****8888"
              // 实际应该从订单数据获取
            });
          } else if (res.tapIndex === 1) {
            common_vendor.index.showToast({
              title: "短信功能开发中",
              icon: "none"
            });
          }
        }
      });
    },
    // 确认订单
    confirmOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认订单",
        content: `确认接受订单 ${order.order_no} 吗？`,
        success: (res) => {
          if (res.confirm) {
            order.status = 2;
            common_vendor.index.showToast({
              title: "订单已确认",
              icon: "success"
            });
          }
        }
      }));
    },
    // 拒绝订单
    rejectOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "拒绝订单",
        content: `确认拒绝订单 ${order.order_no} 吗？`,
        success: (res) => {
          if (res.confirm) {
            const index = this.recentOrders.findIndex((item) => {
              return item._id === order._id;
            });
            if (index > -1) {
              this.recentOrders.splice(index, 1);
            }
            common_vendor.index.showToast({
              title: "订单已拒绝",
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
    a: $data.ownerInfo.avatar,
    b: common_vendor.o((...args) => $options.onAvatarError && $options.onAvatarError(...args)),
    c: common_vendor.t($data.ownerInfo.nickname),
    d: common_vendor.t($data.ownerInfo.level),
    e: common_vendor.t($data.ownerInfo.ownerId),
    f: common_vendor.o((...args) => $options.goToSettings && $options.goToSettings(...args)),
    g: common_vendor.t($data.ownerStats.todayIncome),
    h: common_vendor.t($data.ownerStats.monthIncome),
    i: common_vendor.t($data.ownerStats.totalOrders),
    j: $data.statusBarHeight + "px",
    k: common_vendor.t(["本周", "本月", "本年"][$data.chartPeriod]),
    l: $data.chartPeriod,
    m: ["本周", "本月", "本年"],
    n: common_vendor.o((...args) => $options.onChartPeriodChange && $options.onChartPeriodChange(...args)),
    o: common_vendor.o((...args) => $options.goToCarManage && $options.goToCarManage(...args)),
    p: $data.pendingOrders > 0
  }, $data.pendingOrders > 0 ? {
    q: common_vendor.t($data.pendingOrders)
  } : {}, {
    r: common_vendor.o((...args) => $options.goToOrderManage && $options.goToOrderManage(...args)),
    s: common_vendor.o((...args) => $options.goToIncome && $options.goToIncome(...args)),
    t: common_vendor.o((...args) => $options.goToWithdraw && $options.goToWithdraw(...args)),
    v: common_vendor.o((...args) => $options.goToOrderManage && $options.goToOrderManage(...args)),
    w: common_vendor.f($data.recentOrders, (order, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.order_no),
        b: common_vendor.t(order.car.brand),
        c: common_vendor.t(order.car.model),
        d: common_vendor.t(order.customer_name),
        e: common_vendor.t(order.service_date),
        f: common_vendor.t(order.service_time),
        g: common_vendor.t(order.owner_amount || order.total_amount),
        h: common_vendor.t($options.getOrderStatusText(order.status)),
        i: common_vendor.n($options.getOrderStatusClass(order.status)),
        j: common_vendor.o(($event) => $options.contactCustomer(order), order._id),
        k: order.status === 1
      }, order.status === 1 ? {
        l: common_vendor.o(($event) => $options.confirmOrder(order), order._id)
      } : {}, {
        m: order.status === 1
      }, order.status === 1 ? {
        n: common_vendor.o(($event) => $options.rejectOrder(order), order._id)
      } : {}, {
        o: order._id,
        p: common_vendor.o(($event) => $options.goToOrderDetail(order), order._id)
      });
    }),
    x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-31997c8d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/owner/dashboard.js.map
