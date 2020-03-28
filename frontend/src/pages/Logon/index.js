import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';
import './style.css';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('session', { id });

            localStorage.setItem('ngoID', id);
            localStorage.setItem('ngoName', response.data.name);

            history.push('/profile');
        } catch(error) {
            alert(`Authentication Failed. The error: ${ error }`);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logo } alt="Be the Hero" />

                <form onSubmit={ handleLogin }>
                    <h1>Please, log in!</h1>

                    <input placeholder="Your ID"
                        value={ id }
                        onChange={ e => setID(e.target.value) } />
                    <button className="button" type="submit">Login</button>

                    <Link to="/register" className="link">
                        <FiLogIn size={ 16 } color="#E02041" />
                        I don't have an ID
                    </Link>
                </form>
            </section>

            <img src={ heroes } alt="Heroes" />
        </div>
    );
}