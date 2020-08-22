import Constants from '../../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../../services/Common';

const sampleData = [
  {
    key: '1',
    id: '1',
    head_name: 'Supervisor\'s account',
    type: 'Cash In Hand',
    opening_balance: '0',
    current_balance: '0',
    created_on: new Date().getTime(),
    actions: 'To Do',
  },
];

export default async () => {
  const response = initResponseObject();

  if (sampleData == null) {
    buildResponseObject(response, Constants.ACCOUNTS_MGMT.MODULE, 500);
  } else {
    response.data = sampleData;
  }

  return response;
};
