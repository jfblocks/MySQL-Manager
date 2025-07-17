export async function connectDatabase(config: any): Promise<{ success: boolean; message?: string }> {
  // @ts-ignore
  return await window.electron?.invoke('connect-database', config) || { success: false, message: 'IPC不可用' };
}