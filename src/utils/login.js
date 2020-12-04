const { Axios, getUrl } = require("./backEndApiCall");

export const login = async (id, password) => {
    const response = await Axios.post(getUrl(`/login`), {
        id,
        password,
    });
    if (response.data.code !== 200)
        throw new Error(response.data.message)
}

export const home = async () => {
  const response = await Axios.get(getUrl(`/nurse/schedule`));
  if (response.data.message) throw new Error(response.data.message);
};
