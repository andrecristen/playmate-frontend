import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty-user.webp';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { infoMessage, errorMessage } from '../../components/UI/notify';
import User from "../../models/User";

export default function TeamsPage() {

    let { competicao } = useParams();

    const navigate = useNavigate();
    const { getEquipesIncompletasList, getCategoriasList, loadUser, getMeusAtletas, criarSolicitacaoEquipeAtleta, novaEquipe } = useContext(PublicContext);


    const tecnicoLogado = loadUser();
    const user = new User();

    //Geral
    const [categoriasList, setCategoriasList] = useState([]);
    const [equipesList, setEquipesList] = useState([]);
    const [atletasList, setAtletasList] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    //Form Solicitação
    const [equipeSolicitacao, setEquipeSolicitacao] = useState(null);
    const [categoriaSolicitacao, setCategoriaSolicitacao] = useState(null);
    const [openedModalSolicitacao, setOpenedModalSolicitacao] = useState(false)
    const [formDataSolicitacao, setFormDataSolicitacao] = useState({});
    const cancelButtonSolicitacaoRef = useRef(null)

    //Form criação
    const [categoriaCriacao, setCategoriaCriacao] = useState(null);
    const [openedModalCriacao, setOpenedModalCriacao] = useState(false)
    const [formDataCriacao, setFormDataCriacao] = useState({});
    const cancelButtonCriacaoRef = useRef(null)

    useEffect(() => {
        load();
    }, [categoriaSelecionada]);

    const load = () => {
        setCategoriasList([]);
        getCategoriasList().then((data) => {
            setCategoriasList(data);
        }).catch((exc) => {
            console.log(exc);
        });
        setEquipesList([]);
        getEquipesIncompletasList(competicao, categoriaSelecionada).then((data) => {
            setEquipesList(data);
        }).catch((exc) => {
            console.log(exc);
        });
        setAtletasList([]);
        if (tecnicoLogado) {
            getMeusAtletas().then((data) => {
                setAtletasList(data);
            }).catch((exc) => {
                console.log(exc);
            });
        }
    }

    const handleSelectCategoria = async (event) => {
        setCategoriaSelecionada(event.target.value);
    }

    const handleClickSolicitarFormacaoEquipe = async (id) => {
        if (!tecnicoLogado) {
            navigate("/login");
            return;
        }
        setFormDataSolicitacao([]);
        let equipe = await getEquipe(id);
        setEquipeSolicitacao(equipe);
        let categoria = await getCategoria(equipe.categoria)
        setCategoriaSolicitacao(categoria);
        setOpenedModalSolicitacao(true);
    }

    const getEquipe = (equipeID) => {
        var equipe = equipesList.filter(equipe => equipe.id == equipeID)
        if (equipe && equipe[0]) {
            return equipe[0];
        }
        return null;
    }

    const getCategoria = (categoriaID) => {
        var categoria = categoriasList.filter(categoria => categoria.id == categoriaID)
        if (categoria && categoria[0]) {
            return categoria[0];
        }
        return null;
    }

    const getAtleta = (altetaID) => {
        var atleta = atletasList.filter(atleta => atleta.id == altetaID)
        if (atleta && atleta[0]) {
            return atleta[0];
        }
        return null;
    }

    const getCategoriaNome = (categoriaID) => {
        var categoria = getCategoria(categoriaID);
        if (categoria) {
            return categoria.nome;
        }
        return "Categoria não identificada";
    }

    const handleChangeSolicitacao = (e) => {
        const { name, value } = e.target;
        setFormDataSolicitacao((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculaIdade = (nascimento) => {
        if (nascimento) {
            nascimento = createDateFromString(nascimento);
            var hoje = new Date();
            var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
            if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
                new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
                diferencaAnos--;
            return diferencaAnos;
        } else {
            return 0;
        }
    }

    const createDateFromString = (dateString) => {
        var parts = dateString.split("-");
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1;
        var day = parseInt(parts[2]);
        return new Date(year, month, day);
    }

    const handleSubmitSolicitarFormacaoEquipe = async (e) => {
        e.preventDefault();
        var success;
        if (tecnicoLogado) {
            if (!formDataSolicitacao.atleta || formDataSolicitacao.atleta == "null") {
                infoMessage("Selecione o atleta");
                return false;
            }
            var atletaSelecionado = getAtleta(formDataSolicitacao.atleta);
            var categoriaEquipeSelecionada = getCategoria(equipeSolicitacao.categoria);
            var idadeAtleta = calculaIdade(atletaSelecionado.data_nascimento);
            if (idadeAtleta > categoriaEquipeSelecionada.idade_maxima) {
                errorMessage("O atleta é velho demais para a categoria da equipe desejada. Selecione outro atleta.");
                return false;
            }
            if (idadeAtleta < categoriaEquipeSelecionada.idade_minima) {
                errorMessage("O atleta é novo demais para a categoria da equipe desejada. Selecione outro atleta.");
                return false;
            }
            success = await criarSolicitacaoEquipeAtleta(equipeSolicitacao.id, atletaSelecionado.id);
        } else {
            debugger;
            // success = await alterarUsuario(formDataSolicitacao);
        }
        if (success) {
            setOpenedModalSolicitacao(false);
            window.location.reload();
        }
    };

    const handleChangeCriacao = (e) => {
        const { name, value } = e.target;
        setFormDataCriacao((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleClickNovaEquipeAtleta = async() => {
        setFormDataCriacao([]);
        setOpenedModalCriacao(true);
    }

    const handleSubmitSolicitarCriacaoEquipe = async(e) => {
        debugger;
        e.preventDefault();
        if (!formDataCriacao.atleta || formDataCriacao.atleta == "null") {
            infoMessage("Selecione o atleta");
            return false;
        }
        if (!formDataCriacao.categoria || formDataCriacao.categoria == "null") {
            infoMessage("Selecione a categoria");
            return false;
        }
        var atletaSelecionado = getAtleta(formDataCriacao.atleta);
        var categoriaEquipeSelecionada = getCategoria(formDataCriacao.categoria);
        var idadeAtleta = calculaIdade(atletaSelecionado.data_nascimento);
        if (idadeAtleta > categoriaEquipeSelecionada.idade_maxima) {
            errorMessage("O atleta é velho demais para a categoria da equipe desejada. Selecione outro atleta.");
            return false;
        }
        if (idadeAtleta < categoriaEquipeSelecionada.idade_minima) {
            errorMessage("O atleta é novo demais para a categoria da equipe desejada. Selecione outro atleta.");
            return false;
        }
        var success = await novaEquipe(competicao, formDataCriacao.categoria, formDataCriacao.atleta);
        if (success) {
            setOpenedModalSolicitacao(false);
            window.location.reload();
        }
    }

    return (
        <>
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Atletas Disponíveis</h1>
                    </div>
                </header>
                <main>
                    {tecnicoLogado ? <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className='py-2 px-4 w-full'>
                            <button
                                type="button"
                                onClick={handleClickNovaEquipeAtleta}
                                className="float-right group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Cadastrar Meu Atleta
                            </button>
                        </div>
                    </div> : ""}
                    
                    <div className="mx-4 my-4">
                        <label for="categorias" class="block mb-2 text-sm font-medium text-purple-900 dark:text-purple">Categoria:</label>
                        <select value={categoriaSelecionada} onChange={handleSelectCategoria} id="categorias" class="bg-purple-50 border border-purple-300 text-purple-600 text-sm rounded-lg block w-full p-2.5">
                            <option value="null">Todas as categorias</option>
                            {categoriasList && categoriasList.map((categoria, index) => {
                                return (
                                    <option value={categoria.id}>{categoria.nome}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {equipesList && equipesList.map((equipe) => (
                                <li key={equipe.id} className="flex justify-center gap-x-6 py-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" onClick={() => { handleClickSolicitarFormacaoEquipe(equipe.id) }}>
                                    <div className="flex gap-x-5 mx-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={empty} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{equipe.nome}</p>
                                            <p className="text-sm leading-6 text-gray-900">Técnico:</p>
                                            <p className="text-sm leading-6 text-gray-600">{equipe.tecnico ? equipe.tecnico.first_name + " " + equipe.tecnico.last_name : ""}</p>
                                            <p className="text-sm leading-6 text-gray-900">Atleta:</p>
                                            <p className="text-sm leading-6 text-gray-600">{equipe.atleta ? equipe.atleta.first_name + " " + equipe.atleta.last_name : ""}</p>
                                            <p className="text-sm leading-6 text-gray-900">Categoria:</p>
                                            <p className="text-sm leading-6 text-gray-600">{getCategoriaNome(equipe.categoria)}</p>
                                            <button
                                                type="button"
                                                className="mt-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            >
                                                Solicitar formação de equipe
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {!equipesList || !equipesList.length ? "Sem equipes" : ""}
                        </ul>
                    </div>
                </main>
            </div>
            {/* Modal formação equipe */}
            <Transition.Root show={openedModalSolicitacao} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonSolicitacaoRef} onClose={setOpenedModalSolicitacao}>
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
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmitSolicitarFormacaoEquipe} autoComplete="off">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Solicitação de formação de equipe
                                                </Dialog.Title>
                                                {categoriaSolicitacao
                                                    ?
                                                    <>
                                                        <div className="flex gap-x-5 mt-4">
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm leading-6 text-gray-900">Categoria: {categoriaSolicitacao.nome}</p>
                                                                <p className="text-sm leading-6 text-gray-900">Idade mínima: {categoriaSolicitacao.idade_minima}</p>
                                                                <p className="text-sm leading-6 text-gray-900">Idade máxima: {categoriaSolicitacao.idade_maxima}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    ""}

                                                {tecnicoLogado ?
                                                    <div className="py-2">
                                                        <select
                                                            id="atleta"
                                                            name="atleta"
                                                            required
                                                            value={formDataSolicitacao.atleta}
                                                            onChange={handleChangeSolicitacao}
                                                            className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                            placeholder="Atleta"
                                                        >
                                                            <option value="null">Selecione o atleta</option>
                                                            {atletasList && atletasList.map((atleta) => {
                                                                return (
                                                                    <option value={atleta.id}>{atleta.first_name + " " + atleta.last_name} - Idade: {calculaIdade(atleta.data_nascimento)}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    :
                                                    <>
                                                        <div className="py-2">
                                                            <input
                                                                id="first_name"
                                                                name="first_name"
                                                                type="text"
                                                                required
                                                                value={formDataSolicitacao.first_name}
                                                                onChange={handleChangeSolicitacao}
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
                                                                value={formDataSolicitacao.last_name}
                                                                onChange={handleChangeSolicitacao}
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
                                                                value={formDataSolicitacao.data_nascimento}
                                                                onChange={handleChangeSolicitacao}
                                                                className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                                placeholder="Data de Nascimento"
                                                            />
                                                        </div>
                                                        <div className="py-2">
                                                            <select
                                                                id="sexo"
                                                                name="sexo"
                                                                required
                                                                value={formDataSolicitacao.sexo}
                                                                onChange={handleChangeSolicitacao}
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
                                                    </>
                                                }
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
                                                onClick={() => setOpenedModalSolicitacao(false)}
                                                ref={cancelButtonSolicitacaoRef}>
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
            {/* Modal formação equipe */}
            <Transition.Root show={openedModalCriacao} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonCriacaoRef} onClose={setOpenedModalCriacao}>
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
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmitSolicitarCriacaoEquipe} autoComplete="off">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Cadastrar Atleta
                                                </Dialog.Title>
                                                <div className="py-2">
                                                        <select
                                                            id="categoria"
                                                            name="categoria"
                                                            required
                                                            value={formDataSolicitacao.categoria}
                                                            onChange={handleChangeCriacao}
                                                            className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                            placeholder="Categoria"
                                                        >
                                                            <option value="null">Selecione a categoria</option>
                                                            {categoriasList && categoriasList.map((categoria) => {
                                                                return (
                                                                    <option value={categoria.id}>{categoria.nome}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                <div className="py-2">
                                                        <select
                                                            id="atleta"
                                                            name="atleta"
                                                            required
                                                            value={formDataSolicitacao.atleta}
                                                            onChange={handleChangeCriacao}
                                                            className="rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                                            placeholder="Atleta"
                                                        >
                                                            <option value="null">Selecione o atleta</option>
                                                            {atletasList && atletasList.map((atleta) => {
                                                                return (
                                                                    <option value={atleta.id}>{atleta.first_name + " " + atleta.last_name} - Idade: {calculaIdade(atleta.data_nascimento)}</option>
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
                                                onClick={() => setOpenedModalCriacao(false)}
                                                ref={cancelButtonCriacaoRef}>
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
