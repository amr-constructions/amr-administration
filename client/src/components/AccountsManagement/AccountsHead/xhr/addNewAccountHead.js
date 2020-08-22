export default (data) => new Promise((resolve, reject) => {
  if (data) {
    setTimeout(() => {
      resolve({
        data: {
          ...data,
          id: Math.floor(Math.random() * 100),
          key: Math.floor(Math.random() * 100),
          current_balance: data.opening_balance,
          created_on: new Date(),
        },
      });
    }, 1750);
  } else {
    reject(new Error('New Account Head Creation Failed'));
  }
});
