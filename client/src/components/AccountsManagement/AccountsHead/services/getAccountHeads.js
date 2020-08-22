const sampleData = [
  {
    key: 1,
    id: '1',
    head_name: 'Supervisor\'s account',
    type: 'Cash In Hand',
    opening_balance: '0',
    current_balance: '0',
    created_on: new Date().getTime(),
    actions: 'To Do',
  },
];

export default () => new Promise((resolve, reject) => {
  if (sampleData) {
    resolve({
      data: sampleData,
    });
  } else {
    reject(new Error('Error while loading data'));
  }
});
