import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty-user.webp';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCategorias } from '../../api/api-public';

export default function TeamsPage() {

    let { competicao } = useParams();

    const navigate = useNavigate();
    const { getEquipesIncompletasList, getCategoriasList } = useContext(PublicContext);

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [categoriasList, setCategoriasList] = useState([]);
    const [equipesList, setEquipesList] = useState([]);

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
            console.log(data);
            setEquipesList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleClickComepeticao = (id) => {
        navigate("/teams/" + id);
    }

    const handleSelectCategoria = async (event) => {
        setCategoriaSelecionada(event.target.value);
    }

    const getCategoriaEquipe = (categoriaID) => {
        return categoriasList.map((categoria) => {
            if (categoria.id == categoriaID) {
                return categoria.nome;
            }
        });
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
                                <li key={equipe.id} className="flex justify-center gap-x-6 py-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" onClick={() => { handleClickComepeticao(equipe.id) }}>
                                    <div className="flex gap-x-5 mx-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={empty} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{equipe.nome}</p>
                                            <p className="text-sm leading-6 text-gray-900">Técnico:</p>
                                            <p className="text-sm leading-6 text-gray-600">{equipe.tecnico.first_name + " " + equipe.tecnico.last_name}</p>
                                            <p className="text-sm leading-6 text-gray-900">Atleta:</p>
                                            <p className="text-sm leading-6 text-gray-600">{equipe.atleta.first_name + " " + equipe.atleta.last_name}</p>
                                            <p className="text-sm leading-6 text-gray-900">Categoria:</p>
                                            <p className="text-sm leading-6 text-gray-600">{getCategoriaEquipe(equipe.categoria)}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {!equipesList || !equipesList.length ? "Sem equipes" : ""}
                        </ul>
                    </div>
                </main>
            </div>
        </>
    )
}
