import http from "../http-common";

const getAll = () => {
  return http.get("/get-book");
};

const get = async(id) => {
  return await http.get(`/get-book?id=${id}`);
};

const create = async data => {
  return await http.post("/create-book", data);
};

const update = (data) => {
  return http.put("/update-book", data);
};

const remove = id => {
  return http.delete(`/delete-book?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-book?name=${name}`);
};
const bookService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default bookService;