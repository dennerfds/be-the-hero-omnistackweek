import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './style.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ngoName = localStorage.getItem('ngoName');
    const ngoID = localStorage.getItem('ngoID');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: { Authorization: ngoID }   
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ngoID]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${ id }`, {
                headers: { Authorization: ngoID }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error while trying to delete the incident!');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logo } alt="Be the Hero" />
                <span>Welcome, { ngoName }!</span>

                <Link className="button" to="/incidents/new">New incident</Link>
                <button type="button" onClick={ handleLogout }>
                    <FiPower size={ 18 } color="#E02041" />
                </button>
            </header>

            <h1>Incidents</h1>

            <ul>
                { 
                    incidents.map(incident => (
                        <li key={ incident.id }>
                            <strong>Incident #{ incident.id }</strong>
                            <p>{ incident.title }</p>

                            <strong>Description</strong>
                            <p>{ incident.description }</p>

                            <strong>Value</strong>
                            <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                            <button type="button" onClick={ () => handleDeleteIncident(incident.id) }>
                                <FiTrash2 size={ 20 } color="#A8A8B3" />
                            </button>
                        </li>
                    )) 
                }
            </ul>
        </div>
    );
}