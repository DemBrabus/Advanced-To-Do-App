import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://adv-to-do.firebaseio.com/'
});

export default instance;