import Constants from '../constants/Constants';
import { buildResponseObject, initResponseObject } from './Common';

const loginService = async (values) => {
  const { username, password } = values;

  const response = initResponseObject();

  if (!(username === 'admin' && password === 'admin')) {
    buildResponseObject(response, Constants.LOGIN, 500);
  }

  return response;
};

export default async (authType, values) => {
  let response;

  if (authType === Constants.LOGIN) {
    response = await loginService(values);
  }

  return response;
};
