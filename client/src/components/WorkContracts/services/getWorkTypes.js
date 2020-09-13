import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const workTypes = [
  {
    id: 1,
    type: 'Renovation',
  },
  {
    id: 2,
    type: 'Interior',
  },
  {
    id: 3,
    type: 'Construction',
  },
  {
    id: 4,
    type: 'Painting',
  },
  {
    id: 5,
    type: 'Welding',
  },
  {
    id: 6,
    type: 'Flooring',
  },
  {
    id: 7,
    type: 'Plastering',
  },
  {
    id: 8,
    type: 'Masonry',
  },
];

export default async () => {
  const response = initResponseObject();

  if (!workTypes || !workTypes.length) {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 503);
  } else {
    response.data = workTypes;
  }

  return response;
};
