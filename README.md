# 西安工学院数学建模协会网站

一个无需构建、可直接由 GitHub Pages 托管的静态网站。

## 页面与资源

- `index.html`：协会介绍、建模路径、实践与加入方式
- `training.html`：培训资料、竞赛真题与论文模板归档
- `faculty.html`：指导教师介绍
- `styles.css`、`motion.js`、`site.js`、`training.js`：全站样式与交互
- `resources/templates/`：不超过 1MB 的小型资料，如数学建模论文模板
- GitHub Releases：大于 1MB 的历年真题与优秀论文压缩包，命名规则见 `resources/README.txt`

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
- 增加小型资料（不超过 1MB）：放入 `resources/templates/`，在 `training.html` 或 `training.js` 中写入相对路径。
- 增加真题或优秀论文压缩包：先在 GitHub Releases 发布附件，再把 `training.js` 中 `release` 常量与 `files` 映射指向该发行版本。
- 新增资料前，请确认文件允许公开下载，并检查文件大小和来源说明。

## 鼠标动效

桌面端指针会扰动全站背景里的函数曲线与数据点。触屏设备不启动连续指针动画；启用系统“减少动态效果”时会关闭动效。网站没有框架或构建依赖。





