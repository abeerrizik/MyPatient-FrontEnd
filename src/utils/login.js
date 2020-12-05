const { Axios, getUrl } = require("./backEndApiCall");

export const login = async (id, password) => {
  const response = await Axios.post(getUrl(`/login`), {
    id,
    password,
  });
  if (response.data.code !== 200) throw new Error(response.data.message);
};

export const logout = ()=>{
   return  Axios.get(getUrl(`/logout`));

}

export const getNurseSchedule = async () => {
  const response = await Axios.get(getUrl(`/nurse/schedule`));
  return response.data;
};

export const updateStatus = async (treatmentId, status) => {
  const response = await Axios.post(getUrl(`/treatment`), {
    treatmentId,
    status,
  });
};
export const getNurseData = async () => {
  const response = await Axios.get(getUrl(`/nurse`));

  return response.data;
};

export const getTreatmentData = async (id) => {
  const response = await Axios.get(getUrl(`/treatment/${id}`));

  return response.data;
};
