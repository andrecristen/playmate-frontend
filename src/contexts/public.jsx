import React, { useState, useEffect, createContext } from "react";

import { getCompeticao } from "../api/api-public"
import { errorMessage, infoMessage, successMessage } from "../components/UI/notify";

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const getCompeticaoList = async () => {
        const response = await getCompeticao();
        if (response.status == 200) {
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca das competições.');
            return false;
        }
    };

    return (
        <PublicContext.Provider
            value={{
                getCompeticaoList
            }}>
            {children}
        </PublicContext.Provider>
    );
}