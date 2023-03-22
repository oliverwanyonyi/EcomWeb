export const getErrorMessage = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};
