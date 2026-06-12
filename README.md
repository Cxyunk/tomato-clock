<p align="center">
  <img src="tomato.ico" width="80" height="80" alt="番茄钟">
</p>

<h1 align="center">🍅 番茄钟</h1>

<p align="center">
  <em>一个简洁优雅的番茄工作法计时器，帮你高效管理专注时间</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license">
  <img src="https://img.shields.io/badge/纯前端-零依赖-brightgreen" alt="zero deps">
</p>

---

## ✨ 功能特性

- **📝 任务管理** — 创建、删除任务，每个任务自动分配独特颜色标识
- **⏱ 专注计时** — 精确到秒的计时器，支持全屏模式沉浸式专注
- **📊 今日记录** — 环形图直观展示当日各任务时间分布，带图例和百分比
- **📅 日历统计** — 月视图日历，点击日期查看任意一天记录
- **📋 月任务统计** — 本月各任务耗时排行，彩色进度条一目了然
- **💾 自动持久化** — JSON 文件存储，关闭浏览器自动保存，重启数据不丢失
- **🔌 智能启停** — 打开浏览器自动启动，关闭浏览器 30 秒后服务自动停止
- **🖥 桌面快捷方式** — 一键生成带番茄图标的桌面快捷方式

## 🚀 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/你的用户名/tomato-clock.git
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
├── server.js               # Node.js 后端（API + 静态服务）
├── start.bat               # Windows 一键启动脚本
├── create-shortcut.ps1     # 桌面快捷方式生成脚本
├── tomato.ico              # 番茄图标
├── data/                   # 数据存储目录（自动创建）
│   └── tasks.json          # 任务与计时记录
└── README.md
```

## 🎨 界面预览

| 模块 | 说明 |
|------|------|
| **左侧面板** | 任务列表 + 计时器 + 今日环形图 |
| **右侧面板** | 月历视图 + 日详情 + 月统计 + 任务耗时排行 |

- 计时中的任务会在列表中高亮显示，带有呼吸动画
- 环形图每段弧线颜色与对应任务颜色一致
- 月统计中的进度条颜色同样与任务颜色保持一致
- 有记录的日期会在日历上显示小红点标记

## 🛠 技术栈

- **前端**：原生 HTML + CSS + JavaScript，零框架零依赖
- **后端**：Node.js 原生 `http` 模块，零 npm 依赖
- **存储**：本地 JSON 文件
- **图标**：PowerShell 动态生成 `.ico` 文件

## 📄 License

MIT © 2026
