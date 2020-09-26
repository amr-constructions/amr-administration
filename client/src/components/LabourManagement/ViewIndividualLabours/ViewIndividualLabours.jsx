import { LoadingOutlined } from '@ant-design/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { message, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Constants from '../../../constants/Constants';
import TableTitle from '../../TableTitle/TableTitle';
import Services from '../services/entry';
import Columns from './models/TableColumns';
import NewIndividualLabour from './NewIndividualLabour';

const ViewIndividualLabours = ({ workTypes }) => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
    visible: false,
    modalSubmit: false,
    disableNewIndividualLabour: false,
    workTypes,
    dailyWageVisible: false,
    editLabourModalVisible: false,
    dataForEdit: {
    },
  });

  const formRef = useRef(null);

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
    setState((prevState) => ({
      ...prevState,
      visible: true,
    }));
  };

  const submitNewIndividualLabourForm = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    const response = await Services[Constants.LABOURS_MGMT.CREATE_INDIVIDUAL_LABOUR](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      tableLoading: true,
      modalSubmit: false,
      dailyWageVisible: false,
    }));

    formRef.current.resetFields();

    message.success('New Individual Labour Added Successfully');

    setState((prevState) => {
      const newData = prevState.data.slice(0);
      newData.push(response.data);

      return ({
        ...prevState,
        data: newData,
        tableLoading: false,
      });
    });
  };

  const editIndividualLabour = (e, record) => {
    setState((prevState) => ({
      ...prevState,
      dataForEdit: record,
      editLabourModalVisible: true,
    }));
  };

  return (
    <>
      <Table
        columns={Columns({
          handlers: {
            editIndividualLabour,
          },
          workTypes,
        })}
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
      <NewIndividualLabour ref={formRef} onSubmit={submitNewIndividualLabourForm} state={state} setState={setState} />
    </>
  );
};

export default ViewIndividualLabours;
