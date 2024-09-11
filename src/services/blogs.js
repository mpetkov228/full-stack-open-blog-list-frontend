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

export default { getAll, create };