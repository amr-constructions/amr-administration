import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

export default async (data) => {
  const response = initResponseObject();

  if (!data) {
    buildResponseObject(response, Constants.ACCOUNTS_MGMT.MODULE, 501);
  } else {
    const uid = Math.floor(Math.random() * 100).toString();
    response.data = {
      ...data,
      id: uid,
      key: uid,
      current_balance: data.opening_balance,
      created_on: new Date().getTime(),
    };
  }

  return response;
};
