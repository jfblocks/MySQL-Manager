import mysql from 'mysql2/promise';

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