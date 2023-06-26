import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import { PublicContext } from '../../contexts/public';
import empty from '../../images/empty-user.webp';
import Solicitations from "../../models/Solicitations";
import { useNavigate } from 'react-router-dom';

export default function SolicitationsPage() {

    // Geral
    const { getMinhasEquipesAtletas, alterarSituacaoEquipeAtleta } = useContext(PublicContext);
    const [minhasEquipesList, setMinhasEquipesList] = useState([]);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const solicitations = new Solicitations();

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        getMinhasEquipesAtletas([]);
        getMinhasEquipesAtletas().then((data) => {
            setMinhasEquipesList(data);
            console.log(data);
            setTimeout(() => {
                forceUpdate();
            }, 500);
            setTimeout(() => {
                forceUpdate();
            }, 1000);
            setTimeout(() => {
                forceUpdate();
            }, 1500);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleClickConfirmarFormacaoEquipe = async (solicitacao) => {
        solicitacao.atleta = solicitacao.atleta.id;
        alterarSituacaoEquipeAtleta(solicitacao, solicitations.SITUACAO_APROVADO).then((data) => {
            console.log(data);
            window.location.reload();
        });
    }

    const handleClickRejeitarFormacaoEquipe = async (solicitacao) => {
        solicitacao.atleta = solicitacao.atleta.id;
        alterarSituacaoEquipeAtleta(solicitacao, solicitations.SITUACAO_REJEITADO).then((data) => {
            console.log(data);
            window.location.reload();
        });
    }

    return (
        <>
            {/* Listagem */}
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Solicitações</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {minhasEquipesList.map((equipeAtleta) => (
                                <li key={equipeAtleta.id} className="gap-x-6 py-5 px-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" >
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <img className="h-20 w-20 rounded-full bg-gray-50" src={empty} alt="" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="min-w-0 place-content-center">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{equipeAtleta.atleta.first_name ? equipeAtleta.atleta.first_name + " " + equipeAtleta.atleta.last_name : ""}</p>
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{equipeAtleta.equipe.categoria ? equipeAtleta.equipe.categoria.nome : ""}</p>
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{equipeAtleta.equipe.competicao ? equipeAtleta.equipe.competicao.nome : ""}</p>
                                                <h2
                                                    className="mt-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-purple-700"
                                                >
                                                    Solicitações Recebidas
                                                </h2>
                                                {equipeAtleta.solicitacoes
                                                    ?
                                                    equipeAtleta.solicitacoes.map((solicitacao) => {
                                                        return <div key={solicitacao.id} className="gap-x-6 py-5 px-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg" >
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{solicitacao.atleta.first_name ? solicitacao.atleta.first_name + " " + solicitacao.atleta.last_name : ""}</p>
                                                            <button
                                                                onClick={() => { handleClickConfirmarFormacaoEquipe(solicitacao) }}
                                                                type="button"
                                                                className="mt-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Confirmar
                                                            </button>
                                                            <button
                                                                onClick={() => { handleClickRejeitarFormacaoEquipe(solicitacao) }}
                                                                type="button"
                                                                className="mt-4 ml-2 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Rejeitar
                                                            </button>
                                                        </div>
                                                    })
                                                    :
                                                    "Nenhuma solicitação"}
                                            </div>
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
