import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleData = {
  key: '1',
  id: '1',
  name: 'Focus Mall',
  supervisor: 'Azhar',
  client_id: '3',
  client_name: 'Ayman',
  client_contact: '+918714452213',
  location: 'Calicut, Kerala, India',
  category: [ 'constrxn' ],
  budget: 988865521.2,
  status: 0,
  created_by: 'Administrator',
  completeOn: new Date().getTime(),
  created_on: new Date().getTime(),
  description: 'Description',
};

export default async (id) => {
  const response = initResponseObject();

  if (sampleData == null || id == null) {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 501);
  } else if (id === '1') {
    response.data = sampleData;
  } else {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 502);
  }

  return response;
};
