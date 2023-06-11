import React, { useContext, useState } from "react";
import logo from '../../images/logo-playmate.png';
import PagesMenu from "../../components/public/PagesMenu";
import User from "../../models/User";
import { infoMessage } from "../../components/UI/notify";
import { PublicContext } from "../../contexts/public";

export default function RegisterPage() {

    const user = new User();

    const { register } = useContext(PublicContext);

    const [validatingRegister, setValidatingRegister] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        data_nascimento: null,
        tipo: user.TIPO_TECNICO,
        sexo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.confirm_password == formData.password) {
            setValidatingRegister(true);
            delete formData.confirm_password;
            formData.username = formData.email;
            await register(formData);
            setValidatingRegister(false);
        } else {
            infoMessage("Campos Senha e Confirmar Senha não são iguais");
        }
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
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
                        <div className="rounded-md shadow-sm">
                            {/* <div className="py-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Nome de usuário"
                                />
                            </div> */}
                            <div className="py-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="py-2">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Nome"
                                />
                            </div>
                            <div className="py-2">
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Sobrenome"
                                />
                            </div>
                            <div className="py-2">
                                <input
                                    id="data_nascimento"
                                    name="data_nascimento"
                                    type="date"
                                    required
                                    value={formData.data_nascimento}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Data de Nascimento"
                                />
                            </div>
                            <div className="py-2">
                                <select
                                    id="sexo"
                                    name="sexo"
                                    required
                                    value={formData.sexo}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Sexo"
                                >
                                    <option value="null">Selecione o seu sexo</option>
                                    {user && Object.entries(user.SEXO_LIST).map((sexo) => {
                                        return (
                                            <option value={sexo[0]}>{sexo[1]}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="py-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Senha"
                                />
                            </div>
                            <div className="py-2">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    required
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirmar Senha"
                                />
                            </div>
                            {/* Outros campos do formulário */}
                        </div>
                        <div>
                            <button
                                disabled={validatingRegister}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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