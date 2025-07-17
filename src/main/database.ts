import mysql from 'mysql2/promise';
import fs from 'fs';
import { exec } from 'child_process';

export async function connectToDatabase(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
  await connection.ping();
  await connection.end();
  return true;
}

export async function executeQuery(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}, sql: string) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
  const [rows, fields] = await connection.query(sql);
  await connection.end();
  return { rows, fields };
}

export async function getTables(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
  const [rows] = await connection.query('SHOW TABLES');
  await connection.end();
  // 兼容不同MySQL返回格式
  const tableKey = Object.keys(rows[0] || {}).find(k => k.toLowerCase().includes('table'));
  return rows.map((row: any) => row[tableKey]);
}

export async function getTableSchema(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}, table: string) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
  const [columns] = await connection.query(`SHOW FULL COLUMNS FROM \\\`${table}\\\``);
  const [indexes] = await connection.query(`SHOW INDEX FROM \\`${table}\\``);
  await connection.end();
  return { columns, indexes };
}

function isSafeName(name: string) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export async function getTableData(config: any, table: string, page: number = 1, pageSize: number = 20) {
  if (!isSafeName(table)) throw new Error('非法表名');
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.query(`SELECT * FROM \`