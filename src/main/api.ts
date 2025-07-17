import { ipcMain } from 'electron';
import { connectToDatabase } from './database';

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