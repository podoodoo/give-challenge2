export const delay = function (msToTimeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, msToTimeout);
  });
};

const alphanumeric =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (numberOfChars) => {
  let str = "";

  for (let charNum = 0; charNum < numberOfChars; charNum++) {
    str += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  }

  return str;
};
