const { Axios, getUrl } = require("./backEndApiCall");

export const login = async (id, password) => {
  try {
    const response = await Axios.post(getUrl(`/login`), {
      id,
      password,
    });
    if (response.code === 200) return response.message;
    throw new Error(response.message);
  } catch (e) {
    throw new Error(e.message);
  }
};
