import axios from "axios";

export const URL_API = "http://localhost:8000/api";

export const api = axios.create({
    baseURL: URL_API,
});

export const getCompeticao = async () => {
    return api.get('/v1/competicao/').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}
