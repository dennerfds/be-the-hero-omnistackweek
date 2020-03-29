import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import style from './style';
import api from '../../services/api';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [incidentsCounter, setIncidentsCounter] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetails(incident) {
        navigation.navigate('Details', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (incidentsCounter > 0 && incidents.length == incidentsCounter) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([... incidents, ... response.data]);
        setIncidentsCounter(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={ style.container }>
            <View style={ style.header }>
                <Image source={ logo }/>
                <Text style={ style.headerText }>
                    Incidents counter: <Text style={ style.headerTextBold }>{ incidentsCounter }</Text>.
                </Text>
            </View>

            <Text style={ style.title }>Welcome!</Text>
            <Text style={ style.description }>Choose one of the incidents below and save the day:</Text>

            <FlatList 
                data={ incidents }
                style={ style.incidentsList }
                keyExtractor={ incident => String(incident.id) }
                showsVerticalScrollIndicator={ false }
                onEndReached={ loadIncidents }           
                onEndReachedThreshold={ 0.2 }
                renderItem={ ({ item: incident }) => (
                    <View style={ style.incident }>
                        <Text style={ style.incidentProperty }>NGO:</Text>
                        <Text style={ style.incidentValue }>{ incident.name }</Text>
                        
                        <Text style={ style.incidentProperty }>Title</Text>
                        <Text style={ style.incidentValue }>{ incident.title }</Text>
                        
                        <Text style={ style.incidentProperty }>Value:</Text>
                        <Text style={ style.incidentValue }> 
                            { Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value) }
                        </Text>

                        <TouchableOpacity 
                            style={ style.detailsButton } 
                            onPress={ () => navigateToDetails(incident) }>
                            <Text style={ style.detailsButtonText }>See more details</Text>
                            <Feather name='arrow-right' size={ 16 } color='#E02041' /> 
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </View>
    );
}