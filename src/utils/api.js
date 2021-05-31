import axios from 'axios';
import {SERVER_URL} from './constants'

export const server = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});

