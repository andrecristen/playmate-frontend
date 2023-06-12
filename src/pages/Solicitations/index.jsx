import { useContext, useEffect, useRef, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import { PublicContext } from '../../contexts/public';

export default function SolicitationsPage() {

    // Geral
    const {  } = useContext(PublicContext);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        
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
                        {/* <ul role="list">
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
                        </ul> */}
                    </div>
                </main>
            </div>
        </>
    )
}
