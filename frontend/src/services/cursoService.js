import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cursos';

export const getCursos = () => {
  return axios.get(API_URL);
};
