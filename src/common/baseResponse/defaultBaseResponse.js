const defaultBaseResponse = (status, data, message) => {
  return {
    status,
    data,
    message,
    timestamp: new Date().toISOString(), // current timestamp
  };
};

module.exports = defaultBaseResponse;
