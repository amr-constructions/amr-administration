import Constants from '../../../constants/Constants';
import CreateAccountHead from './createAccountHead';
import GetAccountHeads from './getAccountHeads';
import UpdateAccountHeads from './updateAccountHead';

export default {
  [Constants.ACCOUNTS_MGMT.CREATE_ACCOUNT_HEAD]: CreateAccountHead,
  [Constants.ACCOUNTS_MGMT.GET_ACCOUNT_HEADS]: GetAccountHeads,
  [Constants.ACCOUNTS_MGMT.UPDATE_ACCOUNT_HEAD]: UpdateAccountHeads,
};
