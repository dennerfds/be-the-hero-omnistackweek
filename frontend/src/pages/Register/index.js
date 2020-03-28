import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './style.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');
    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();
        const data = ({ name, email, whatsapp, city, uf });

        try {
            const response = await api.post('ngos', data);
            alert(`NGO created successfuly. Your ID is ${ response.data.id }.`);
            history.push('/');
        } catch(error) {
            alert(`NGO not created. Try again! The error: ${ error }`);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logo } alt="Be the Hero" />

                    <h1>Register</h1>
                    <p>Please, sign-up, log in the platform and help people finding your NGO's incidents.</p>

                    <Link to="/" className="link">
                        <FiArrowLeft size={ 16 } color="#E02041" />
                        Back to previous page
                    </Link>
                </section>

                <form onSubmit={ handleRegister }>
                    <input 
                        type="text" 
                        placeholder="NGO Name"
                        value={ name } 
                        onChange={ e => setName(e.target.value) } />

                    <input type="email"
                        placeholder="Email" 
                        value={ email }
                        onChange={ e => setEmail(e.target.value) } />

                    <input placeholder="WhatsApp"
                        value={ whatsapp }
                        onChange={ e => setWhatsapp(e.target.value) } />

                    <div className="input-group">
                        <input placeholder="City"
                            value={ city }
                            onChange={ e => setCity(e.target.value) } />

                        <input placeholder="UF"
                            style={{ width: 80 }}
                            value={ uf }
                            onChange={ e => setUF(e.target.value) } />
                    </div>                    

                    <button className="button" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}