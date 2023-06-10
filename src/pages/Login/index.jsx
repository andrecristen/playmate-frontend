import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty.png';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo-playmate.png';

export default function LoginPage() {

    const navigate = useNavigate();
    const { getEquipesIncompletasList, getCategoriasList } = useContext(PublicContext);

    const handleClickComepeticao = (id) => {
        navigate("/teams/" + id);
    }

    const handleSelectCategoria = async (event) => {
    }


    return (
        <>
            <PagesMenu />
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-sm">
                    <img
                        src={logo}
                        alt="Logo login" />
                </div>
                <div className="md:w-1/3 max-w-sm">
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Login" />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Senha" />
                    <div className="text-center md:text-center">
                        <button className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
                    </div>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Ainda não possui uma conta? <a className="text-red-600 hover:underline hover:underline-offset-4" href="/register">Crie agora</a>
                    </div>
                </div>
            </section>
        </>
    )
}