import axios from "axios";

export const API = axios.create({
    baseURL: 'http://localhost/serviunix',
    withCredentials: true
});