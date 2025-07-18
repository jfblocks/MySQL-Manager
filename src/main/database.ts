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
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.query(`SELECT * FROM \`${table}\` LIMIT ? OFFSET ?`, [pageSize, (page - 1) * pageSize]);
  const [countRows] = await connection.query(`SELECT COUNT(*) as total FROM \`${table}\``);
  await connection.end();
  return { rows, total: countRows[0]?.total || 0 };
}

export async function updateTableRow(config: any, table: string, pk: any, data: any) {
  const connection = await mysql.createConnection(config);
  const pkKey = Object.keys(pk)[0];
  await connection.query(`UPDATE \`${table}\` SET ? WHERE \`${pkKey}\` = ?`, [data, pk[pkKey]]);
  await connection.end();
  return true;
}

export async function deleteTableRow(config: any, table: string, pk: any) {
  const connection = await mysql.createConnection(config);
  const pkKey = Object.keys(pk)[0];
  await connection.query(`DELETE FROM \`${table}\` WHERE \`${pkKey}\` = ?`, [pk[pkKey]]);
  await connection.end();
  return true;
}

export async function insertTableRow(config: any, table: string, data: any) {
  const connection = await mysql.createConnection(config);
  await connection.query(`INSERT INTO \`${table}\` SET ?`, [data]);
  await connection.end();
  return true;
}

export async function createTable(config: any, table: string, columns: any[]) {
  const connection = await mysql.createConnection(config);
  const cols = columns.map((col: any) => `\`${col.name}\` ${col.type} ${col.nullable ? '' : 'NOT NULL'}${col.extra ? ' ' + col.extra : ''}`).join(', ');
  await connection.query(`CREATE TABLE \`${table}\` (${cols})`);
  await connection.end();
  return true;
}

export async function dropTable(config: any, table: string) {
  const connection = await mysql.createConnection(config);
  await connection.query(`DROP TABLE \`${table}\``);
  await connection.end();
  return true;
}

export async function backupDatabase(config: any, outFile: string) {
  return new Promise((resolve, reject) => {
    const cmd = `mysqldump -h${config.host} -P${config.port} -u${config.user} ${config.password ? `-p${config.password}` : ''} ${config.database} > ${outFile}`;
    exec(cmd, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

export async function restoreDatabase(config: any, filePath: string) {
  return new Promise((resolve, reject) => {
    const cmd = `mysql -h${config.host} -P${config.port} -u${config.user} ${config.password ? `-p${config.password}` : ''} ${config.database} < ${filePath}`;
    exec(cmd, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

export async function listUsers(config: any) {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.query('SELECT User, Host FROM mysql.user');
  await connection.end();
  return rows;
}

export async function setUserPrivileges(config: any, user: string, privileges: string[]) {
  const connection = await mysql.createConnection(config);
  await connection.query(`GRANT ${privileges.join(',')} ON *.* TO ?@'%'`, [user]);
  await connection.end();
  return true;
}

export async function getPerformanceStats(config: any) {
  const connection = await mysql.createConnection(config);
  const [status] = await connection.query('SHOW GLOBAL STATUS');
  const [processlist] = await connection.query('SHOW PROCESSLIST');
  await connection.end();
  return { status, processlist };
}
