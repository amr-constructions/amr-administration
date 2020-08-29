import { Table } from 'antd';
import React from 'react';
import TableTitle from '../../TableTitle/TableTitle';
import './LedgerTable.css';
import Columns from './models/TableColumns';

const LedgerTable = () => (
  <Table
    columns={Columns()}
    dataSource={[]}
    bordered
    title={() => (
      <TableTitle
        title="Account Ledger"
      />
    )}
    className="ledger_table"
    pagination={{
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
    }}
    size="small"
  />
);

export default LedgerTable;
