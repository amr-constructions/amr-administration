import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (data) => {
  const response = initResponseObject();

  if (!data) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 501);
  } else {
    response.data = {
      ...data,
      contact: `+91${data.contact}`,
    };
  }

  return response;
};
