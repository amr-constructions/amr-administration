import { Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { dateFormatter } from '../../../utils/LocaleUtils';
import TableTitle from '../../TableTitle/TableTitle';
import './LedgerTable.css';
import Columns from './models/TableColumns';

const getLedgerTitle = ({ headName, period }) => {
  let title = `Account Ledger of ${headName}`;
  if (period) {
    title += ` From ${dateFormatter(period.from)} To ${dateFormatter(period.to)}`;
  }

  return title;
};

const LedgerTable = ({ data }) => {
  const { txns, requestedInfo } = data;

  return (
    <Table
      columns={Columns()}
      dataSource={txns}
      bordered
      title={() => (
        <TableTitle
          title={getLedgerTitle(requestedInfo)}
        />
      )}
      className="ledger_table"
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
      }}
      size="small"
    />
  );
};

LedgerTable.propTypes = {
  data: PropTypes.shape({
    requestedInfo: PropTypes.exact({
      headName: PropTypes.string.isRequired,
      period: PropTypes.shape({
        from: PropTypes.isRequired,
        to: PropTypes.isRequired,
      }),
    }).isRequired,
    txns: PropTypes.arrayOf(
      PropTypes.exact({
        key: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.oneOf([ 'CR', 'DR' ]),
        value: PropTypes.number.isRequired,
        bal: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

export default LedgerTable;
