const { Axios, getUrl } = require("./backEndApiCall");

export const login = async (id, password) => {
  try {
    const response = await Axios.post(getUrl(`/login`), {
      id,
      password,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
