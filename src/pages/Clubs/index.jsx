import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty-user.webp';
import { PublicContext } from '../../contexts/public';

import { Dialog, Transition } from '@headlessui/react'
import { infoMessage } from '../../components/UI/notify';

export default function ClubsPage() {

    // Geral
    const { loadUser, getEstadosList, getCidadesList, getMeusClubes, novoClube, alterarClube } = useContext(PublicContext);
    const [clubesList, setClubesList] = useState([]);
    const [estadosList, setEstadosList] = useState([]);
    const [cidadesList, setCidadesList] = useState([]);

    // Form
    const [isModalNew, setIsModalNew] = useState(false);
    const [openedModalClube, setOpenedModalClube] = useState(false);
    const [formDataClube, setFormDataClube] = useState({});
    const cancelClubeFormButtonRef = useRef(null)

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setClubesList([]);
        getMeusClubes().then((data) => {
            setClubesList(data);
        }).catch((exc) => {
            console.log(exc);
        });
        setEstadosList([]);
        getEstadosList().then((data) => {
            setEstadosList(data);
        }).catch((exc) => {
            console.log(exc);
        });
        getCidadesList([]);
        getCidadesList().then((data) => {
            setCidadesList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleClickAlterarClube = (clube) => {
        setFormDataClube(clube);
        setIsModalNew(false);
        setOpenedModalClube(true);
    }

    const handleClickNovoClube = () => {
        setFormDataClube([]);
        setIsModalNew(true);
        setOpenedModalClube(true);
    }

    const handleChangeClube = (e) => {
        const { name, value } = e.target;
        setFormDataClube((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitClube = async (e) => {
        e.preventDefault();
        formDataClube.tecnico = loadUser().id;
        if (!formDataClube.estado || formDataClube.estado == "null") {
            infoMessage("Selecione o estado");
            return false;
        }
        if (!formDataClube.cidade || formDataClube.cidade == "null") {
            infoMessage("Selecione a cidade");
            return false;
        }
        var success;
        if (isModalNew) {
            success = await novoClube(formDataClube);
        } else {
            success = await alterarClube(formDataClube);
        }
        if (success) {
            setOpenedModalClube(false);
            window.location.reload();
        }

    };

    return (
        <>
            {/* Listagem */}
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Minhas Equipes</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className='py-2 px-4 w-full'>
                            <button
                                type="button"
                                onClick={handleClickNovoClube}
                                className="float-right group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Nova Equipe
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {clubesList.map((clube) => (
                                <li key={clube.id} className="gap-x-6 py-5 px-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" onClick={() => { handleClickAlterarClube(clube) }}>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <img className="h-20 w-20 rounded-full bg-gray-50" src={empty} alt="" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="min-w-0 place-content-center">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{clube.nome}</p>
                                                <button
                                                    type="button"
                                                    className="mt-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
            {/* Modal clube */}
            <Transition.Root show={openedModalClube} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelClubeFormButtonRef} onClose={setOpenedModalClube}>
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
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmitClube} autoComplete="off">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    {isModalNew ? "Nova Equipe" : "Alterar Equipe"}
                                                </Dialog.Title>
                                                <div className="py-2">
                                                    <input
                                                        id="nome"
                                                        name="nome"
                                                        type="text"
                                                        required
                                                        value={formDataClube.nome}
                                                        onChange={handleChangeClube}
                                                        className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                        placeholder="Nome"
                                                    />
                                                </div>
                                                <div className="py-2">
                                                    <select
                                                        id="estado"
                                                        name="estado"
                                                        required
                                                        value={formDataClube.estado}
                                                        onChange={handleChangeClube}
                                                        className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                        placeholder="Estado"
                                                    >
                                                        <option value="null">Selecione o estado</option>
                                                        {estadosList && estadosList.map((estado) => {
                                                            return (
                                                                <option value={estado.id}>{estado.nome}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="py-2">
                                                    <select
                                                        id="cidade"
                                                        name="cidade"
                                                        required
                                                        value={formDataClube.cidade}
                                                        onChange={handleChangeClube}
                                                        className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                        placeholder="Cidade"
                                                    >
                                                        <option value="null">Selecione a cidade</option>
                                                        {cidadesList && cidadesList.map((cidade) => {
                                                            return (
                                                                <option value={cidade.id}>{cidade.nome}</option>
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
                                                onClick={() => setOpenedModalClube(false)}
                                                ref={cancelClubeFormButtonRef}>
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
