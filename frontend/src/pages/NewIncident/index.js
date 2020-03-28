import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ngoID = localStorage.getItem('ngoID');
    const history = useHistory();

    async function handleCreateIncident(event) {
        event.preventDefault();

        const data = { title, description, value };

        try {
            await api.post('incidents', data, {
                headers: { Authorization: ngoID }
            });
            history.push('/profile');
        } catch (error) {
            alert('Error while trying to create a new incident!');
        }
    }
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logo } alt="Be the Hero" />

                    <h1>New Ticket</h1>
                    <p>Please, write all the incident details so you can find a hero to solve it.</p>

                    <Link to="/profile" className="link">
                        <FiArrowLeft size={ 16 } color="#E02041" />
                        Back to profile
                    </Link>
                </section>

                <form onSubmit={ handleCreateIncident }>
                    <input 
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ e => setTitle(e.target.value) } />
                    <textarea 
                        placeholder="Description"
                        value={ description }
                        onChange={ e => setDescription(e.target.value) } />
                    <input 
                        type="text" 
                        placeholder="Value"
                        value={ value }
                        onChange={ e => setValue(e.target.value) } />

                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}