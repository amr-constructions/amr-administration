import Constants from '../../../constants/Constants';
import CreateIndividualLabour from './createIndividualLabour';
import GetLabours from './getLabours';

export default {
  [Constants.LABOURS_MGMT.GET_LABOURS]: GetLabours,
  [Constants.LABOURS_MGMT.CREATE_INDIVIDUAL_LABOUR]: CreateIndividualLabour,
};
