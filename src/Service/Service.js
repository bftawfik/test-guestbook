import axios from "axios";
import Cookie from "js-cookie";

const addUser = user => {
  return axios
    .post("http://localhost:5000/users/add", user)
};

const login = user => {
  return axios.post("http://localhost:5000/users/login", user);
};

const authenticate = token => {  
  return axios.get("http://localhost:5000/users/auth", {
    headers: { "x-auth-token": token }
  });
};

const getAllUsers = () => {
  return axios
    .get("http://localhost:5000/users/")
};

const addAuthCookie = (id, token) => {
  Cookie.set(id, token);
};

const getAuthCookie = id => {
  return Cookie.get(id);
};

const removeAuthCookie = id => {
  Cookie.remove(id);
};

const addMessage = message => {
  return axios
    .post("http://localhost:5000/messages/add", message)
};

const getAllMessages = () => {
  return axios
    .get("http://localhost:5000/messages/")
};

const deleteMessage = id => {
  return axios
    .delete("http://localhost:5000/messages/delete/" + id)
};

export {
  addUser,
  login,
  authenticate,
  getAllUsers,
  addAuthCookie,
  getAuthCookie,
  removeAuthCookie,
  addMessage,
  getAllMessages,
  deleteMessage
};
