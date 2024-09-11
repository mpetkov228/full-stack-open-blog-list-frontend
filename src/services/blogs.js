import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = ({ title, author, url, user }) => {
  const response = axios.post(
    baseUrl,
    { title, author, url }, 
    { headers: { 'Authorization': `Bearer ${user.token}` }}
  );
  
  return response.then(r => console.log(r));
};

export default { getAll, create };