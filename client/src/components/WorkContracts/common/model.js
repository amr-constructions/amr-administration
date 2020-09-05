import Constants from '../../../constants/Constants';

export const workCategories = {
  proj_mgmt: 'Project Management',
  int_dsign: 'Interior Designing',
  plan_and_dsign: 'Plan & Designing',
  constrxn: 'Construction',
};

export const workStatus = {
  [Constants.WORK_STATUS.WIP]: 'Work In Progress',
  [Constants.WORK_STATUS.COMPLETED]: 'Completed',
  [Constants.WORK_STATUS.OVERDUE]: 'Overdue',
  [Constants.WORK_STATUS.DELETED]: 'Deleted',
};
