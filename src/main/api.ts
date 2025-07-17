import { ipcMain } from 'electron';
import { connectToDatabase, executeQuery, getTables, getTableSchema } from './database';

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