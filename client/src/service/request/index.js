import axios from 'axios';
import Cookies from 'universal-cookie';
import crypt from '../utils/cryptoUtils';
//todo link api
let baseURL = 'https://localhost:8080/api';
const RequestManager = {};

function getKey() {
  //TODO
  return '5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)';
}

function getCookiesToken(){
  var cookies = new Cookies();
  var encToken = cookies.get('jwt_token');
  if(!encToken) return undefined;
  return crypt.decrypt(getKey(),encToken);
}

function getHeader(){
  var token = getCookiesToken();
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer "+token,
    };
}

RequestManager.get =  async (ressource,object) => {
    var request = {};
    request.method = 'GET';
    request.headers = getHeader();
    //request.body = JSON.stringify(object);
    let res = await fetch(baseURL+''+ressource+""+object,request);
    if(!res.ok)throw new Error('request error'+res);
    else return await res.json();
};

RequestManager.post = async (ressource,object) => {
  var request = {};
  request.method = 'POST';
  request.headers = getHeader();
  request.body = JSON.stringify(object);
  let res = await fetch(baseURL+''+ressource, request);
  if(!res.ok) throw new Error('request error'+res);
  else return res;
};

RequestManager.put = async (ressource,object) => {
  var request = {};
  request.method = 'PUT';
  request.headers = getHeader();
  request.body = JSON.stringify(object);
  let res = await fetch(baseURL+''+ressource, request);
  if(!res.ok) throw new Error('request error'+res);
  else return res;
};

RequestManager.delete = (ressource,object) => {
  axios.delete(baseURL+''+ressource, object)
    .then(res => { return res; })
    .catch((error) => { return error; })
};

export default RequestManager;

