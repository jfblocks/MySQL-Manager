import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'antd';
import TableList from './TableList';
import TableSchema from './TableSchema';
import TableDataPage from './TableDataPage';
import SqlQueryPage from './SqlQueryPage';
import CreateTablePage from './CreateTablePage';

interface Props {
  connectionConfig: any;
}

const DatabasePage: React.FC<Props> = ({ connectionConfig }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showData, setShowData] = useState(false);
  const [pkField, setPkField] = useState<string>('id');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setShowCreate(true)} style={{ marginBottom: 12 }}>新建数据表</Button>
      <Modal open={showCreate} onCancel={() => setShowCreate(false)} footer={null} destroyOnClose>
        <CreateTablePage connectionConfig={connectionConfig} onCreated={() => { setShowCreate(false); setSelectedTable(null); }} />
      </Modal>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="数据表" bodyStyle={{ padding: 0 }}>
            <TableList connectionConfig={connectionConfig} onSelectTable={table => { setSelectedTable(table); setShowData(false); }} />
          </Card>
        </Col>
        <Col span={18}>
          {selectedTable ? (
            showData ? (
              <TableDataPage connectionConfig={connectionConfig} table={selectedTable} pkField={pkField} />
            ) : (
              <TableSchema connectionConfig={connectionConfig} table={selectedTable} onShowData={pk => { setPkField(pk); setShowData(true); }} />
            )
          ) : (
            <SqlQueryPage connectionConfig={connectionConfig} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default DatabasePage;