import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Constants from '../../../constants/Constants';
import TableTitle from '../../TableTitle/TableTitle';
import Services from '../services/entry';
import Columns from './models/TableColumns';

const ViewIndividualLabours = () => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
  });

  useEffect(() => {
    const getIndividualLaboursList = async function () {
      const response = await Services[Constants.LABOURS_MGMT.GET_LABOURS](Constants.LABOURS_MGMT.LABOUR_TYPES.INDIVIDUAL_LABOUR);
      if (response.code !== Constants.SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          data: [],
          tableLoading: false,
        }));

        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      const { data } = response;

      setState((prevState) => ({
        ...prevState,
        data,
        tableLoading: false,
      }));
    };

    getIndividualLaboursList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

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
