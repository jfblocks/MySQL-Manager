# MySQL图形化界面管理工具

一个基于Node.js和Electron的现代化MySQL数据库管理工具，提供直观的图形界面来管理MySQL数据库。

## 功能特性

### 核心功能
- 🔌 **数据库连接管理**
  - 支持连接远程MySQL数据库
  - 保存和管理多个数据库连接配置
  - 连接状态实时监控
  - 支持SSH隧道连接

- 📝 **SQL查询执行**
  - 多标签页SQL编辑器
  - 语法高亮和自动补全
  - 查询结果表格展示
  - 查询执行时间统计
  - 查询历史记录

- 🗂️ **数据库结构管理**
  - 数据库、表、视图、存储过程树形展示
  - 表结构查看和编辑
  - 索引管理
  - 外键关系可视化

- 📊 **数据操作**
  - 表格数据查看和编辑
  - 数据导入导出（CSV, JSON, SQL）
  - 分页浏览大数据集
  - 数据筛选和排序

- 🔧 **高级功能**
  - 数据库备份和恢复
  - 用户权限管理
  - 性能监控
  - 查询优化建议

## 技术架构

### 前端技术栈
- **Electron**: 跨平台桌面应用框架
- **React**: 用户界面组件库
- **TypeScript**: 类型安全的JavaScript
- **Ant Design**: UI组件库
- **Monaco Editor**: 代码编辑器（VS Code核心）
- **React Query**: 数据获取和缓存

### 后端技术栈
- **Node.js**: 运行时环境
- **MySQL2**: MySQL数据库驱动
- **Express**: Web服务器框架
- **TypeORM**: 对象关系映射
- **Joi**: 数据验证

### 项目结构
```
mysql-gui-manager/
├── src/
│   ├── main/                 # Electron主进程
│   │   ├── index.ts         # 主进程入口
│   │   └── database.ts      # 数据库连接管理
│   ├── renderer/            # Electron渲染进程
│   │   ├── components/      # React组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义Hooks
│   │   ├── services/       # API服务
│   │   ├── types/          # TypeScript类型定义
│   │   └── utils/          # 工具函数
│   └── shared/             # 共享代码
├── public/                 # 静态资源
├── dist/                   # 构建输出
└── package.json
```

## 安装和运行

### 环境要求
- Node.js 18npm 或 yarn
- MySQL 50.7 或 MariaDB 10.2

### 安装步骤
```bash
# 克隆项目
git clone <repository-url>
cd mysql-gui-manager

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build
```

## 使用说明

### 连接数据库1. 点击"新建连接按钮
2. 填写数据库连接信息：
   - 主机地址
   - 端口号（默认336）
   - 用户名和密码
   - 数据库名称3. 点击测试连接验证4 保存连接配置

### 执行SQL查询
1. 在SQL编辑器中输入查询语句
2. 使用快捷键 `Ctrl+Enter` 执行查询
3 查看结果表格和统计信息4 使用导出功能保存结果

### 管理表结构1. 在左侧导航树中选择表
2. 查看表结构、索引、外键等信息
3. 使用可视化界面编辑表结构
4 预览和执行DDL语句

## 开发计划

### 第一阶段 (MVP)
-x] 项目架构设计
-  ] 基础UI框架搭建
- ] 数据库连接功能
-  ] 简单SQL查询执行

### 第二阶段
- ] 表结构管理
- ] 数据编辑功能
- ] 查询结果优化

### 第三阶段
- ] 高级功能实现
- [ ] 性能优化
- ] 用户体验改进

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License