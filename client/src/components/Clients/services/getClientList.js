import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleData = [
  {
    key: '1',
    id: '1',
    name: 'Mohammed Azhar',
    contact: '+918714452213',
  },
  {
    key: '2',
    id: '2',
    name: 'Anfal',
    contact: '+918921868204',
  },
  {
    key: '3',
    id: '3',
    name: 'Ayman',
    contact: '+966540431802',
  },
];

export default async () => {
  const response = initResponseObject();

  if (sampleData == null) {
    buildResponseObject(response, Constants.CLIENTS_MGMT.MODULE, 500);
  } else {
    response.data = sampleData;
  }

  return response;
};
