const truncateStringWithSuffix = (str, maxlen, suffix = '...') => {
  if (str.length <= maxlen || suffix.length >= maxlen) {
    return str;
  }
  return `${str.slice(0, maxlen - suffix.length)}${suffix}`;
};

export { truncateStringWithSuffix };
