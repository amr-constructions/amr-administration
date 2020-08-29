/* eslint-disable no-underscore-dangle */
import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const txnList = [ {
  key: Math.floor(Math.random() * 100),
  date: new Date().getTime(),
  description: 'Accouunt Opening Balance',
  type: 'CR',
  value: 80000,
  bal: 80000,
}, {
  key: Math.floor(Math.random() * 100),
  date: new Date().getTime(),
  description: 'Some Expense',
  type: 'DR',
  value: 30000,
  bal: 50000,
} ];

const validateInputData = (data) => {
  if (!data) {
    return false;
  } if (!data.account_name) {
    return false;
  } if (data.period && Object.keys(data.period).length !== 2) {
    return false;
  } if (data.period && !(data.period[0]._isAMomentObject && data.period[1]._isAMomentObject)) {
    return false;
  }

  return true;
};

export default async (data) => {
  const response = initResponseObject();

  if (!validateInputData(data)) {
    buildResponseObject(response, Constants.ACCOUNTS_MGMT.MODULE, 501);
  } else {
    response.data = {
      requestedInfo: {
        headName: 'Supervisor\'s Account',
        period: (data.period) ? {
          from: data.period[0].startOf('day').valueOf(),
          to: data.period[1].startOf('day').valueOf(),
        } : null,
      },
      txns: txnList,
    };
  }

  return response;
};
