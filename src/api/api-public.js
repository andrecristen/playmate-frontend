import axios from "axios";

export const URL_API = "http://localhost:8000/api";

export const api = axios.create({
    baseURL: URL_API,
});

export const auth = async (email, password) => {
    return api.post('/api/v1/auth/', { username: email, password }).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getCompeticoes = async () => {
    return api.get('/v1/competicao/').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getEquipesIncompletas = async (competicaoID, categoriaId) => {
    return api.get('/v1/equipe/?completed=false').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getCategorias = async () => {
    return api.get('/v1/categoria/').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}
