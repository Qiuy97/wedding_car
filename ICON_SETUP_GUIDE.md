# TabBar 图标设置指南

## 问题说明
项目当前已临时移除 tabBar 图标配置以确保正常运行。如需添加图标，请按以下步骤操作。

## 解决方案

### 方案1：添加图标文件（推荐）

1. **准备图标文件**
   - 创建 8 个 PNG 图标文件
   - 尺寸：建议 64x64px 或 72x72px
   - 背景：透明
   - 风格：简洁的线性图标

2. **图标文件列表**
   ```
   static/tabbar/home.png         - 首页（未选中）
   static/tabbar/home-active.png  - 首页（选中）
   static/tabbar/search.png       - 搜索（未选中）
   static/tabbar/search-active.png - 搜索（选中）
   static/tabbar/order.png        - 订单（未选中）
   static/tabbar/order-active.png  - 订单（选中）
   static/tabbar/profile.png      - 个人中心（未选中）
   static/tabbar/profile-active.png - 个人中心（选中）
   ```

3. **将图标文件放入目录**
   - 将准备好的图标文件放入 `static/tabbar/` 目录

4. **恢复图标配置**
   在 `pages.json` 中将 tabBar 配置修改为：
   ```json
   "tabBar": {
     "color": "#7F8C8D",
     "selectedColor": "#B76E79", 
     "backgroundColor": "#ffffff",
     "borderStyle": "white",
     "list": [
       {
         "pagePath": "pages/index/index",
         "iconPath": "static/tabbar/home.png",
         "selectedIconPath": "static/tabbar/home-active.png",
         "text": "首页"
       },
       {
         "pagePath": "pages/search/search",
         "iconPath": "static/tabbar/search.png", 
         "selectedIconPath": "static/tabbar/search-active.png",
         "text": "搜索"
       },
       {
         "pagePath": "pages/order-list/order-list",
         "iconPath": "static/tabbar/order.png",
         "selectedIconPath": "static/tabbar/order-active.png", 
         "text": "订单"
       },
       {
         "pagePath": "pages/profile/profile",
         "iconPath": "static/tabbar/profile.png",
         "selectedIconPath": "static/tabbar/profile-active.png",
         "text": "我的"
       }
     ]
   }
   ```

### 方案2：使用字体图标（简单）

如果暂时没有图标文件，可以继续使用当前的纯文字 tabBar 配置，项目功能完全正常。

## 图标设计建议

### 颜色规范
- **未选中态**：`#7F8C8D`（浅灰色）
- **选中态**：`#B76E79`（主题红色）

### 图标风格
- 简洁的线性图标
- 2px 描边粗细
- 圆角处理
- 与婚车主题相符

### 具体图标建议
- **首页**：房子/主页图标
- **搜索**：放大镜图标  
- **订单**：文档/列表图标
- **个人中心**：用户/人像图标

## 在线图标资源

### 免费图标网站
- **Iconfont**：https://www.iconfont.cn/
- **Flaticon**：https://www.flaticon.com/
- **Feather Icons**：https://feathericons.com/
- **Heroicons**：https://heroicons.com/

### 图标制作工具
- **Figma**：免费设计工具
- **Sketch**：Mac 设计工具
- **Adobe Illustrator**：专业矢量图标制作

## 当前状态

✅ **项目可正常运行**：已移除图标配置，使用纯文字 tabBar
⏳ **待完善**：添加图标文件以获得更好的视觉效果

---

**注意**：当前配置下项目完全可用，图标是可选的视觉优化项。
