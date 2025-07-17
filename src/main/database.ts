import mysql from 'mysql2/promise';
import fs from 'fs';
import { exec } from 'child_process';

function isSafeName(name: string) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export async function connectToDatabase(config: any) {
  const connection = await mysql.createConnection(config);
  await connection.ping();
  await connection.end();
  return true;
}

export async function executeQuery(config: any, sql: string) {
  // 高级功能，建议仅限受信用户
  const connection = await mysql.createConnection(config);
  try {
    const [rows, fields] = await connection.query(sql);
    return { rows, fields };
  } finally {
    await connection.end();
  }
}

export async function getTables(config: any) {
  const connection = await mysql.createConnection(config);
  try {
    const [rows] = await connection.query('SHOW TABLES');
    const tableKey = Object.keys(rows[0] || {}).find(k => k.toLowerCase().includes('table'));
    return rows.map((row: any) => row[tableKey]);
  } finally {
    await connection.end();
  }
}

export async function getTableSchema(config: any, table: string) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const connection = await mysql.createConnection(config);
  try {
    const [columns] = await connection.query(`SHOW FULL COLUMNS FROM \\`${table}\\``);
    const [indexes] = await connection.query(`SHOW INDEX FROM \\`${table}\\``);
    return { columns, indexes };
  } finally {
    await connection.end();
  }
}

export async function getTableData(config: any, table: string, page: number = 1, pageSize: number = 20) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const connection = await mysql.createConnection(config);
  try {
    const [rows] = await connection.query(`SELECT * FROM \\`${table}\\` LIMIT ? OFFSET ?`, [pageSize, (page - 1) * pageSize]);
    const [countRows] = await connection.query(`SELECT COUNT(*) as total FROM \\`${table}\\``);
    return { rows, total: countRows[0]?.total || 0 };
  } finally {
    await connection.end();
  }
}

export async function updateTableRow(config: any, table: string, pk: any, data: any) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const pkKey = Object.keys(pk)[0];
  if (!isSafeName(pkKey)) throw new Error('非法主键名');
  const connection = await mysql.createConnection(config);
  try {
    await connection.query(`UPDATE \\`${table}\\` SET ? WHERE \\`${pkKey}\\` = ?`, [data, pk[pkKey]]);
    return true;
  } finally {
    await connection.end();
  }
}

export async function deleteTableRow(config: any, table: string, pk: any) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const pkKey = Object.keys(pk)[0];
  if (!isSafeName(pkKey)) throw new Error('非法主键名');
  const connection = await mysql.createConnection(config);
  try {
    await connection.query(`DELETE FROM \\`${table}\\` WHERE \\`${pkKey}\\` = ?`, [pk[pkKey]]);
    return true;
  } finally {
    await connection.end();
  }
}

export async function insertTableRow(config: any, table: string, data: any) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const connection = await mysql.createConnection(config);
  try {
    await connection.query(`INSERT INTO \\`${table}\\` SET ?`, [data]);
    return true;
  } finally {
    await connection.end();
  }
}

export async function createTable(config: any, table: string, columns: any[]) {
  if (!isSafeName(table)) throw new Error('非法表名');
  columns.forEach(col => { if (!isSafeName(col.name)) throw new Error('非法字段名'); });
  const connection = await mysql.createConnection(config);
  try {
    const cols = columns.map((col: any) => `\\`${col.name}\\` ${col.type} ${col.nullable ? '' : 'NOT NULL'}${col.extra ? ' ' + col.extra : ''}`).join(', ');
    await connection.query(`CREATE TABLE \\`${table}\\` (${cols})`);
    return true;
  } finally {
    await connection.end();
  }
}

export async function dropTable(config: any, table: string) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const connection = await mysql.createConnection(config);
  try {
    await connection.query(`DROP TABLE \\`${table}\\``);
    return true;
  } finally {
    await connection.end();
  }
}

// 备份、恢复、用户管理、性能监控等高级API同理加异常处理和表名校验