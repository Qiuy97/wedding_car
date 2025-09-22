"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      activeTab: "pending",
      orderList: [],
      loading: false,
      hasMore: true,
      page: 1,
      pendingCount: 3
    };
  },
  onLoad() {
    this.loadOrderList();
  },
  onShow() {
    this.refreshOrderList();
  },
  methods: {
    switchTab(tab = null) {
      this.activeTab = tab;
      this.refreshOrderList();
    },
    loadOrderList(refresh = false) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (this.loading)
          return Promise.resolve(null);
        this.loading = true;
        if (refresh) {
          this.page = 1;
          this.orderList = [];
        }
        try {
          const mockOrders = [
            new UTSJSONObject({
              _id: "ORDER20250101001",
              car: new UTSJSONObject({
                brand: "劳斯莱斯",
                model: "幻影",
                images: ["/static/cars/rolls1.jpg"]
              }),
              user: new UTSJSONObject({
                nickname: "张小明"
              }),
              service_date: "2025-02-14",
              service_time: "09:00",
              pickup_location: "北京市朝阳区三里屯",
              total_amount: 4e3,
              owner_amount: 3800,
              status: 1,
              create_time: "2025-01-15T10:30:00.000Z"
            }),
            new UTSJSONObject({
              _id: "ORDER20250101002",
              car: new UTSJSONObject({
                brand: "奔驰",
                model: "S级",
                images: ["/static/cars/benz1.jpg"]
              }),
              user: new UTSJSONObject({
                nickname: "李小红"
              }),
              service_date: "2025-01-25",
              service_time: "14:00",
              pickup_location: "北京市海淀区中关村",
              total_amount: 2400,
              owner_amount: 2280,
              status: 2,
              create_time: "2025-01-10T14:20:00.000Z"
            })
          ];
          let filteredOrders = mockOrders;
          if (this.activeTab !== "all") {
            const statusMap = new UTSJSONObject({
              "pending": 1,
              "confirmed": 2,
              "ongoing": 3,
              "completed": 4
            });
            filteredOrders = mockOrders.filter((order) => {
              return order.status === statusMap[this.activeTab];
            });
          }
          if (refresh) {
            this.orderList = filteredOrders;
          } else {
            this.orderList = [...this.orderList, ...filteredOrders];
          }
          this.hasMore = filteredOrders.length === 10;
          this.page++;
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/owner/order-manage.uvue:202", "加载订单列表失败:", error);
          common_vendor.index.showToast({
            title: "加载失败",
            icon: "none"
          });
        }
        this.loading = false;
      });
    },
    refreshOrderList() {
      this.loadOrderList(true);
    },
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.loadOrderList();
      }
    },
    getStatusClass(status = null) {
      const classMap = new UTSJSONObject({
        1: "pending",
        2: "confirmed",
        3: "ongoing",
        4: "completed",
        5: "cancelled"
      });
      return classMap[status] || "";
    },
    getStatusText(status = null) {
      const textMap = new UTSJSONObject({
        1: "待确认",
        2: "已确认",
        3: "进行中",
        4: "已完成",
        5: "已取消"
      });
      return textMap[status] || "";
    },
    goToOrderDetail(order = null) {
      common_vendor.index.navigateTo({
        url: `/pages/order-detail/order-detail?id=${order._id}`
      });
    },
    contactCustomer(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "联系客户",
        content: "是否拨打客户电话？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "13800138001"
            });
          }
        }
      }));
    },
    confirmOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认接单",
        content: "确定要接受这个订单吗？",
        success: (res) => {
          if (res.confirm) {
            order.status = 2;
            this.pendingCount = Math.max(0, this.pendingCount - 1);
            common_vendor.index.showToast({
              title: "已确认接单",
              icon: "success"
            });
          }
        }
      }));
    },
    rejectOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "拒绝订单",
        content: "确定要拒绝这个订单吗？",
        success: (res) => {
          if (res.confirm) {
            const index = this.orderList.findIndex((item) => {
              return item._id === order._id;
            });
            if (index > -1) {
              this.orderList.splice(index, 1);
            }
            this.pendingCount = Math.max(0, this.pendingCount - 1);
            common_vendor.index.showToast({
              title: "已拒绝订单",
              icon: "success"
            });
          }
        }
      }));
    },
    startService(order = null) {
      order.status = 3;
      common_vendor.index.showToast({
        title: "服务已开始",
        icon: "success"
      });
    },
    completeService(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "完成服务",
        content: "确定服务已完成吗？完成后将等待客户确认。",
        success: (res) => {
          if (res.confirm) {
            order.status = 4;
            common_vendor.index.showToast({
              title: "服务已完成",
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
    a: $data.activeTab === "all" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("all")),
    c: $data.pendingCount > 0
  }, $data.pendingCount > 0 ? {
    d: common_vendor.t($data.pendingCount)
  } : {}, {
    e: $data.activeTab === "pending" ? 1 : "",
    f: common_vendor.o(($event) => $options.switchTab("pending")),
    g: $data.activeTab === "confirmed" ? 1 : "",
    h: common_vendor.o(($event) => $options.switchTab("confirmed")),
    i: $data.activeTab === "ongoing" ? 1 : "",
    j: common_vendor.o(($event) => $options.switchTab("ongoing")),
    k: $data.activeTab === "completed" ? 1 : "",
    l: common_vendor.o(($event) => $options.switchTab("completed")),
    m: common_vendor.f($data.orderList, (order, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order._id),
        b: common_vendor.t($options.getStatusText(order.status)),
        c: common_vendor.n($options.getStatusClass(order.status)),
        d: order.car.images[0],
        e: common_vendor.t(order.car.brand),
        f: common_vendor.t(order.car.model),
        g: common_vendor.t(order.user.nickname),
        h: common_vendor.t(order.service_date),
        i: common_vendor.t(order.service_time),
        j: common_vendor.t(order.pickup_location),
        k: common_vendor.t(order.owner_amount || order.total_amount),
        l: order.status !== 4 && order.status !== 5
      }, order.status !== 4 && order.status !== 5 ? common_vendor.e({
        m: common_vendor.o(($event) => $options.contactCustomer(order), order._id),
        n: order.status === 1
      }, order.status === 1 ? {
        o: common_vendor.o(($event) => $options.rejectOrder(order), order._id)
      } : {}, {
        p: order.status === 1
      }, order.status === 1 ? {
        q: common_vendor.o(($event) => $options.confirmOrder(order), order._id)
      } : {}, {
        r: order.status === 2
      }, order.status === 2 ? {
        s: common_vendor.o(($event) => $options.startService(order), order._id)
      } : {}, {
        t: order.status === 3
      }, order.status === 3 ? {
        v: common_vendor.o(($event) => $options.completeService(order), order._id)
      } : {}) : {}, {
        w: order._id,
        x: common_vendor.o(($event) => $options.goToOrderDetail(order), order._id)
      });
    }),
    n: $data.orderList.length === 0 && !$data.loading
  }, $data.orderList.length === 0 && !$data.loading ? {} : {}, {
    o: $data.hasMore
  }, $data.hasMore ? common_vendor.e({
    p: $data.loading
  }, $data.loading ? {} : {
    q: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  }) : {}, {
    r: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-936c3774"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/owner/order-manage.js.map
