const sampleData = [
  {
    key: 1,
    id: '1',
    name: 'Supervisor\'s account',
    type: 'Cash In Hand',
    op_bal: '0',
    curr_bal: '0',
    created_on: new Date(),
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
