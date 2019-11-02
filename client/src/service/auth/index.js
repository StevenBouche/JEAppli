import request from '../request';
import Cookies from 'universal-cookie';
import crypt from '../utils/cryptoUtils';

const AuthManager = {};

function getKey() {
  //TODO
  return '5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)';
}

function setCookiesToken(token){
  var encToken = crypt.encrypt(getKey(), token);
  var cookies = new Cookies();
  cookies.set('jwt_token', encToken, {path: '/'});
}

function getCookiesToken(){
  var cookies = new Cookies();
  var encToken = cookies.get('jwt_token');
  if(!encToken) return undefined;
  return crypt.decrypt(getKey(),encToken);
}

AuthManager.isLogin = () => {
  var token = getCookiesToken();
  if(!token) return false;
  else return true;
};

AuthManager.login = async (email, password ) => {
  var user = {
    'email' : email,
    'password' : password
  };
  var res = await request.post('/user/login', user);
  res = await res.json();
  if(!res.token) throw new Error('Token null');
  setCookiesToken(res.token);
};

AuthManager.logout = async () => {
  var res = await request.post('/user/logout',{});
  if(res.ok) {
    var cookies = new Cookies();
    cookies.remove('jwt_token', {path: '/'});
  }
};

AuthManager.register = async (username, email, password) => {

  var user = {
    'name' : username,
    'email' : email,
    'password' : password
  };

  var res = await request.post('/user', user);
  res = await res.json();
  
  if(!res.token) throw new Error('Token null');
  setCookiesToken(res.token);
};

export default AuthManager;
