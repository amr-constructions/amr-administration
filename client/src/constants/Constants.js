export default {
  SUCCESS: 0,
  LOGIN: 'LOGIN',

  ACCOUNTS_MGMT: {
    MODULE: 'ACCOUNTS_MGMT',
    GET_ACCOUNT_HEADS: 'GET_ACCOUNT_HEADS',
    CREATE_ACCOUNT_HEAD: 'CREATE_ACCOUNT_HEAD',
    UPDATE_ACCOUNT_HEAD: 'UPDATE_ACCOUNT_HEAD',
    GET_ACCOUNT_TXNS: 'GET_ACCOUNT_TXNS',
  },

  CLIENTS_MGMT: {
    MODULE: 'CLIENTS_MGMT',
    GET_CLIENTS: 'GET_CLIENTS',
    CREATE_CLIENT: 'CREATE_CLIENT',
  },

  WORKS_MGMT: {
    MODULE: 'WORKS_MGMT',
    CREATE_WORK: 'CREATE_WORK',
    GET_WORKS: 'GET_WORKS',
    GET_WORK: 'GET_WORK',
    UPDATE_WORK: 'UPDATE_WORK',
    DELETE_WORK: 'DELETE_WORK',
    GET_WORK_TYPES: 'GET_WORK_TYPES',
  },

  LABOURS_MGMT: {
    MODULE: 'LABOURS_MGMT',
    GET_LABOURS: 'GET_LABOURS',
    LABOUR_TYPES: {
      INDIVIDUAL_LABOUR: 1,
      GROUP_LABOUR: 2,
    },
    CREATE_INDIVIDUAL_LABOUR: 'CREATE_INDIVIDUAL_LABOUR',
  },

  WORK_STATUS: {
    WIP: 0,
    COMPLETED: 1,
    OVERDUE: 2,
    DELETED: 3,
  },

  API_ERRORS: {
    LOGIN: {
      500: 'Invalid Login Details',
    },
    ACCOUNTS_MGMT: {
      500: 'Invalid Response',
      501: 'Invalid Input Data',
    },
    CLIENTS_MGMT: {
      500: 'Invalid Response',
      501: 'Invalid Input Data',
    },
    WORKS_MGMT: {
      500: 'Invalid Response',
      501: 'Invalid Input Data',
      502: 'Work Not Found',
      503: 'Work Types Not Found',
    },
    LABOURS_MGMT: {
      500: 'Invalid Response',
      501: 'Invalid Request',
    },
  },
};
