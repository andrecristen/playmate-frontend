import React, { useState } from "react";
import logo from '../../images/logo-playmate.png';
import PagesMenu from "../../components/public/PagesMenu";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        password: "",
        last_login: null,
        is_superuser: false,
        username: "",
        first_name: "",
        last_name: "",
        is_staff: false,
        is_active: false,
        date_joined: null,
        data_nascimento: null,
        email: "",
        tipo: null,
        sexo: null,
        observacao: "",
        clube: null,
        groups: [],
        user_permissions: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar os dados do formulário
        console.log(formData);
    };

    return (
        <>
            <PagesMenu />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
                            Registre-se na
                        </h2>
                        <img
                            className="mt-6 text-center"
                            src={logo}
                            alt="Your Company"
                        />
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Nome de usuário
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Nome de usuário"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Senha"
                                />
                            </div>
                            {/* Outros campos do formulário */}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};