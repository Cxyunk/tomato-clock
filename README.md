<p align="center">
  <img src="tomato.ico" width="80" height="80" alt="番茄钟">
</p>

<h1 align="center">🍅 番茄钟</h1>

<p align="center">
  <em>简洁优雅的番茄工作法计时器，帮你高效管理专注时间</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license">
  <img src="https://img.shields.io/badge/零_npm_依赖-native-brightgreen" alt="zero deps">
</p>

---

## ✨ 功能特性

- **📝 任务管理** — 创建、删除任务，每个任务自动分配独特色彩标识
- **⏱ 专注计时** — 精确到秒的计时器，支持全屏模式沉浸式专注
- **📊 今日记录** — 环形图直观展示当日各任务时间分布，带图例和百分比
- **📅 日历统计** — 月视图日历，点击日期查看任意一天详情，有记录的日期标注红点
- **📋 月任务统计** — 本月各任务耗时排行，彩色进度条一目了然
- **📈 学习趋势** — 折线图展示本月每日学习时长变化，标注"今天"参考线
- **🎡 任务滚轮** — 鼠标滚轮切换要查看的任务，折线图联动过滤；点击锁定/解锁
- **💾 自动持久化** — JSON 文件存储，关闭浏览器自动保存，重启数据不丢失
- **🔌 智能启停** — 打开浏览器自动启动，关闭浏览器 30 秒后服务自动停止

## 🚀 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/Cxyunk/tomato-clock.git
cd tomato-clock

# 2. 启动服务
node server.js

# 3. 打开浏览器访问
# http://localhost:3456
```

或者直接双击 `start.bat` 一键启动。

## 🖥 创建桌面快捷方式

```powershell
powershell -ExecutionPolicy Bypass -File create-shortcut.ps1
```

桌面上会生成一个带 🍅 图标的快捷方式，双击即可启动。

## 📁 项目结构

```
tomato-clock/
├── index.html              # 前端页面（单文件，含 CSS + JS）
├── server.js               # Node.js 后端（API + 静态文件服务）
├── start.bat               # Windows 一键启动脚本
├── create-shortcut.ps1     # 桌面快捷方式生成脚本
├── tomato.ico              # 番茄图标
├── bg.jpg                  # 背景图片
├── data/                   # 数据存储目录（自动创建）
│   └── tasks.json          # 任务与计时记录
└── README.md
```

## 🎨 界面布局

| 区域 | 模块 | 说明 |
|------|------|------|
| 左侧 | 任务列表 | 创建/删除任务，点击开始计时 |
| 左侧 | 计时器 | 精确计时 + 全屏模式 |
| 左侧 | 今日记录 | 环形图 + 记录列表 |
| 右侧 | 日历统计 | 月历 + 日详情 + 月统计 + 任务排行 |
| 右侧 | 学习趋势 | 折线图 + 任务滚轮联动过滤 |

## 🎡 任务滚轮

- **🖱 滚轮切换** — 鼠标滚轮滚动，折线图同步切换显示对应任务的趋势
- **🔒 点击锁定** — 锁定后滚轮不再响应，折线图固定在当前任务
- **统一单圆设计** — 外环刻度 + 彩色任务圆点在环带上旋转，中心显示当前任务名

## 🛠 技术栈

- **前端**：原生 HTML + CSS + JavaScript，零框架零依赖
- **后端**：Node.js 原生 `http` 模块，零 npm 依赖
- **存储**：本地 JSON 文件
- **图表**：手写 SVG（环形图、折线图、滚轮），无第三方图表库

## 📄 License

MIT © 2026
