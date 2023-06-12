import { useContext, useEffect, useState } from 'react';
import PagesMenu from '../../components/public/PagesMenu';
import { PublicContext } from '../../contexts/public';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {

    const navigate = useNavigate();


    const { login } = useContext(PublicContext);

    const submit = async (e) => {

    }

    return (
        <>
            <PagesMenu />
        </>
    )
}