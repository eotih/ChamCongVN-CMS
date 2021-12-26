import AXIOS from 'axios';

const axios = AXIOS.create({
  baseURL: `http://localhost:11111/`
});
export default axios;
