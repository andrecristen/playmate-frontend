import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty.png';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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


    return (
        <>
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Atletas</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <label for="categorias" class="block mb-2 text-sm font-medium text-purple-900 dark:text-purple">Categoria:</label>
                        <select value={categoriaSelecionada} onChange={handleSelectCategoria} id="categorias" class="bg-purple-50 border border-purple-300 text-purple-600 text-sm rounded-lg block w-full p-2.5">
                            <option value="null">Selecione uma categoria</option>
                            {categoriasList && categoriasList.map((categoria, index) => {
                                return (
                                    <option value={categoria.id}>{categoria.nome}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {equipesList.map((equipe) => (
                                <li key={equipe.email} className="flex justify-center gap-x-6 py-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" onClick={() => { handleClickComepeticao(equipe.id) }}>
                                    <div className="flex gap-x-5 mx-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={empty} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{equipe.nome}</p>
                                            <p className="text-sm leading-6 text-gray-400">Data da competição:</p>
                                            <p className="text-sm leading-6 text-gray-400">{equipe.data_equipe}</p>
                                            <p className="text-sm leading-6 text-gray-400">Data final das inscrições:</p>
                                            <p className="text-sm leading-6 text-gray-400">{equipe.data_final_inscricao}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </>
    )
}
