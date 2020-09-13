import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleData = [
  {
    key: '1',
    id: '1',
    name: 'Test Labour',
    contact: '+91123456789',
    work_type: 'HFD',
    fixed: 'Y',
    wage_per_day: '10',
    opening_balance: '10',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
  },
  {
    key: '2',
    id: '2',
    name: 'Ravi',
    contact: '+919633263624',
    work_type: 'Mason',
    fixed: 'N',
    wage_per_day: '850',
    opening_balance: '0',
    created_by: 'Jinesh',
    created_on: new Date().getTime(),
  },
  {
    key: '3',
    id: '3',
    name: 'Santhosh',
    contact: '+919532326324',
    work_type: 'Formen',
    fixed: 'Y',
    wage_per_day: '900',
    opening_balance: '0',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
  },
];

export default async () => {
  const response = initResponseObject();

  if (sampleData == null) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 500);
  } else {
    response.data = sampleData;
  }

  return response;
};