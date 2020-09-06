import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (id, data) => {
  const response = initResponseObject();

  if (!id || !data) {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 501);
  } else {
    response.data = {
      id,
      ...data,
    };
  }

  return response;
};
