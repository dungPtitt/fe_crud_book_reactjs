import http from "../http-common";

const getAll = () => {
  return http.get("/get-laptop");
};

const get = async(id) => {
  return await http.get(`/get-laptop?id=${id}`);
};

const create = async data => {
  return await http.post("/create-laptop", data);
};

const update = (data) => {
  return http.put("/update-laptop", data);
};

const remove = id => {
  return http.delete(`/delete-laptop?id=${id}`);
};

const findByName = name => {
  return http.get(`/find-laptop?name=${name}`);
};
const laptopService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

export default laptopService;