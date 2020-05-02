import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todolist-80427.firebaseio.com/' 
  
});

export default instance;