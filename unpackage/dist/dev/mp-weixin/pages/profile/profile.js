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
      // 用户统计 - 完全匹配HTML设计
      userStats: new UTSJSONObject({
        orders: 12,
        favorites: 8,
        coupons: 3
      }),
      // 主要功能菜单 - 完全匹配HTML设计
      menuItems: [
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
          id: "coupons",
          title: "优惠券",
          icon: "fa-ticket",
          badge: "3"
        }),
        new UTSJSONObject({
          id: "wallet",
          title: "我的钱包",
          icon: "fa-credit-card",
          badge: null
        }),
        new UTSJSONObject({
          id: "address",
          title: "地址管理",
          icon: "fa-map-marker",
          badge: null
        })
      ],
      // 服务与支持 - 完全匹配HTML设计
      supportItems: [
        new UTSJSONObject({
          id: "help",
          title: "帮助中心",
          icon: "fa-question-circle"
        }),
        new UTSJSONObject({
          id: "contact",
          title: "联系客服",
          icon: "fa-comment"
        }),
        new UTSJSONObject({
          id: "feedback",
          title: "意见反馈",
          icon: "fa-edit"
        })
      ],
      // 其他设置 - 完全匹配HTML设计
      otherItems: [
        new UTSJSONObject({
          id: "owner",
          title: "成为车主",
          icon: "fa-car"
        }),
        new UTSJSONObject({
          id: "about",
          title: "关于我们",
          icon: "fa-info-circle"
        }),
        new UTSJSONObject({
          id: "settings",
          title: "设置",
          icon: "fa-cog"
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
      common_vendor.index.__f__("log", "at pages/profile/profile.uvue:198", "加载用户信息");
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
    // 处理主菜单点击
    handleMenuClick(item = null) {
      switch (item.id) {
        case "orders":
          this.goToOrderList();
          break;
        case "favorites":
          this.goToFavorites();
          break;
        case "coupons":
          this.goToCoupons();
          break;
        case "wallet":
          common_vendor.index.showToast({ title: "钱包功能开发中", icon: "none" });
          break;
        case "address":
          common_vendor.index.showToast({ title: "地址管理开发中", icon: "none" });
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.uvue:250", "未知菜单项:", item.id);
      }
    },
    // 处理支持菜单点击
    handleSupportClick(item = null) {
      switch (item.id) {
        case "help":
          common_vendor.index.showToast({ title: "帮助中心开发中", icon: "none" });
          break;
        case "contact":
          common_vendor.index.showModal(new UTSJSONObject({
            title: "联系客服",
            content: "客服电话：400-888-8888",
            confirmText: "拨打",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.makePhoneCall({
                  phoneNumber: "400-888-8888"
                });
              }
            }
          }));
          break;
        case "feedback":
          common_vendor.index.showToast({ title: "意见反馈开发中", icon: "none" });
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.uvue:278", "未知支持项:", item.id);
      }
    },
    // 处理其他设置点击
    handleOtherClick(item = null) {
      switch (item.id) {
        case "owner":
          common_vendor.index.showModal(new UTSJSONObject({
            title: "成为车主",
            content: "成为车主可以发布自己的车辆赚取收益，是否前往注册？",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.switchTab({
                  url: "/pages/owner/dashboard"
                });
              }
            }
          }));
          break;
        case "about":
          common_vendor.index.showToast({ title: "关于我们页面开发中", icon: "none" });
          break;
        case "settings":
          this.goToSettings();
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.uvue:305", "未知其他项:", item.id);
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
    f: common_vendor.t($data.userStats.orders),
    g: common_vendor.o((...args) => $options.goToOrderList && $options.goToOrderList(...args)),
    h: common_vendor.t($data.userStats.favorites),
    i: common_vendor.o((...args) => $options.goToFavorites && $options.goToFavorites(...args)),
    j: common_vendor.t($data.userStats.coupons),
    k: common_vendor.o((...args) => $options.goToCoupons && $options.goToCoupons(...args)),
    l: common_vendor.f($data.menuItems, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.n(item.icon),
        b: item.badge
      }, item.badge ? {
        c: common_vendor.t(item.badge)
      } : {}, {
        d: common_vendor.t(item.title),
        e: item.id,
        f: common_vendor.o(($event) => $options.handleMenuClick(item), item.id)
      });
    }),
    m: common_vendor.f($data.supportItems, (item, index, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.title),
        c: item.id,
        d: common_vendor.o(($event) => $options.handleSupportClick(item), item.id)
      };
    }),
    n: common_vendor.f($data.otherItems, (item, index, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.title),
        c: item.id,
        d: common_vendor.o(($event) => $options.handleOtherClick(item), item.id)
      };
    }),
    o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a67938aa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
