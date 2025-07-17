import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Input, Space } from 'antd';
import { getTableData, updateTableRow, deleteTableRow, insertTableRow } from '../utils/ipc';

interface Props {
  connectionConfig: any;
  table: string;
  pkField: string;
}

const TableDataPage: React.FC<Props> = ({ connectionConfig, table, pkField }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingKey, setEditingKey] = useState<any>(null);
  const [editRow, setEditRow] = useState<any>({});
  const [adding, setAdding] = useState(false);
  const [addRow, setAddRow] = useState<any>({});

  const fetchData = () => {
    setLoading(true);
    getTableData(connectionConfig, table, page, 20).then(res => {
      setLoading(false);
      if (res.success) {
        setData(res.rows || []);
        setTotal(res.total || 0);
        if (res.rows && res.rows[0]) {
          setColumns(Object.keys(res.rows[0]).map(key => ({
            title: key,
            dataIndex: key,
            editable: true,
          })).concat({
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
              <Space>
                {editingKey === record[pkField] ? (
                  <>
                    <Button size="small" onClick={() => handleSave(record)} type="primary">保存</Button>
                    <Button size="small" onClick={handleCancel}>取消</Button>
                  </>
                ) : (
                  <Button size="small" onClick={() => handleEdit(record)}>编辑</Button>
                )}
                <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record)}><Button size="small" danger>删除</Button></Popconfirm>
              </Space>
            )
          }));
        }
      } else {
        message.error(res.message || '获取数据失败');
      }
    });
  };

  useEffect(() => { fetchData(); }, [connectionConfig, table, page]);

  const handleEdit = (record: any) => {
    setEditingKey(record[pkField]);
    setEditRow({ ...record });
  };
  const handleCancel = () => {
    setEditingKey(null);
    setEditRow({});
  };
  const handleSave = async (record: any) => {
    const res = await updateTableRow(connectionConfig, table, { [pkField]: record[pkField] }, editRow);
    if (res.success) {
      message.success('保存成功');
      setEditingKey(null);
      fetchData();
    } else {
      message.error(res.message || '保存失败');
    }
  };
  const handleDelete = async (record: any) => {
    const res = await deleteTableRow(connectionConfig, table, { [pkField]: record[pkField] });
    if (res.success) {
      message.success('删除成功');
      fetchData();
    } else {
      message.error(res.message || '删除失败');
    }
  };
  const handleAdd = async () => {
    setAdding(true);
    setAddRow({});
  };
  const handleAddSave = async () => {
    const res = await insertTableRow(connectionConfig, table, addRow);
    if (res.success) {
      message.success('添加成功');
      setAdding(false);
      fetchData();
    } else {
      message.error(res.message || '添加失败');
    }
  };
  const handleAddCancel = () => {
    setAdding(false);
    setAddRow({});
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 8 }}>新增</Button>
      <Table
        dataSource={adding ? [addRow, ...data] : data}
        columns={columns.map(col => {
          if (!col.editable) return col;
          return {
            ...col,
            render: (_: any, record: any, idx: number) => {
              if (adding && idx === 0) {
                return <Input value={addRow[col.dataIndex]} onChange={e => setAddRow({ ...addRow, [col.dataIndex]: e.target.value })} />;
              }
              if (editingKey === record[pkField]) {
                return <Input value={editRow[col.dataIndex]} onChange={e => setEditRow({ ...editRow, [col.dataIndex]: e.target.value })} />;
              }
              return record[col.dataIndex];
            }
          };
        })}
        rowKey={pkField}
        loading={loading}
        pagination={{ current: page, pageSize: 20, total, onChange: setPage }}
      />
      {adding && (
        <Space style={{ marginTop: 8 }}>
          <Button type="primary" onClick={handleAddSave}>保存</Button>
          <Button onClick={handleAddCancel}>取消</Button>
        </Space>
      )}
    </div>
  );
};

export default TableDataPage;