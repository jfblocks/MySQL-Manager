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

export async function getTableData(config: any, table: string, page = 1, pageSize = 20) {
  // @ts-ignore
  return await window.electron?.invoke('get-table-data', { config, table, page, pageSize }) || { success: false, message: 'IPC不可用' };
}
export async function updateTableRow(config: any, table: string, pk: any, data: any) {
  // @ts-ignore
  return await window.electron?.invoke('update-table-row', { config, table, pk, data }) || { success: false, message: 'IPC不可用' };
}
export async function deleteTableRow(config: any, table: string, pk: any) {
  // @ts-ignore
  return await window.electron?.invoke('delete-table-row', { config, table, pk }) || { success: false, message: 'IPC不可用' };
}
export async function insertTableRow(config: any, table: string, data: any) {
  // @ts-ignore
  return await window.electron?.invoke('insert-table-row', { config, table, data }) || { success: false, message: 'IPC不可用' };
}
export async function createTable(config: any, table: string, columns: any[]) {
  // @ts-ignore
  return await window.electron?.invoke('create-table', { config, table, columns }) || { success: false, message: 'IPC不可用' };
}
export async function dropTable(config: any, table: string) {
  // @ts-ignore
  return await window.electron?.invoke('drop-table', { config, table }) || { success: false, message: 'IPC不可用' };
}