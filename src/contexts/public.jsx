import React, { useState, useEffect, createContext } from "react";

import {
    auth,
    postUsuario,
    putUsuario,
    getUsuario,
    getCompeticoes,
    getEquipesIncompletas,
    getCategorias,
    getAtletasByTecnico,
    getEstados,
    getCidades,
    getClubes,
    postClube,
    putClube,
} from "../api/api-public"
import { errorMessage, infoMessage, successMessage } from "../components/UI/notify";
import { useNavigate } from "react-router-dom";
import User from "../models/User";

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();
    const userInstance = new User();

    useEffect(() => {

    }, []);

    const loadUser = () => {
        var userData = null;
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            userData = JSON.parse(userSession);
        }
        saveUser(userData);
        return userData;
    }

    const saveUser = (userData) => {
        localStorage.setItem("userSession", JSON.stringify(userData));
    }

    const login = async (email, password) => {
        const response = await auth(email, password);
        if (response.status == 200) {
            const loggedUser = response.data;
            saveUser(loggedUser);
            successMessage('Login realizado');
            navigate("/");
        } else {
            errorMessage('Não foi possível realizar o login com as credenciais informadas.');
            navigate("/login");
        }
    };

    const logout = () => {
        saveUser(null);
        infoMessage('Usuário deslogado');
    }

    const register = async (user) => {
        const response = await postUsuario(user);
        if (response.status == 200 || response.status == 201) {
            successMessage('Cadastro criado com sucesso.');
            navigate("/login");
        } else {
            errorMessage('Não foi possível realizar o cadastro.');
            if (response.data) {
                Object.entries(response.data).map((erro) => {
                    infoMessage(erro[1][0]);
                });
            }
            navigate("/register");
        }
    };

    const alterarUsuario = async (user) => {
        const response = await putUsuario(user);
        if (response.status == 200 || response.status == 201) {
            successMessage('Cadastro alterado com sucesso.');
            return true;
        } else {
            console.log(response);
            errorMessage('Não foi possível alterar o cadastro.');
            return false;
        }
    }

    const novoAtleta = async (user) => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        user.tipo = userInstance.TIPO_ATLETA;
        user.password = "PS" + timestamp;
        user.email = timestamp + "@playmate.com.br";
        user.username = "atleta" + timestamp;
        const response = await postUsuario(user);
        debugger;
        if (response.status == 200 || response.status == 201) {
            successMessage('Atleta criado com sucesso.');
            return true;
        } else {
            errorMessage('Não foi possível realizar o cadastro.');
            if (response.data) {
                Object.entries(response.data).map((erro) => {
                    infoMessage(erro[1][0]);
                });
            }
            return false;
        }
    }

    const consultarUsuario = async (userId) => {
        const response = await getUsuario(userId);
        if (response && response.status == 200 || response.status == 201) {
            return response.data;
        } else {
            return null;
        }
    }

    const getCompeticaoList = async () => {
        const response = await getCompeticoes();
        if (response.status == 200) {
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca das competições.');
            return false;
        }
    };

    const getEquipesIncompletasList = async (competicaoID, categoriaID) => {
        const response = await getEquipesIncompletas(competicaoID, categoriaID);
        if (response.status == 200) {
            var equipes = response.data;
            for (const [key, value] of Object.entries(equipes)) {
                value.tecnico = await consultarUsuario(value.tecnico)
                console.log(value);
            }
            return equipes;
        } else {
            errorMessage('Não foi possível a realizar busca de atletas da competição.');
            return false;
        }
    };

    const getCategoriasList = async () => {
        const response = await getCategorias();
        if (response.status == 200) {
            return response.data;
        } else {
            errorMessage('Não foi possível a realizar busca de categorias.');
            return false;
        }
    };

    const getMeusAtletas = async () => {
        const user = loadUser();
        if (user) {
            const response = await getAtletasByTecnico(user.id);
            if (response.status == 200) {
                return response.data;
            } else {
                errorMessage('Não foi possível a realizar busca dos seus atletas.');
                return false;
            }
        } else {
            infoMessage("Não localizado usuário para carregamento das informações.");
        }
    };

    const getMeusClubes = async () => {
        const user = loadUser();
        if (user) {
            const response = await getClubes(user.id);
            if (response.status == 200) {
                return response.data;
            } else {
                errorMessage('Não foi possível a realizar busca dos seus clubes.');
                return false;
            }
        } else {
            infoMessage("Não localizado usuário para carregamento das informações.");
        }
    };

    const novoClube = async (clube) => {
        const response = await postClube(clube);
        if (response.status == 200 || response.status == 201) {
            successMessage('Clube criado com sucesso.');
            return true;
        } else {
            errorMessage('Não foi possível realizar o cadastro.');
            if (response.data) {
                Object.entries(response.data).map((erro) => {
                    infoMessage(erro[1][0]);
                });
            }
            return false;
        }
    };

    const alterarClube = async (clube) => {
        const response = await putClube(clube);
        if (response.status == 200 || response.status == 201) {
            successMessage('Clube alterado com sucesso.');
            return true;
        } else {
            errorMessage('Não foi possível realizar a alteração cadastro.');
            if (response.data) {
                Object.entries(response.data).map((erro) => {
                    infoMessage(erro[1][0]);
                });
            }
            return false;
        }
    };

    const getEstadosList = async () => {
        const response = await getEstados();
        if (response.status == 200) {
            console.log(response);
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca de estados.');
            return false;
        }
    };

    const getCidadesList = async (estado) => {
        const response = await getCidades(estado);
        if (response.status == 200) {
            console.log(response);
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca de cidades do estado.');
            return false;
        }
    };

    return (
        <PublicContext.Provider
            value={{
                loadUser,
                login,
                logout,
                register,
                alterarUsuario,
                novoAtleta,
                getCompeticaoList,
                getEquipesIncompletasList,
                getCategoriasList,
                getMeusAtletas,
                getMeusClubes,
                novoClube,
                alterarClube,
                getEstadosList,
                getCidadesList
            }}>
            {children}
        </PublicContext.Provider>
    );
}