"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      activeTab: "all",
      loading: false,
      hasMore: true,
      page: 1,
      // 标签配置 - 完全匹配HTML设计
      tabs: [
        new UTSJSONObject({ key: "all", name: "全部" }),
        new UTSJSONObject({ key: "pending", name: "待确认" }),
        new UTSJSONObject({ key: "confirmed", name: "已确认" }),
        new UTSJSONObject({ key: "ongoing", name: "进行中" }),
        new UTSJSONObject({ key: "completed", name: "已完成" })
      ],
      // 订单数据 - 完全匹配HTML设计
      orders: [
        new UTSJSONObject({
          id: "WC202501151030",
          orderNo: "WC202501151030",
          status: "confirmed",
          serviceDate: "2025-02-14",
          serviceTime: "09:00",
          pickupAddress: "北京市朝阳区三里屯",
          totalAmount: 3300,
          car: new UTSJSONObject({
            name: "奔驰S级",
            image: "https://picsum.photos/300/300?random=100"
          }),
          actions: [
            new UTSJSONObject({ type: "secondary", text: "联系车主", action: "contact" }),
            new UTSJSONObject({ type: "secondary", text: "取消订单", action: "cancel" })
          ]
        }),
        new UTSJSONObject({
          id: "WC202501101420",
          orderNo: "WC202501101420",
          status: "completed",
          serviceDate: "2025-01-20",
          serviceTime: "14:00",
          pickupAddress: "北京市海淀区中关村",
          totalAmount: 2800,
          car: new UTSJSONObject({
            name: "宝马7系",
            image: "https://picsum.photos/300/300?random=101"
          }),
          actions: [
            new UTSJSONObject({ type: "primary", text: "评价订单", action: "rate" })
          ]
        }),
        new UTSJSONObject({
          id: "WC202501051000",
          orderNo: "WC202501051000",
          status: "pending",
          serviceDate: "2025-02-01",
          serviceTime: "10:00",
          pickupAddress: "北京市西城区金融街",
          totalAmount: 4200,
          car: new UTSJSONObject({
            name: "劳斯莱斯幻影",
            image: "https://picsum.photos/300/300?random=102"
          }),
          actions: [
            new UTSJSONObject({ type: "secondary", text: "联系车主", action: "contact" }),
            new UTSJSONObject({ type: "secondary", text: "取消订单", action: "cancel" })
          ]
        }),
        new UTSJSONObject({
          id: "WC202412281600",
          orderNo: "WC202412281600",
          status: "ongoing",
          serviceDate: "2024-12-28",
          serviceTime: "16:00",
          pickupAddress: "北京市东城区王府井",
          totalAmount: 3500,
          car: new UTSJSONObject({
            name: "奥迪A8",
            image: "https://picsum.photos/300/300?random=103"
          }),
          actions: [
            new UTSJSONObject({ type: "secondary", text: "联系车主", action: "contact" })
          ]
        })
      ]
    };
  },
  computed: {
    // 当前选中标签名称
    activeTabName() {
      const tab = UTS.arrayFind(this.tabs, (t) => {
        return t.key === this.activeTab;
      });
      return tab ? tab.name : "";
    },
    // 过滤后的订单列表
    filteredOrders() {
      if (this.activeTab === "all") {
        return this.orders;
      }
      return this.orders.filter((order) => {
        return order.status === this.activeTab;
      });
    }
  },
  onLoad() {
    this.loadOrderList();
  },
  onShow() {
    this.refreshOrderList();
  },
  methods: {
    // 切换标签
    switchTab(tab = null) {
      this.activeTab = tab;
    },
    // 加载订单列表
    loadOrderList(refresh = false) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (this.loading)
          return Promise.resolve(null);
        this.loading = true;
        try {
          yield new Promise((resolve) => {
            return setTimeout(resolve, 800);
          });
          common_vendor.index.__f__("log", "at pages/order-list/order-list.uvue:212", "加载订单列表，标签:", this.activeTab, "页码:", this.page);
          this.hasMore = false;
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/order-list/order-list.uvue:217", "加载订单列表失败:", error);
          common_vendor.index.showToast({
            title: "加载失败",
            icon: "none"
          });
        }
        this.loading = false;
      });
    },
    // 刷新订单列表
    refreshOrderList() {
      this.page = 1;
      this.loadOrderList(true);
    },
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.loadOrderList();
      }
    },
    // 获取状态样式类
    getStatusClass(status = null) {
      const classMap = new UTSJSONObject({
        "pending": "bg-secondary-10 text-secondary",
        "confirmed": "bg-primary-10 text-primary",
        "ongoing": "bg-blue-100 text-blue-600",
        "completed": "bg-green-100 text-green-600",
        "cancelled": "bg-red-100 text-red-600"
        // 已取消 - 红色
      });
      return classMap[status] || "bg-gray-100 text-gray-600";
    },
    // 获取状态文本
    getStatusText(status = null) {
      const statusMap = new UTSJSONObject({
        "pending": "待确认",
        "confirmed": "已确认",
        "ongoing": "进行中",
        "completed": "已完成",
        "cancelled": "已取消"
      });
      return statusMap[status] || "未知状态";
    },
    // 跳转到订单详情
    goToOrderDetail(order = null) {
      common_vendor.index.navigateTo({
        url: `/pages/order-detail/order-detail?id=${order.id}`
      });
    },
    // 处理操作按钮点击
    handleAction(action = null, order = null) {
      switch (action.action) {
        case "contact":
          this.contactOwner(order);
          break;
        case "cancel":
          this.cancelOrder(order);
          break;
        case "rate":
          this.rateOrder(order);
          break;
        default:
          common_vendor.index.__f__("log", "at pages/order-list/order-list.uvue:285", "未知操作:", action.action);
      }
    },
    // 联系车主
    contactOwner(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "联系车主",
        content: "是否拨打车主电话？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "13800138000"
            });
          }
        }
      }));
    },
    // 取消订单
    cancelOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认取消",
        content: "确定要取消这个订单吗？取消后费用将原路退回。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({ title: "取消中..." });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              const orderIndex = this.orders.findIndex((o) => {
                return o.id === order.id;
              });
              if (orderIndex !== -1) {
                this.orders[orderIndex].status = "cancelled";
                this.orders[orderIndex].actions = [];
              }
              common_vendor.index.showToast({
                title: "订单已取消",
                icon: "success"
              });
            }, 1500);
          }
        }
      }));
    },
    // 评价订单
    rateOrder(order = null) {
      common_vendor.index.showToast({
        title: "评价功能开发中",
        icon: "none"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: tab.key,
        c: common_vendor.n($data.activeTab === tab.key ? "text-primary border-b-2 border-primary font-medium" : "text-neutral-light"),
        d: common_vendor.o(($event) => $options.switchTab(tab.key), tab.key)
      };
    }),
    b: common_vendor.f($options.filteredOrders, (order, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.orderNo),
        b: common_vendor.t($options.getStatusText(order.status)),
        c: common_vendor.n($options.getStatusClass(order.status)),
        d: order.car.image,
        e: order.car.name,
        f: common_vendor.t(order.car.name),
        g: common_vendor.t(order.serviceDate),
        h: common_vendor.t(order.serviceTime),
        i: common_vendor.t(order.pickupAddress),
        j: common_vendor.t(order.totalAmount),
        k: order.actions && order.actions.length
      }, order.actions && order.actions.length ? {
        l: common_vendor.f(order.actions, (action, k1, i1) => {
          return {
            a: common_vendor.t(action.text),
            b: action.type,
            c: common_vendor.n(action.type === "primary" ? "bg-primary text-white" : "border border-primary text-primary"),
            d: common_vendor.o(($event) => $options.handleAction(action, order), action.type)
          };
        })
      } : {}, {
        m: order.id,
        n: common_vendor.o(($event) => $options.goToOrderDetail(order), order.id)
      });
    }),
    c: $options.filteredOrders.length === 0 && !$data.loading
  }, $options.filteredOrders.length === 0 && !$data.loading ? {
    d: common_vendor.t($options.activeTabName)
  } : {}, {
    e: $data.hasMore && $options.filteredOrders.length > 0
  }, $data.hasMore && $options.filteredOrders.length > 0 ? common_vendor.e({
    f: $data.loading
  }, $data.loading ? {} : {}, {
    g: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  }) : {}, {
    h: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-78b13c72"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order-list/order-list.js.map
