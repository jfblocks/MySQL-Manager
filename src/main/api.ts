import { ipcMain } from 'electron';
import { connectToDatabase, executeQuery } from './database';

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