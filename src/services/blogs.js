import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = ({ title, author, url, user }) => {
  axios.post(
    baseUrl,
    { title, author, url }, 
    { headers: { 'Authorization': `Bearer ${user.token}` }}
  );
};

const update = (id, blog) => {
  axios.put(
    `${baseUrl}/${id}`, 
    blog, 
    { headers: { 'Authorization': `Bearer ${blog.user.token}`}}
  );
};

const del = (id, token) => {
  axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export default { getAll, create, update, del };