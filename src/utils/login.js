const { Axios, getUrl } = require("./backEndApiCall");

export const login = async (id, password) => {
    const response = await Axios.post(getUrl(`/login`), {
      id,
      password,
    });
    if(response.data.message)
      throw new Error(response.data.message)
};
