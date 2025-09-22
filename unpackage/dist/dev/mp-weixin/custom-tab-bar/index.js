Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "",
        selectedIconPath: ""
      },
      {
        pagePath: "/pages/search/search",
        text: "车辆",
        iconPath: "",
        selectedIconPath: ""
      },
      {
        pagePath: "/pages/owner/dashboard",
        text: "车主",
        iconPath: "",
        selectedIconPath: ""
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconPath: "",
        selectedIconPath: ""
      }
    ]
  },
  
  attached() {
    // 获取当前页面栈
    const pages = getCurrentPages();
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      const route = currentPage.route;
      
      // 根据当前路由设置选中项
      this.data.list.forEach((item, index) => {
        if (item.pagePath.includes(route)) {
          this.setData({ selected: index });
        }
      });
    }
  },
  
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const url = this.data.list[index].pagePath;
      
      this.setData({ selected: index });
      
      wx.switchTab({
        url: url
      });
    }
  }
});
