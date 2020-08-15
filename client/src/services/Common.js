import Constants from '../constants/Constants';

const initResponseObject = () => ({
  code: Constants.SUCCESS,
});

const buildResponseObject = (response, module, errorCode) => {
  response.code = errorCode;
  response.debugCode = `${Constants.CLIENT_PREFIX}${module}_${errorCode}`;
  response.reason = Constants.API_ERRORS[module][response.code];
};

export { buildResponseObject, initResponseObject };
