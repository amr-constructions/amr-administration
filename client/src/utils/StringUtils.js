const replaceAll = function (str, searchValue, replaceValue) {
  if (!str) {
    return 'undefined';
  }

  if (String.prototype.replaceAll) {
    return str.replaceAll(searchValue, replaceValue);
  }

  if (searchValue === null && replaceValue === null) {
    return str;
  } if (replaceValue === undefined) {
    return 'undefined';
  }

  let outStr = str;
  for (let i = 0, l = str.length; i < l; ++i) {
    if (outStr.indexOf(outStr, searchValue) !== -1) {
      outStr = outStr.replace(searchValue, replaceValue);
    } else {
      break;
    }
  }

  return outStr;
};

export default replaceAll;
