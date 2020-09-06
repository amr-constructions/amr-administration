import Constants from '../../../constants/Constants';
import CreateWorkContract from './createWorkContract';
import GetWork from './getWork';
import GetWorks from './getWorks';
import UpdateWork from './updateWork';

export default {
  [Constants.WORKS_MGMT.CREATE_WORK]: CreateWorkContract,
  [Constants.WORKS_MGMT.GET_WORKS]: GetWorks,
  [Constants.WORKS_MGMT.GET_WORK]: GetWork,
  [Constants.WORKS_MGMT.UPDATE_WORK]: UpdateWork,
};
