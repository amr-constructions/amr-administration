import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { useState } from 'react';
import TableTitle from '../../TableTitle/TableTitle';
import Columns from './models/TableColumns';

const ViewIndividualLabours = () => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: false,
  });

  const addNewIndividualLabour = () => {

  };

  return (
    <Table
      columns={Columns()}
      dataSource={state.data}
      bordered
      title={() => (
        <TableTitle
          title="List Of Individual Labours"
          button={{
            icon: AppstoreAddOutlined,
            type: 'primary',
            label: 'New Individual Labour',
            onClick: addNewIndividualLabour,
          }}
        />
      )}
      className="individualLabours_Table"
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
      }}
      loading={{
        indicator: (<LoadingOutlined />),
        size: 'large',
        tip: 'Loading Data...',
        spinning: state.tableLoading,
      }}
    />
  );
};

export default ViewIndividualLabours;
