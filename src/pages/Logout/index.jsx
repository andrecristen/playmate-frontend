import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import { PublicContext } from '../../contexts/public';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-playmate.png';

export default function LogoutPage() {

    const [validatingLogin, setValidatingLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const { logout } = useContext(PublicContext);

    logout();

    return (
        <>
            <Navigate to="/"/>
        </>
    )
}