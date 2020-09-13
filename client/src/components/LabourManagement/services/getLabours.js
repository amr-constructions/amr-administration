import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleDataIndividual = [
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

const sampleDataGroup = [
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
    leader: 'Y',
    group_id: 1,
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
    leader: 'N',
    group_id: 1,
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
    leader: 'N',
    group_id: 1,
  },
];

export default async (labourType) => {
  const response = initResponseObject();

  if (!labourType) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 501);
  } else if (sampleDataIndividual == null) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 500);
  } else {
    response.data = [];
    if (labourType & Constants.LABOURS_MGMT.LABOUR_TYPES.INDIVIDUAL_LABOUR) {
      response.data.push(...sampleDataIndividual);
    }

    if (labourType & Constants.LABOURS_MGMT.LABOUR_TYPES.GROUP_LABOUR) {
      response.data.push(...sampleDataGroup);
    }
  }

  return response;
};
