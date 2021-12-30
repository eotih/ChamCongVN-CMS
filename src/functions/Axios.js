import AXIOS from 'axios';

const axios = AXIOS.create({
  baseURL: `${process.env.REACT_APP_WEB_API}`
});
export default axios;
