import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (data) => {
  const response = initResponseObject();

  if (!data) {
    buildResponseObject(response, Constants.ACCOUNTS_MGMT.MODULE, 501);
  } else {
    response.data = {
      ...data,
    };
  }

  return response;
};
