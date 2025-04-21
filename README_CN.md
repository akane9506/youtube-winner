<h1 align="center">YouTube-Winner</h1>
<div align="center">
  <a href="./README.md">[English]</a>
  [中文]
</div>


YouTube-Winner 是一个网页应用，用于从 YouTube 视频评论和点赞中随机抽取获奖者。它提供了用户友好的界面，可用于筛选评论、管理用户池，并进行分级或编号抽奖。

## 功能特色

- **搜索 YouTube 视频**：通过视频的 URL 或 ID 获取评论和点赞信息。
- **筛选评论**：可按日期范围、关键词及去重用户筛选评论。
- **随机抽奖**：支持分级抽奖（金、银、铜）或编号抽奖。
- **多语言支持**：目前支持英文和中文。

## 技术栈

- **前端**：React、TypeScript、TailwindCSS
- **状态管理**：React Context API
- **构建工具**：Vite
- **UI 组件**：HeroUI
- **YouTube API**：通过 YouTube Data API v3 获取评论和视频详情

## 安装步骤

1. 获取仓库：
  ```bash
  git clone https://github.com/akane9506/youtube-winner.git
  cd youtube-draw
  ```

2. 安装依赖：
  ```bash
  npm install
  ```

3. 在项目根目录下创建 `.env` 文件，并添加你的 YouTube API 密钥：
  ```env
  VITE_YOUTUBE_API_KEY=<your_youtube_api_key>
  ```

4. 启动开发服务器：
  ```bash
  npm run dev
  ```

5. 在浏览器中打开 `http://localhost:5173` 访问应用。

## 脚本命令
- `npm run dev`：启动开发服务器。
- `npm run build`：为生产环境构建项目。
- `npm run preview`：预览生产环境构建效果。
- `npm run lint`：运行 ESLint 检查代码问题。

## 项目结构

```plaintext
src/
├── api/                   # 处理与 YouTube 相关的 API 请求
├── components/            # React 组件
│   ├── routes/            # 路由页面组件
│   ├── Header.tsx         # 顶部导航栏组件
│   ├── Main.tsx           # 主体内容组件
├── contexts/              # React Context全局状态管理
├── models/                # 数据模型（如用户、评论、视频等）
├── consts.ts              # 常量和配置信息
├── App.tsx                # 应用主入口组件
├── main.tsx               # 应用启动入口文件
├── index.css              # 全局样式文件
```

## 环境变量

需要以下环境变量：

- `VITE_YOUTUBE_API_KEY`：你的 YouTube Data API v3 密钥。

## 贡献指南

欢迎贡献！请按照以下步骤操作：

1. Fork 本仓库。
2. 为你的功能或修复创建新分支：
  ```bash
  git checkout -b feature-name
  ```
3. 提交更改并推送分支：
  ```bash
  git push origin feature-name
  ```
4. 提交 Pull Request。

## 许可证

本项目采用 [MIT License](LICENSE) 许可证。
