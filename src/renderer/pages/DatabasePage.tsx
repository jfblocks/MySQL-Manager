import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import TableList from './TableList';
import TableSchema from './TableSchema';
import SqlQueryPage from './SqlQueryPage';

interface Props {
  connectionConfig: any;
}

const DatabasePage: React.FC<Props> = ({ connectionConfig }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="数据表" bodyStyle={{ padding: 0 }}>
          <TableList connectionConfig={connectionConfig} onSelectTable={setSelectedTable} />
        </Card>
      </Col>
      <Col span={18}>
        {selectedTable ? (
          <TableSchema connectionConfig={connectionConfig} table={selectedTable} />
        ) : (
          <SqlQueryPage connectionConfig={connectionConfig} />
        )}
      </Col>
    </Row>
  );
};

export default DatabasePage;