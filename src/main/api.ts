import { ipcMain } from 'electron';
import { connectToDatabase, executeQuery, getTables, getTableSchema, getTableData, updateTableRow, deleteTableRow, insertTableRow, createTable, dropTable } from './database';

ipcMain.handle('connect-database', async (_event, config) => {
  try {
    await connectToDatabase({
      ...config,
      port: Number(config.port),
    });
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('execute-query', async (_event, { config, sql }) => {
  try {
    const result = await executeQuery({
      ...config,
      port: Number(config.port),
    }, sql);
    return { success: true, ...result };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('get-tables', async (_event, config) => {
  try {
    const tables = await getTables({
      ...config,
      port: Number(config.port),
    });
    return { success: true, tables };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('get-table-schema', async (_event, { config, table }) => {
  try {
    const schema = await getTableSchema({
      ...config,
      port: Number(config.port),
    }, table);
    return { success: true, ...schema };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('get-table-data', async (_event, { config, table, page, pageSize }) => {
  try {
    const data = await getTableData(config, table, page, pageSize);
    return { success: true, ...data };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('update-table-row', async (_event, { config, table, pk, data }) => {
  try {
    await updateTableRow(config, table, pk, data);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('delete-table-row', async (_event, { config, table, pk }) => {
  try {
    await deleteTableRow(config, table, pk);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('insert-table-row', async (_event, { config, table, data }) => {
  try {
    await insertTableRow(config, table, data);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('create-table', async (_event, { config, table, columns }) => {
  try {
    await createTable(config, table, columns);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('drop-table', async (_event, { config, table }) => {
  try {
    await dropTable(config, table);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
});