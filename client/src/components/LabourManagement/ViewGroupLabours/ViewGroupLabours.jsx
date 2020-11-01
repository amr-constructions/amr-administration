import { LoadingOutlined } from '@ant-design/icons';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Constants from '../../../constants/Constants';
import TableTitle from '../../TableTitle/TableTitle';
import Services from '../services/entry';
import Columns from './models/TableColumns';

const ViewGroupLabours = ({ workTypes }) => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: false,
  });

  useEffect(() => {
    const getLabourGroupList = async function () {
      const response = await Services[Constants.LABOURS_MGMT.GET_LABOURS](Constants.LABOURS_MGMT.LABOUR_TYPES.GROUP_LABOUR);
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

    getLabourGroupList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const addNewLabourGroup = () => {

  };

  return (
    <Table
      columns={Columns({
        workTypes,
      })}
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

ViewGroupLabours.propTypes = {
  workTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
    }),
  ),
};

ViewGroupLabours.defaultProps = {
  workTypes: null,
};

export default ViewGroupLabours;
