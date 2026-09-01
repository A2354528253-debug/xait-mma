# 西安工学院数学建模协会网站

## 页面文件

- `index.html`：协会首页
- `training.html`：公开培训资料页

## 样式与交互文件

- `styles.css`：全站基础样式
- `script.js`：首页交互与指导老师信息
- `training.css`：培训资料页基础样式
- `training.js`：培训资料页展开与资料卡逻辑
- `training-cards.css`：竞赛资料卡片样式

其余 CSS 文件用于首页动效、页尾署名、指导老师和加入协会区块的局部样式

## 图片

所有网站图片放在 `assets/images/`

- `association-logo.png`：首页协会手写标识

网页引用图片时使用相对路径，例如：

```html
<img src="assets/images/association-logo.png" alt="数学建模协会手写标识">
```

## 公开下载资料

所有公开下载资料放在 `resources/`

```text
resources/
├── templates/                 论文模板
│   └── 模板.docx
├── ncmc/                      全国大学生数学建模竞赛
│   ├── problems/              历年真题
│   │   ├── CUMCM2025.zip
│   │   ├── CUMCM2024.zip
│   │   ├── CUMCM2023.zip
│   │   ├── CUMCM2022.zip
│   │   ├── CUMCM2021.zip
│   │   └── CUMCM2020.zip
│   └── papers/                优秀论文
├── mathcup/                   华数杯国赛
│   ├── problems/              历年真题
│   └── papers/                优秀论文
└── training/                  其他公开培训资料
```

## 文件命名规则

- 已有真题压缩包保持当前名称，不改名
- 新增全国大学生数学建模竞赛真题建议使用 `CUMCM年份.zip`
- 新增优秀论文建议使用 `CUMCM年份-优秀论文.zip`
- 华数杯资料建议使用 `MathCup年份.zip` 或 `MathCup年份-优秀论文.zip`

## 维护注意事项

- 只使用相对路径，例如 `resources/ncmc/problems/CUMCM2024.zip`
- 不要使用 `C:\Users\...`、`D:\...` 或 `file:///...` 本机绝对路径
- 新增资料后需要在 `training.js` 中为对应年份资料卡增加下载链接
- 公开发布前，请确认资料允许公开转载与下载
