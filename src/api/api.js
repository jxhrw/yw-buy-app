import axios from 'axios';
const base = '/api';
let api = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//
export const liunst = parms => {
  return axios.post(`${base}/search/h5/query`, `data=${parms}`)
};
