"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      carId: "",
      // 车辆详情数据 - 完全匹配HTML设计
      carDetail: new UTSJSONObject({
        _id: "car001",
        name: "奔驰S级",
        images: [
          "https://picsum.photos/600/400?random=30",
          "https://picsum.photos/600/400?random=31",
          "https://picsum.photos/600/400?random=32"
        ],
        imageAlts: ["奔驰S级婚车正面", "奔驰S级婚车侧面", "奔驰S级婚车内饰"],
        rating: 4.9,
        reviewCount: 128,
        price: 2800,
        color: "黑色",
        seats: 5,
        transmission: "自动",
        mileage: "2.5万km",
        description: "这是一辆精心保养的奔驰S级婚车，外观大气优雅，内饰豪华舒适。车辆配备专业司机，确保您的婚礼当天安全舒适。我们提供全套婚车装饰服务，让您的婚礼更加完美难忘。",
        isFavorite: false
      }),
      // 服务详情 - 完全匹配HTML设计
      serviceDetails: [
        new UTSJSONObject({ name: "司机服务", value: "包含" }),
        new UTSJSONObject({ name: "婚车装饰", value: "包含" }),
        new UTSJSONObject({ name: "油费过路费", value: "包含" }),
        new UTSJSONObject({ name: "保险", value: "全险" }),
        new UTSJSONObject({ name: "服务时间", value: "8小时" }),
        new UTSJSONObject({ name: "超时费用", value: "50元/小时" })
      ],
      // 车主信息 - 完全匹配HTML设计
      ownerInfo: new UTSJSONObject({
        _id: "owner001",
        name: "张师傅",
        avatar: "https://picsum.photos/100/100?random=40",
        badge: "金牌车主",
        rating: 4.9,
        orderCount: 256
      }),
      // 用户评价 - 完全匹配HTML设计
      reviews: [
        new UTSJSONObject({
          _id: "review001",
          user: new UTSJSONObject({
            name: "李**",
            avatar: "https://picsum.photos/50/50?random=50"
          }),
          rating: 5,
          date: "1周前",
          comment: "车子很新很干净，师傅很专业，服务态度非常好，婚礼当天很顺利，强烈推荐！",
          images: ["https://picsum.photos/200/200?random=60"]
        }),
        new UTSJSONObject({
          _id: "review002",
          user: new UTSJSONObject({
            name: "王**",
            avatar: "https://picsum.photos/50/50?random=51"
          }),
          rating: 5,
          date: "2周前",
          comment: "奔驰S级就是不一样，很有面子，装饰也很漂亮，非常满意！",
          images: []
        })
      ]
    };
  },
  onLoad(options) {
    this.carId = options.id || "car001";
    this.loadCarDetail();
  },
  methods: {
    // 加载车辆详情
    loadCarDetail() {
      common_vendor.index.__f__("log", "at pages/car-detail/car-detail.uvue:260", "加载车辆详情，ID:", this.carId);
    },
    // 切换收藏状态
    toggleFavorite() {
      this.carDetail.isFavorite = !this.carDetail.isFavorite;
      common_vendor.index.showToast({
        title: this.carDetail.isFavorite ? "已收藏" : "已取消收藏",
        icon: "none"
      });
    },
    // 联系车主
    contactOwner() {
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
    // 跳转到预订页面
    goToBooking() {
      common_vendor.index.navigateTo({
        url: `/pages/booking/booking?carId=${this.carId}&carName=${this.carDetail.name}&price=${this.carDetail.price}`
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.carDetail.images, (image, index, i0) => {
      return {
        a: image,
        b: $data.carDetail.imageAlts[index],
        c: index
      };
    }),
    b: common_vendor.n($data.carDetail.isFavorite ? "fa-heart" : "fa-heart-o"),
    c: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args)),
    d: common_vendor.t($data.carDetail.name),
    e: common_vendor.t($data.carDetail.rating),
    f: common_vendor.t($data.carDetail.reviewCount),
    g: common_vendor.t($data.carDetail.price),
    h: common_vendor.t($data.carDetail.color),
    i: common_vendor.t($data.carDetail.seats),
    j: common_vendor.t($data.carDetail.transmission),
    k: common_vendor.t($data.carDetail.mileage),
    l: common_vendor.f($data.serviceDetails, (service, k0, i0) => {
      return {
        a: common_vendor.t(service.name),
        b: common_vendor.t(service.value),
        c: service.name
      };
    }),
    m: $data.ownerInfo.avatar,
    n: common_vendor.t($data.ownerInfo.name),
    o: common_vendor.t($data.ownerInfo.badge),
    p: common_vendor.t($data.ownerInfo.rating),
    q: common_vendor.t($data.ownerInfo.orderCount),
    r: common_vendor.o((...args) => $options.contactOwner && $options.contactOwner(...args)),
    s: common_vendor.t($data.carDetail.description),
    t: common_vendor.t($data.reviews.length),
    v: common_vendor.f($data.reviews, (review, k0, i0) => {
      return common_vendor.e({
        a: review.user.avatar,
        b: review.user.name,
        c: common_vendor.t(review.user.name),
        d: common_vendor.f(5, (i, k1, i1) => {
          return {
            a: i,
            b: common_vendor.n(i <= review.rating ? "fa-star text-secondary" : "fa-star-o text-secondary")
          };
        }),
        e: common_vendor.t(review.date),
        f: common_vendor.t(review.comment),
        g: review.images && review.images.length
      }, review.images && review.images.length ? {
        h: common_vendor.f(review.images, (img, k1, i1) => {
          return {
            a: img,
            b: img
          };
        })
      } : {}, {
        i: review._id
      });
    }),
    w: common_vendor.o((...args) => $options.contactOwner && $options.contactOwner(...args)),
    x: common_vendor.o((...args) => $options.goToBooking && $options.goToBooking(...args)),
    y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6c370d69"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/car-detail/car-detail.js.map
