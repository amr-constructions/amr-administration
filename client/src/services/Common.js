import Constants from '../constants/Constants';
import Config from '../config/config';

const initResponseObject = () => ({
  code: Constants.SUCCESS,
});

const buildResponseObject = (response, module, errorCode) => {
  response.code = errorCode;
  response.debugCode = `${Config.CLIENT_PREFIX}${module}_${errorCode}`;
  response.reason = Constants.API_ERRORS[module][response.code];
};

export { buildResponseObject, initResponseObject };
