import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (id) => {
  const response = initResponseObject();

  if (id == null) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 501);
  } else if (id === '1') {
    response.data = {
      id,
    };
  } else {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 502);
  }

  return new Promise((resolve) => resolve(response));
};
