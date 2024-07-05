import axios from "axios";
const baseUrl = 'http://localhost:3001/';

const getAllInfo = () => {
  const request = axios.get(baseUrl+'api/info');
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl+'api/phones');
  return request.then((response) => response.data);
};

const getAllFavourites = () => {
  const request = axios.get(baseUrl+'api/phones/favourites');
  return request.then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl+'api/phones', newObject).catch(error => {
    console.log(error.response.data.error)
  });
  /*
  return request.then((response) => response.data).catch(error => {
    console.log(error.response.data.error)
  });
  */
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}+'api/phones'/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update,getAllInfo,getAllFavourites };
