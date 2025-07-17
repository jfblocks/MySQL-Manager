# MySQL 图形化管理工具 API 文档

本文件详细说明前端与主进程（Node.js）之间的所有 IPC API。

---

## 1. 数据库连接
### connect-database
- 描述：测试数据库连接
- 参数：
  - config: { host, port, user, password, database }
- 返回：{ success: boolean, message?: string }

---

## 2. SQL 查询
### execute-query
- 描述：执行任意 SQL 语句
- 参数：
  - config: 数据库连接配置
  - sql: string
- 返回：{ success: boolean, rows?: any[], fields?: any[], message?: string }

---

## 3. 表结构管理
### get-tables
- 描述：获取所有表名
- 参数：
  - config: 数据库连接配置
- 返回：{ success: boolean, tables?: string[], message?: string }

### get-table-schema
- 描述：获取表结构和索引
- 参数：
  - config: 数据库连接配置
  - table: string
- 返回：{ success: boolean, columns?: any[], indexes?: any[], message?: string }

---

## 4. 表数据操作
### get-table-data
- 描述：分页获取表数据
- 参数：
  - config: 数据库连接配置
  - table: string
  - page: number
  - pageSize: number
- 返回：{ success: boolean, rows?: any[], total?: number, message?: string }

### update-table-row
- 描述：更新表中一行数据
- 参数：
  - config: 数据库连接配置
  - table: string
  - pk: 主键对象，如 { id: 1 }
  - data: 要更新的字段对象
- 返回：{ success: boolean, message?: string }

### delete-table-row
- 描述：删除表中一行数据
- 参数：
  - config: 数据库连接配置
  - table: string
  - pk: 主键对象
- 返回：{ success: boolean, message?: string }

### insert-table-row
- 描述：插入新行
- 参数：
  - config: 数据库连接配置
  - table: string
  - data: 字段对象
- 返回：{ success: boolean, message?: string }

---

## 5. 表结构变更
### create-table
- 描述：新建表
- 参数：
  - config: 数据库连接配置
  - table: string
  - columns: 字段数组 [{ name, type, nullable, extra }]
- 返回：{ success: boolean, message?: string }

### drop-table
- 描述：删除表
- 参数：
  - config: 数据库连接配置
  - table: string
- 返回：{ success: boolean, message?: string }

---

## 6. 高级功能（预留）
### backup-database
- 描述：导出当前数据库为SQL文件
- 参数：
  - config: 数据库连接配置
- 返回：{ success: boolean, filePath?: string, message?: string }

### restore-database
- 描述：导入SQL文件恢复数据库
- 参数：
  - config: 数据库连接配置
  - filePath: string
- 返回：{ success: boolean, message?: string }

### list-users
- 描述：获取所有数据库用户
- 参数：
  - config: 数据库连接配置
- 返回：{ success: boolean, users?: any[], message?: string }

### set-user-privileges
- 描述：设置用户权限
- 参数：
  - config: 数据库连接配置
  - user: string
  - privileges: string[]
- 返回：{ success: boolean, message?: string }

### get-performance-stats
- 描述：获取数据库性能统计
- 参数：
  - config: 数据库连接配置
- 返回：{ success: boolean, stats?: any, message?: string }