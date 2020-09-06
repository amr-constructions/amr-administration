import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleData = [
  {
    key: '1',
    id: '1',
    name: 'Focus Mall',
    supervisor: 'Azhar',
    client_name: 'Ayman',
    client_contact: '+918714452213',
    location: 'Calicut, Kerala, India',
    category: [ 'constrxn' ],
    budget: 988865521.2,
    status: 0,
    created_by: 'Administrator',
    created_on: new Date().getTime(),
    completeOn: new Date().getTime(),
    description: 'Description',
  },
];

export default async () => {
  const response = initResponseObject();

  if (sampleData == null) {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 501);
  } else {
    response.data = sampleData;
  }

  return response;
};
