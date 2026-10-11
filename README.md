# 西安工学院数学建模协会网站

一个无需构建、可直接由 GitHub Pages 托管的静态网站。

## 页面与资源

- `index.html`：协会介绍、建模路径、实践与加入方式
- `training.html`：培训资料、竞赛真题与论文模板归档
- `faculty.html`：指导教师介绍
- `styles.css`、`motion.js`、`site.js`、`training.js`：全站样式与交互
- `resources/`：网站公开提供下载的本地资料
  - `templates/`：Word 模板和待补充的 MATLAB 模板
  - `ncmc/`、`mathcup/`、`shuwei/`：各赛事的真题与论文分类目录，命名规则见 `resources/README.txt`

## 发布到 GitHub Pages

1. 在 GitHub 创建一个空仓库。
2. 将本文件夹里的**内容**上传到仓库根目录（不要多套一层 `Github上传部署` 文件夹）。
3. 打开仓库 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**，分支选 `main`，目录选 `/(root)`，保存。
5. 等 GitHub Pages 完成发布后，访问页面顶部显示的网址。

本项目使用相对路径，支持 `username.github.io/repository/` 形式的项目站点。

## 更新内容

- 修改首页：编辑 `index.html`。
- 更新指导教师：编辑 `faculty.html`。
- 增加资料：按赛事放入 `resources/<赛事>/problems/` 或 `resources/<赛事>/papers/`，按年份命名文件，再在 `training.html` 增加对应年份下载卡。
- MATLAB 论文模板放入 `resources/templates/matlab/` 后，将待上传按钮改为相对下载链接。
- 新增真题或论文前，请确认文件允许公开下载，并检查文件大小和来源说明。

## 鼠标动效

桌面端指针会扰动全站背景里的函数曲线与数据点。触屏设备不启动连续指针动画；启用系统“减少动态效果”时会关闭动效。网站没有框架或构建依赖。





