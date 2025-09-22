"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/search/search.js";
  "./pages/car-detail/car-detail.js";
  "./pages/booking/booking.js";
  "./pages/payment/payment.js";
  "./pages/order-success/order-success.js";
  "./pages/order-detail/order-detail.js";
  "./pages/order-list/order-list.js";
  "./pages/profile/profile.js";
  "./pages/favorites/favorites.js";
  "./pages/owner/dashboard.js";
  "./pages/owner/car-manage.js";
  "./pages/owner/car-add.js";
  "./pages/owner/order-manage.js";
}
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.uvue:7", "App Launch");
    this.loadFontAwesome();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.uvue:12", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.uvue:15", "App Hide");
  },
  onExit: function() {
    common_vendor.index.__f__("log", "at App.uvue:36", "App Exit");
  },
  methods: new UTSJSONObject({
    loadFontAwesome() {
      common_vendor.index.__f__("log", "at App.uvue:41", "Loading Font Awesome icons...");
    }
  })
}));
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
