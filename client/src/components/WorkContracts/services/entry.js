import Constants from '../../../constants/Constants';
import CreateWorkContract from './createWorkContract';
import DeleteWork from './deleteWork';
import GetWork from './getWork';
import GetWorks from './getWorks';
import GetWorkTypes from './getWorkTypes';
import UpdateWork from './updateWork';

export default {
  [Constants.WORKS_MGMT.CREATE_WORK]: CreateWorkContract,
  [Constants.WORKS_MGMT.GET_WORKS]: GetWorks,
  [Constants.WORKS_MGMT.GET_WORK]: GetWork,
  [Constants.WORKS_MGMT.UPDATE_WORK]: UpdateWork,
  [Constants.WORKS_MGMT.DELETE_WORK]: DeleteWork,
  [Constants.WORKS_MGMT.GET_WORK_TYPES]: GetWorkTypes,
};
