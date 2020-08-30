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
  },
};
