import React, { useState, useEffect, createContext } from "react";

import { getCompeticoes, getEquipesIncompletas, getCategorias } from "../api/api-public"
import { errorMessage, infoMessage, successMessage } from "../components/UI/notify";

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

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
                getCompeticaoList,
                getEquipesIncompletasList,
                getCategoriasList
            }}>
            {children}
        </PublicContext.Provider>
    );
}