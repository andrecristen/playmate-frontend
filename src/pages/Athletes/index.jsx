import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty-user.webp';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';
import User from "../../models/User";

import { Dialog, Transition } from '@headlessui/react'

export default function AthletesPage() {

    const navigate = useNavigate();
    const { getMeusAtletas } = useContext(PublicContext);
    const [atletasList, setAtletasList] = useState([]);
    const user = new User();

    const [openedModal, setOpenedModal] = useState(false)

    const [formDataUpdateaAtleta, setFormDataUpdateaAtleta] = useState({});

    const handleChangeUpdateaAtleta = (e) => {
        const { name, value } = e.target;
        setFormDataUpdateaAtleta((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitUpdateaAtleta = async (e) => {
        e.preventDefault();
        setOpenedModal(false);

    };

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setAtletasList([]);
        getMeusAtletas().then((data) => {
            console.log(data);
            setAtletasList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleClickAlterarAltleta = (atleta) => {
        console.log(atleta)
        setFormDataUpdateaAtleta(atleta);
        setOpenedModal(true);
    }


    return (
        <>
            {/* Listagem */}
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Meus Atletas</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {atletasList.map((atleta) => (
                                <li key={atleta.id} className="gap-x-6 py-5 px-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" onClick={() => { handleClickAlterarAltleta(atleta) }}>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <img className="h-20 w-20 rounded-full bg-gray-50" src={empty} alt="" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="min-w-0 place-content-center">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{atleta.first_name + " " + atleta.last_name}</p>
                                                <p className="text-sm leading-6 text-gray-400">Data de nasicmento:</p>
                                                <p className="text-sm leading-6 text-gray-400">{atleta.data_nascimento}</p>
                                                <p className="text-sm leading-6 text-gray-400">Sexo:</p>
                                                <p className="text-sm leading-6 text-gray-400">{user.SEXO_LIST[atleta.sexo]}</p>
                                                <button
                                                    type="button"
                                                    className="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                >
                                                    Alterar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
            {/* Modal editar usuário */}
            <Transition.Root show={openedModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenedModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="w-full flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmitUpdateaAtleta} autoComplete="off">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Alterar Atleta
                                                </Dialog.Title>
                                                <div className="py-2">
                                                    <input
                                                        id="first_name"
                                                        name="first_name"
                                                        type="text"
                                                        required
                                                        value={formDataUpdateaAtleta.first_name}
                                                        onChange={handleChangeUpdateaAtleta}
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
                                                        value={formDataUpdateaAtleta.last_name}
                                                        onChange={handleChangeUpdateaAtleta}
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
                                                        value={formDataUpdateaAtleta.data_nascimento}
                                                        onChange={handleChangeUpdateaAtleta}
                                                        className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                        placeholder="Data de Nascimento"
                                                    />
                                                </div>
                                                <div className="py-2">
                                                    <select
                                                        id="sexo"
                                                        name="sexo"
                                                        required
                                                        value={formDataUpdateaAtleta.sexo}
                                                        onChange={handleChangeUpdateaAtleta}
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
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpenedModal(false)}
                                                ref={cancelButtonRef}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
