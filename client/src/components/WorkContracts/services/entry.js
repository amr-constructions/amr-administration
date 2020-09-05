import Constants from '../../../constants/Constants';
import CreateWorkContract from './createWorkContract';
import GetWork from './getWork';
import GetWorks from './getWorks';

export default {
  [Constants.WORKS_MGMT.CREATE_WORK]: CreateWorkContract,
  [Constants.WORKS_MGMT.GET_WORKS]: GetWorks,
  [Constants.WORKS_MGMT.GET_WORK]: GetWork,
};
