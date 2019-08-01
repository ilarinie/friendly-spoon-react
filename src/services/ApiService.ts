import axios from 'axios';
import { UserProfile } from '../state/types/UserProfile';


const API_URL = process.env.REACT_APP_API_URL;


const setHeaders = (headers: any) => {
  axios.defaults.headers.common = headers;
  localStorage.setItem('headers', JSON.stringify(headers));
}

export const validateLogin = async (): Promise<UserProfile> => {
  try {
    const headers = JSON.parse(localStorage.getItem('headers') as string);
    setHeaders(headers);
    const response = await axios.get(API_URL + '/auth/validate_token');
    setHeaders(response.headers);
    return Promise.resolve(response.data.data as UserProfile)
  } catch (err) {
    return Promise.reject('Could not validate login');
  }
}


export const doLogin = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const response = await axios.post(API_URL + '/auth/sign_in', { email, password });
    setHeaders(response.headers);
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject('Could not log in');
  }

}

export const doPost = async <T>(path: string, data: any): Promise<T> => {
  const response = await axios.post(path, data);
  console.debug('RESPONSE FROM THE SERVER');
  console.debug(response.data);

  return Promise.resolve({} as T);
}

export const doGet = async <T>(path: string): Promise<T> => {
  const response = await axios.get(API_URL + path);
  return Promise.resolve(response.data as T);
}