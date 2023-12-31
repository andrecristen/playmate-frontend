import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import logo from '../../images/logo-playmate.png';
import emptyUser from '../../images/empty-user.webp';
import { PublicContext } from '../../contexts/public';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PagesMenu() {


    const navigate = useNavigate();
    const location = useLocation();

    const { loadUser } = useContext(PublicContext);

    let user = loadUser();

    let navigation = [];
    let userNavigation = [];

    if (user) {
        navigation = [
            { name: 'Competições', href: '/', current: false },
            { name: 'Minhas Equipes', href: '/clubs', current: false },
            { name: 'Meus Atletas', href: '/athletes', current: false },
            { name: 'Minhas Solicitações', href: '/solicitations', current: false },
        ]
        userNavigation = [
            { name: 'Meu Perfil', href: '/profile' },
            { name: 'Sair', href: '/logout' },
        ]
    } else {
        navigation = [
            { name: 'Competições', href: '/', current: true },
        ]
        userNavigation = [
            { name: 'Login', href: '/login' },
            { name: 'Registrar-se', href: '/register' },
        ]
    }

    for (const [key, value] of Object.entries(navigation)) {
        value.current = (value.href == location.pathname);
    }


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleClickLogo = () => {
        navigate("/");
    }

    const getUserName = () => {
        if (user) {
            return user.first_name + " " + user.last_name;
        } else {
            return "Bem-vindo(a) Visitante";
        }
    }

    return (
        <Disclosure as="nav" className="bg-purple-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center" onClick={handleClickLogo}>
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-8 w-15"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-purple-900 text-white'
                                                        : 'text-black-300 hover:bg-purple-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-purple-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full ml-2 my-2" src={emptyUser} alt="" />
                                                <div className="mx-2 text-white truncate text-ellipsis">
                                                    <span className='h-10 w-10 truncate text-ellipsis'>{getUserName()}</span>
                                                </div>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-purple-100' : '',
                                                                    'block px-4 py-2 text-sm text-purple-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-purple-800 p-2 text-purple-400 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-purple-900 text-white' : 'text-purple-300 hover:bg-purple-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-purple-700 pb-3 pt-4">
                            <div className="flex-shrink-0">
                                <span className='h-10 w-10'>{getUserName()}</span>
                            </div>
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={emptyUser} alt="" />
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-purple-400 hover:bg-purple-700 hover:text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
