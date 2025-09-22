"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      orderId: "",
      // 订单详情数据 - 完全匹配HTML设计
      orderDetail: new UTSJSONObject({
        orderNo: "WC202501151030",
        status: "confirmed",
        totalAmount: 3300,
        createTime: "2025-01-15 10:30",
        serviceDate: "2025-02-14",
        serviceTime: "09:00",
        pickupAddress: "北京市朝阳区三里屯",
        destination: "北京市朝阳区国贸",
        contactPhone: "138****8888",
        remarks: "请准时到达，谢谢",
        car: new UTSJSONObject({
          name: "奔驰S级",
          image: "https://picsum.photos/300/300?random=90"
        }),
        baseAmount: 2800,
        additionalServices: [
          new UTSJSONObject({ id: 1, name: "跟拍服务", price: 500 })
        ],
        owner: new UTSJSONObject({
          name: "张师傅",
          avatar: "https://picsum.photos/100/100?random=91",
          rating: 4.9,
          phone: "138****0000"
        })
      })
    };
  },
  computed: {
    // 订单步骤
    orderSteps() {
      const status = this.orderDetail.status;
      return [
        new UTSJSONObject({
          title: "订单已创建",
          time: this.orderDetail.createTime,
          completed: ["pending", "confirmed", "ongoing", "completed"].includes(status)
        }),
        new UTSJSONObject({
          title: "车主已确认",
          time: status !== "pending" ? "2025-01-15 11:00" : null,
          completed: ["confirmed", "ongoing", "completed"].includes(status)
        }),
        new UTSJSONObject({
          title: "服务进行中",
          time: ["ongoing", "completed"].includes(status) ? "2025-02-14 09:00" : null,
          completed: ["ongoing", "completed"].includes(status)
        }),
        new UTSJSONObject({
          title: "服务已完成",
          time: status === "completed" ? "2025-02-14 13:00" : null,
          completed: status === "completed"
        })
      ];
    }
  },
  onLoad(options) {
    this.orderId = options.id || "WC202501151030";
    this.loadOrderDetail();
  },
  methods: {
    // 加载订单详情
    loadOrderDetail() {
      common_vendor.index.__f__("log", "at pages/order-detail/order-detail.uvue:215", "加载订单详情，ID:", this.orderId);
    },
    // 获取状态背景样式
    getStatusBgClass(status = null) {
      const classMap = new UTSJSONObject({
        "pending": "bg-secondary",
        "confirmed": "bg-primary",
        "ongoing": "bg-blue-500",
        "completed": "bg-success",
        "cancelled": "bg-red-500"
        // 已取消 - 红色
      });
      return classMap[status] || "bg-neutral";
    },
    // 获取状态图标
    getStatusIcon(status = null) {
      const iconMap = new UTSJSONObject({
        "pending": "fa-clock-o",
        "confirmed": "fa-check-circle",
        "ongoing": "fa-car",
        "completed": "fa-check",
        "cancelled": "fa-times-circle"
      });
      return iconMap[status] || "fa-question-circle";
    },
    // 获取状态消息
    getStatusMessage(status = null) {
      const messageMap = new UTSJSONObject({
        "pending": "等待车主确认",
        "confirmed": "车主已确认，请按时到达指定地点",
        "ongoing": "服务进行中，请保持电话畅通",
        "completed": "服务已完成，感谢您的使用",
        "cancelled": "订单已取消"
      });
      return messageMap[status] || "订单状态异常";
    },
    // 联系车主
    contactOwner() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "联系车主",
        content: `是否拨打车主电话：${this.orderDetail.owner.phone}？`,
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
    cancelOrder() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认取消",
        content: "确定要取消这个订单吗？取消后费用将原路退回。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({ title: "取消中..." });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              this.orderDetail.status = "cancelled";
              common_vendor.index.showToast({
                title: "订单已取消",
                icon: "success"
              });
            }, 1500);
          }
        }
      }));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($options.getStatusIcon($data.orderDetail.status)),
    b: common_vendor.t($options.getStatusMessage($data.orderDetail.status)),
    c: common_vendor.n($options.getStatusBgClass($data.orderDetail.status)),
    d: common_vendor.t($data.orderDetail.orderNo),
    e: common_vendor.t($data.orderDetail.totalAmount),
    f: common_vendor.t($data.orderDetail.createTime),
    g: $data.orderDetail.car.image,
    h: $data.orderDetail.car.name,
    i: common_vendor.t($data.orderDetail.car.name),
    j: common_vendor.t($data.orderDetail.serviceDate),
    k: common_vendor.t($data.orderDetail.serviceTime),
    l: common_vendor.t($data.orderDetail.pickupAddress),
    m: common_vendor.t($data.orderDetail.destination),
    n: common_vendor.f($options.orderSteps, (step, index, i0) => {
      return common_vendor.e({
        a: step.completed
      }, step.completed ? {} : {}, {
        b: common_vendor.n(step.completed ? "bg-success" : "bg-gray-200"),
        c: common_vendor.t(step.title),
        d: common_vendor.n(step.completed ? "text-neutral" : "text-neutral-light"),
        e: step.time
      }, step.time ? {
        f: common_vendor.t(step.time)
      } : {}, {
        g: index
      });
    }),
    o: common_vendor.t($data.orderDetail.baseAmount),
    p: common_vendor.f($data.orderDetail.additionalServices, (service, k0, i0) => {
      return {
        a: common_vendor.t(service.name),
        b: common_vendor.t(service.price),
        c: service.id
      };
    }),
    q: common_vendor.t($data.orderDetail.totalAmount),
    r: $data.orderDetail.owner.avatar,
    s: common_vendor.t($data.orderDetail.owner.name),
    t: common_vendor.t($data.orderDetail.owner.rating),
    v: common_vendor.t($data.orderDetail.owner.phone),
    w: common_vendor.o((...args) => $options.contactOwner && $options.contactOwner(...args)),
    x: common_vendor.t($data.orderDetail.contactPhone),
    y: $data.orderDetail.remarks
  }, $data.orderDetail.remarks ? {
    z: common_vendor.t($data.orderDetail.remarks)
  } : {}, {
    A: $data.orderDetail.status === "pending"
  }, $data.orderDetail.status === "pending" ? {
    B: common_vendor.o((...args) => $options.cancelOrder && $options.cancelOrder(...args))
  } : {}, {
    C: common_vendor.n($data.orderDetail.status === "pending" ? "ml-2" : ""),
    D: common_vendor.o((...args) => $options.contactOwner && $options.contactOwner(...args)),
    E: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ace3c844"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order-detail/order-detail.js.map
