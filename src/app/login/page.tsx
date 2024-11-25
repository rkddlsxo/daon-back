import axios from 'axios';

// baseURL을 4999로 수정
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4999';

// axios instance 생성
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
}); 