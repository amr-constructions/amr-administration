import { CloseOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { message, Modal, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Constants from '../../../constants/Constants';
import TableTitle from '../../TableTitle/TableTitle';
import Services from '../services/entry';
import EditIndividualLabour from './EditIndividualLabour';
import Columns from './models/TableColumns';
import NewIndividualLabour from './NewIndividualLabour';

const { confirm } = Modal;

const ViewIndividualLabours = ({ workTypes }) => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
    visible: false,
    modalSubmit: false,
    disableNewIndividualLabour: false,
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

  const updateIndividualLabour = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    const response = await Services[Constants.LABOURS_MGMT.UPDATE_LABOUR](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
    }

    setState((prevState) => ({
      ...prevState,
      tableLoading: true,
    }));

    const idx = state.data.findIndex((item) => item.id === response.data.id);
    if (idx === -1) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error('Labour Update Failed [CLIENT]');
      return;
    }

    const updatedData = state.data.slice(0);
    updatedData[idx] = {
      ...updatedData[idx], ...response.data,
    };

    setState((prevState) => {
      message.success('Labour Updated Successfully');
      return ({
        ...prevState,
        data: updatedData,
        tableLoading: false,
        editLabourModalVisible: false,
        modalSubmit: false,
      });
    });
  };

  const postDeleteWork = (response) => {
    setState((prevState) => ({
      ...prevState,
      tableLoading: true,
    }));

    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
      }));
      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      data: prevState.data.filter((item) => (item.id !== response.data.id)),
      tableLoading: false,
    }));

    message.success('Labour Deleted Successfully !');
  };

  const deleteWork = (id) => {
    confirm({
      title: 'Do you want to delete this labour ?',
      icon: <DeleteOutlined />,
      content: 'This action cannot be reversed',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve) => {
          Services[Constants.LABOURS_MGMT.DELETE_WORK](id)
            .then((response) => {
              resolve(postDeleteWork(response));
            });
        });
      },
      onCancel() {},
      cancelButtonProps: {
        icon: <CloseOutlined />,
      },
      okButtonProps: {
        icon: <DeleteOutlined />,
      },
      autoFocusButton: 'cancel',
      centered: true,
    });
  };

  return (
    <>
      <Table
        columns={Columns({
          handlers: {
            editIndividualLabour,
            deleteWork,
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
      <NewIndividualLabour ref={formRef} onSubmit={submitNewIndividualLabourForm} state={state} setState={setState} workTypes={workTypes} />
      <EditIndividualLabour onSubmit={updateIndividualLabour} state={state} setState={setState} workTypes={workTypes} />
    </>
  );
};

ViewIndividualLabours.propTypes = {
  workTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
};

export default ViewIndividualLabours;
