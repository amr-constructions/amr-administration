import Constants from '../../../constants/Constants';
import CreateClient from './createClient';
import GetClientList from './getClientList';

export default {
  [Constants.CLIENTS_MGMT.GET_CLIENTS]: GetClientList,
  [Constants.CLIENTS_MGMT.CREATE_CLIENT]: CreateClient,
};
