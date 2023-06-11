import React, { useState, useEffect, createContext } from "react";

import { auth, getCompeticoes, getEquipesIncompletas, getCategorias } from "../api/api-public"
import { errorMessage, infoMessage, successMessage } from "../components/UI/notify";
import { useNavigate } from "react-router-dom";

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
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

    const getCompeticaoList = async () => {
        const response = await getCompeticoes();
        if (response.status == 200) {
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca das competições.');
            return false;
        }
    };

    const getEquipesIncompletasList = async (competicaoID) => {
        const response = await getEquipesIncompletas(competicaoID);
        if (response.status == 200) {
            return response.data;
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

    return (
        <PublicContext.Provider
            value={{
                login,
                logout,
                loadUser,
                getCompeticaoList,
                getEquipesIncompletasList,
                getCategoriasList
            }}>
            {children}
        </PublicContext.Provider>
    );
}