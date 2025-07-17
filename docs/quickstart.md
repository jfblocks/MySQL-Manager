# MySQL 图形化管理工具 快速上手教程

## 1. 环境准备
- 操作系统：Windows / macOS / Linux
- Node.js 18 及以上
- MySQL 5.7+/MariaDB 10.2+
- 推荐安装 git

## 2. 克隆项目
```bash
git clone https://github.com/jfblocks/MySQL-Manager.git
cd MySQL-Manager
```

## 3. 安装依赖
```bash
npm install
```

## 4. 启动开发环境
```bash
npm run dev
```
- Electron 窗口会自动弹出
- 前端热更新，后端代码变动需重启

## 5. 打包生产环境
```bash
npm run build
npm run dist
```
- 生成的安装包在 `dist/` 或 `release/` 目录

## 6. 使用说明
- 启动后，先新建数据库连接
- 连接成功后可浏览表结构、编辑数据、执行SQL、备份恢复等
- 详细功能见 docs/user-guide.md

## 7. 常见问题
- **依赖安装失败**：请检查 Node.js 版本，或尝试使用 cnpm/yarn
- **MySQL 连接失败**：请检查主机、端口、用户名、密码、数据库名，确保 MySQL 允许远程连接
- **Electron 启动报错**：请确保依赖安装完整，或尝试删除 node_modules 重新安装
- **安全建议**：生产环境请勿暴露数据库账号密码，建议使用专用低权限账号

## 8. 依赖安全检查
```bash
npm audit fix
```

## 9. 反馈与支持
- GitHub: https://github.com/jfblocks/MySQL-Manager
- 欢迎提交 Issue 和 PR