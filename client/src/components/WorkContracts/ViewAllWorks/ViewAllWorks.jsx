import { HomeOutlined, LoadingOutlined, ProfileTwoTone, UserOutlined } from '@ant-design/icons';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import Columns from './models/TableColumns';

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Work Contracts',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'View All Works',
    icon: ProfileTwoTone,
  },
];

const ViewAllWorks = () => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
  });

  useEffect(() => {
    const getAllWorksList = async function () {
      setState((prevState) => ({
        ...prevState,
        data: [],
        tableLoading: false,
      }));
    };

    getAllWorksList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns({
          handlers: {
          },
        })}
        dataSource={state.data}
        bordered
        title={() => (
          <TableTitle
            title="List Of Works"
            button={{
              icon: PlaylistAddOutlinedIcon,
              type: 'primary',
              label: 'New Work',
              onClick: () => {},
            }}
          />
        )}
        className="allWorks_Table"
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
    </div>
  );
};

export default ViewAllWorks;
