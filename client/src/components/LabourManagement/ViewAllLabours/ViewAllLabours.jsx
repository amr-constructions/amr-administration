import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Constants from '../../../constants/Constants';
import NavigationPath from '../../NavigationPath/NavigationPath';
import WorkServices from '../../WorkContracts/services/entry';
import ViewGroupLabours from '../ViewGroupLabours/ViewGroupLabours';
import ViewIndividualLabours from '../ViewIndividualLabours/ViewIndividualLabours';

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Labour Management',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Labour Profiles',
    icon: TeamOutlined,
  },
];

const ViewAllLabours = () => {
  const [ state, setState ] = useState({
    workTypes: [],
  });

  useEffect(() => {
    const getWorkTypeList = async function () {
      const response = await WorkServices[Constants.WORKS_MGMT.GET_WORK_TYPES]();
      if (response.code !== Constants.SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          disableNewIndividualLabour: true,
        }));
        message.error(`${response.reason} [${response.debugCode}]`);
      }

      const { data } = response;

      setState((prevState) => ({
        ...prevState,
        workTypes: data,
      }));
    };

    getWorkTypeList();

  /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Space
        direction="vertical"
        size="large"
        style={{
          width: '100%',
        }}
      >
        <ViewIndividualLabours workTypes={state.workTypes} />
        <ViewGroupLabours workTypes={state.workTypes} />
      </Space>
    </div>
  );
};

export default ViewAllLabours;
