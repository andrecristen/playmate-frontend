import axios from "axios";
import User from "../models/User";

export const URL_API = "http://localhost:8000/api";

export const api = axios.create({
    baseURL: URL_API,
});

export const auth = async (email, password) => {
    return api.post('/v1/auth/', { username: email, password: password }).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const postUsuario = async (user) => {
    return api.post('/v1/usuario/', user).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const putUsuario = async (user) => {
    return api.put('/v1/usuario/' + user.id + '/', user).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getUsuario = async (userID) => {
    return api.get('/v1/usuario/' + userID + '/').then((result) => {
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
    var filters = "?completed=false";
    if (competicaoID && competicaoID != "null") {
        filters += "&competicao_id=" + competicaoID;
    }
    if (categoriaId && categoriaId != "null") {
        filters += "&categoria_id=" + categoriaId;
    }
    return api.get('/v1/equipe/' + filters).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getAtletasByTecnico = async (tecnicoID) => {
    const user = new User();
    return api.get('/v1/usuario/?tipo=' + user.TIPO_ATLETA + '&clube__tecnico_id=' + tecnicoID).then((result) => {
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
