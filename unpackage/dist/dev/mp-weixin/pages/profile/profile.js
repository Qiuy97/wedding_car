"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // 用户信息 - 完全匹配HTML设计
      userInfo: new UTSJSONObject({
        name: "张小明",
        avatar: "https://picsum.photos/100/100?random=80",
        level: "VIP用户",
        phone: "138****8888"
      }),
      // 用户统计 - 三列布局
      userStats: new UTSJSONObject({
        completedOrders: 3,
        favoriteCars: 5,
        myRating: 4.9
      }),
      // 四个快捷操作按钮
      quickActions: [
        new UTSJSONObject({
          id: "orders",
          title: "我的订单",
          icon: "fa-list-alt",
          badge: null
        }),
        new UTSJSONObject({
          id: "favorites",
          title: "我的收藏",
          icon: "fa-heart",
          badge: null
        }),
        new UTSJSONObject({
          id: "cars",
          title: "我的车辆",
          icon: "fa-car",
          badge: null
        }),
        new UTSJSONObject({
          id: "service",
          title: "客服中心",
          icon: "fa-comment",
          badge: null
        })
      ],
      // 垂直菜单列表 - 简洁列表项
      menuList: [
        new UTSJSONObject({
          id: "address",
          title: "地址管理",
          badge: null
        }),
        new UTSJSONObject({
          id: "invoice",
          title: "发票管理",
          badge: null
        }),
        new UTSJSONObject({
          id: "coupons",
          title: "优惠券",
          badge: "3"
        }),
        new UTSJSONObject({
          id: "payment",
          title: "支付方式",
          badge: null
        }),
        new UTSJSONObject({
          id: "about",
          title: "关于我们",
          badge: null
        }),
        new UTSJSONObject({
          id: "agreement",
          title: "服务协议",
          badge: null
        }),
        new UTSJSONObject({
          id: "help",
          title: "帮助中心",
          badge: null
        })
      ]
    };
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      common_vendor.index.__f__("log", "at pages/profile/profile.uvue:180", "加载用户信息");
    },
    // 跳转到设置页面
    goToSettings() {
      common_vendor.index.showToast({
        title: "设置页面开发中",
        icon: "none"
      });
    },
    // 跳转到订单列表
    goToOrderList() {
      common_vendor.index.navigateTo({
        url: "/pages/order-list/order-list"
      });
    },
    // 跳转到收藏页面
    goToFavorites() {
      common_vendor.index.navigateTo({
        url: "/pages/favorites/favorites"
      });
    },
    // 跳转到优惠券页面
    goToCoupons() {
      common_vendor.index.showToast({
        title: "优惠券页面开发中",
        icon: "none"
      });
    },
    // 显示评分详情
    showRating() {
      common_vendor.index.showToast({
        title: "评分详情功能开发中",
        icon: "none"
      });
    },
    // 处理快捷操作按钮点击
    handleQuickAction(item = null) {
      switch (item.id) {
        case "orders":
          this.goToOrderList();
          break;
        case "favorites":
          this.goToFavorites();
          break;
        case "cars":
          common_vendor.index.showToast({ title: "我的车辆功能开发中", icon: "none" });
          break;
        case "service":
          common_vendor.index.showToast({ title: "客服中心功能开发中", icon: "none" });
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.uvue:237", "未知快捷操作:", item.id);
      }
    },
    // 处理菜单列表点击
    handleMenuClick(item = null) {
      switch (item.id) {
        case "address":
          common_vendor.index.showToast({ title: "地址管理功能开发中", icon: "none" });
          break;
        case "invoice":
          common_vendor.index.showToast({ title: "发票管理功能开发中", icon: "none" });
          break;
        case "coupons":
          this.goToCoupons();
          break;
        case "payment":
          common_vendor.index.showToast({ title: "支付方式功能开发中", icon: "none" });
          break;
        case "about":
          common_vendor.index.showToast({ title: "关于我们功能开发中", icon: "none" });
          break;
        case "agreement":
          common_vendor.index.showToast({ title: "服务协议功能开发中", icon: "none" });
          break;
        case "help":
          common_vendor.index.showToast({ title: "帮助中心功能开发中", icon: "none" });
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.uvue:266", "未知菜单项:", item.id);
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.t($data.userInfo.name),
    c: common_vendor.t($data.userInfo.level),
    d: common_vendor.t($data.userInfo.phone),
    e: common_vendor.o((...args) => $options.goToSettings && $options.goToSettings(...args)),
    f: common_vendor.t($data.userStats.completedOrders),
    g: common_vendor.o((...args) => $options.goToOrderList && $options.goToOrderList(...args)),
    h: common_vendor.t($data.userStats.favoriteCars),
    i: common_vendor.o((...args) => $options.goToFavorites && $options.goToFavorites(...args)),
    j: common_vendor.t($data.userStats.myRating),
    k: common_vendor.o((...args) => $options.showRating && $options.showRating(...args)),
    l: common_vendor.f($data.quickActions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.n(item.icon),
        b: item.badge
      }, item.badge ? {
        c: common_vendor.t(item.badge)
      } : {}, {
        d: common_vendor.t(item.title),
        e: item.id,
        f: common_vendor.o(($event) => $options.handleQuickAction(item), item.id)
      });
    }),
    m: common_vendor.f($data.menuList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.title),
        b: item.badge
      }, item.badge ? {
        c: common_vendor.t(item.badge)
      } : {}, {
        d: item.id,
        e: common_vendor.n(index < $data.menuList.length - 1 ? "border-b border-gray-200" : ""),
        f: common_vendor.o(($event) => $options.handleMenuClick(item), item.id)
      });
    }),
    n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a67938aa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
