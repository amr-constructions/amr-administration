import Constants from '../../../constants/Constants';
import CreateWorkContract from './createWorkContract';
import GetWorks from './getWorks';

export default {
  [Constants.WORKS_MGMT.CREATE_WORK]: CreateWorkContract,
  [Constants.WORKS_MGMT.GET_WORKS]: GetWorks,
};
