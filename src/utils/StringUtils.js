import isEmpty from 'lodash/isEmpty';

const truncateStringWithSuffix = (str, maxlen, suffix = '...') => {
  if (str.length <= maxlen || suffix.length >= maxlen) {
    return str;
  }
  return `${str.slice(0, maxlen - suffix.length)}${suffix}`;
};

const appendErrorMessage = (messagePrefix, err) => {
  let message = messagePrefix;
  if (!isEmpty(err?.message)) {
    message = `${messagePrefix}, error message: ${err.message}`;
  }
  console.log(message, err);
  return message;
};

export { truncateStringWithSuffix, appendErrorMessage };
