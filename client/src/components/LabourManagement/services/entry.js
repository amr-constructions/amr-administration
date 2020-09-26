import Constants from '../../../constants/Constants';
import CreateIndividualLabour from './createIndividualLabour';
import DeleteWork from './deleteLabour';
import GetLabours from './getLabours';
import UpdateLabour from './updateLabour';

export default {
  [Constants.LABOURS_MGMT.GET_LABOURS]: GetLabours,
  [Constants.LABOURS_MGMT.CREATE_INDIVIDUAL_LABOUR]: CreateIndividualLabour,
  [Constants.LABOURS_MGMT.UPDATE_LABOUR]: UpdateLabour,
  [Constants.LABOURS_MGMT.DELETE_WORK]: DeleteWork,
};
