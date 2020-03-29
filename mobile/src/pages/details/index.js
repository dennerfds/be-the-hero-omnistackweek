import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import logo from '../../assets/logo.png';
import style from './style';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Hello, ${ incident.name }. I'm making contact because I'd like to help with the ` + 
        `incident "${incident.id}" regarding "${ incident.title }" with a total value of ` + 
        `"${ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value) }".`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Incident\'s Hero: ${ incident.title }`,
            recipients: [incident.email],
            body: message
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${ incident.whatsapp }&text=${ message }`);
    }

    return (
        <View style={ style.container }>
            <View style={ style.header }>
                <Image source={ logo }/>

                <TouchableOpacity 
                    onPress={ navigateBack }
                    style={ style.headerButton }>
                    <Feather name="arrow-left" size={ 28 } color="#E82041" />
                    <Text style={ style.headerButtonText }>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={ style.incident }>
                <Text style={ [style.incidentProperty, { marginTop: 0 }] }>NGO:</Text>
                <Text style={ style.incidentValue }>{ incident.name } from { incident.city } / { incident.uf }</Text>
                        
                <Text style={ style.incidentProperty }>Title:</Text>
                <Text style={ style.incidentValue }>{ incident.title }</Text>
                
                <Text style={ style.incidentProperty }>Value:</Text>
                <Text style={ style.incidentValue }> 
                    { Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value) }
                </Text>
            </View>

            <View style={ style.contactBox }>
                <Text style={ style.heroTitle }>Save the day!</Text>
                <Text style={ style.heroTitle }>Be this hero's incident!</Text>
                <Text style={ style.heroDescription }>Please, make contact:</Text>

                <View style={ style.actions }>
                    <TouchableOpacity style={ style.action } onPress={ sendWhatsapp }>
                        <Text style={ style.actionText }>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ style.action } onPress={ sendMail }>
                        <Text style={ style.actionText }>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}