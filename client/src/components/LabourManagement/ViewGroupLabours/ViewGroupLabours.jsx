import { LoadingOutlined } from '@ant-design/icons';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import TableTitle from '../../TableTitle/TableTitle';
import Columns from './models/TableColumns';

const ViewGroupLabours = () => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: false,
  });

  useEffect(() => {
    const getLabourGroupList = async function () {
    };

    getLabourGroupList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const addNewLabourGroup = () => {

  };

  return (
    <Table
      columns={Columns()}
      dataSource={state.data}
      bordered
      size="small"
      title={() => (
        <TableTitle
          title="List Of Labour Groups"
          button={{
            icon: GroupAddIcon,
            type: 'primary',
            label: 'New Labour Group',
            onClick: addNewLabourGroup,
          }}
        />
      )}
      className="LabourGroups_Table"
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

export default ViewGroupLabours;
