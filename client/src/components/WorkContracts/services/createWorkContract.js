import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (data) => {
  const response = initResponseObject();

  if (!data) {
    buildResponseObject(response, Constants.WORKS_MGMT.MODULE, 501);
  } else {
    const uid = Math.floor(Math.random() * 100).toString();
    response.data = {
      id: uid,
    };
  }

  return response;
};
