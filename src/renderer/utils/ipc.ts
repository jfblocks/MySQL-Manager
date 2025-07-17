export async function connectDatabase(config: any): Promise<{ success: boolean; message?: string }> {
  // @ts-ignore
  return await window.electron?.invoke('connect-database', config) || { success: false, message: 'IPC不可用' };
}

export async function executeQuery(config: any, sql: string): Promise<{ success: boolean; rows?: any[]; fields?: any[]; message?: string }> {
  // @ts-ignore
  return await window.electron?.invoke('execute-query', { config, sql }) || { success: false, message: 'IPC不可用' };
}

export async function getTables(config: any): Promise<{ success: boolean; tables?: string[]; message?: string }> {
  // @ts-ignore
  return await window.electron?.invoke('get-tables', config) || { success: false, message: 'IPC不可用' };
}

export async function getTableSchema(config: any, table: string): Promise<{ success: boolean; columns?: any[]; indexes?: any[]; message?: string }> {
  // @ts-ignore
  return await window.electron?.invoke('get-table-schema', { config, table }) || { success: false, message: 'IPC不可用' };
}