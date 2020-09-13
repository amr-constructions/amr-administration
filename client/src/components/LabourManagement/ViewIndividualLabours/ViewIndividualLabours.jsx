import { LoadingOutlined } from '@ant-design/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Constants from '../../../constants/Constants';
import TableTitle from '../../TableTitle/TableTitle';
import WorkServices from '../../WorkContracts/services/entry';
import Services from '../services/entry';
import Columns from './models/TableColumns';
import NewIndividualLabour from './NewIndividualLabour';

const ViewIndividualLabours = () => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
    visible: false,
    modalSubmit: false,
    disableNewIndividualLabour: false,
    workTypes: [],
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

    getIndividualLaboursList();
    getWorkTypeList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const addNewIndividualLabour = () => {
    setState((prevState) => ({
      ...prevState,
      visible: true,
    }));
  };

  const submitNewIndividualLabourForm = () => {

  };

  return (
    <>
      <Table
        columns={Columns()}
        dataSource={state.data}
        bordered
        size="small"
        title={() => (
          <TableTitle
            title="List Of Individual Labours"
            button={{
              icon: PersonAddIcon,
              type: 'primary',
              label: 'New Individual Labour',
              onClick: addNewIndividualLabour,
              disabled: state.disableNewIndividualLabour,
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
      <NewIndividualLabour onSubmit={submitNewIndividualLabourForm} state={state} setState={setState} />
    </>
  );
};

export default ViewIndividualLabours;
