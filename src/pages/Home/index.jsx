import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import empty from '../../images/empty.png';
import { PublicContext } from '../../contexts/public';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function HomePage() {

    const { getCompeticaoList } = useContext(PublicContext);
    const [competicaoList, setCompeticaoList] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setCompeticaoList([]);
        getCompeticaoList().then((data) => {
            console.log(data);
            setCompeticaoList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }


    return (
        <>
            <div className="min-h-full">
                <PagesMenu />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-purple-900">Competições</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <ul role="list">
                            {competicaoList.map((competicao) => (
                                <li key={competicao.email} className="flex justify-center gap-x-6 py-5 cursor-pointer border-2 mb-2 mx-4 rounded-lg">
                                    <div className="flex gap-x-5">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={empty} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{competicao.nome}</p>
                                            <p className="text-sm leading-6 text-gray-400">Data da competição: {competicao.data_competicao}</p>
                                            <p className="text-sm leading-6 text-gray-400">Data final das inscrições:{competicao.data_final_inscricao}</p>
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
