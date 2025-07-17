import React, { useEffect, useState } from 'react';
import { List, Spin, message } from 'antd';
import { getTables } from '../utils/ipc';

interface Props {
  connectionConfig: any;
  onSelectTable: (table: string) => void;
}

const TableList: React.FC<Props> = ({ connectionConfig, onSelectTable }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTables(connectionConfig).then(res => {
      setLoading(false);
      if (res.success) {
        setTables(res.tables || []);
      } else {
        message.error(res.message || '获取表列表失败');
      }
    });
  }, [connectionConfig]);

  return (
    <Spin spinning={loading}>
      <List
        size="small"
        bordered
        dataSource={tables}
        renderItem={item => (
          <List.Item style={{ cursor: 'pointer' }} onClick={() => onSelectTable(item)}>
            {item}
          </List.Item>
        )}
        style={{ maxHeight: 400, overflow: 'auto' }}
      />
    </Spin>
  );
};

export default TableList;