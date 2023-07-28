import React, {useContext, useState} from "react";
import {  
    Text, 
    StyleSheet, 
    ScrollView,  
    TouchableOpacity, } from "react-native";
import * as Animatable from 'react-native-animatable'
import { LibraryContext } from "../../../Context/LibraryContext";
import { useFocusEffect } from '@react-navigation/native' 
import { FetchReservationById, SetReservationReturnStatus, Put } from "../../../Config/database";
import ReservationsLibrary from "../../../Components/ReservationLibrary";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';
import api from "../../../Config/api";


export default function ReservationInfo({ route }){
    const {libraryIdssmv} = useContext(LibraryContext)
    const [bookTitle, setBookTitle] = useState('');
    const [bookId, setBookId] = useState('');
    const [checkout, setCheckout] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [reader, setReader] = useState([]);
    const navigation = useNavigation();
    const idReserve = route.params.id;
    
    async function fetchReservation() {
        var res = await FetchReservationById(idReserve);
        setBookTitle(res.booktitle)
        setCheckout(res.checkoutdate)
        setDueDate(res.duedate)
        setReader(res.user)
        setBookId(res.bookid)
        console.log(res)
    }

    useFocusEffect(
        React.useCallback(() => {
          fetchReservation()
        }, [])
    );

    const handleClick = async () => {
        var checkin = await api.post("library/" + libraryIdssmv + "/book/" + bookId + "/checkin", null, {params: {
            userId: reader.name
        }})
        if(checkin.status == 200){
            var response = await SetReservationReturnStatus(idReserve, true);
            console.log(response)
            var resPut = await Put(idReserve)
            navigation.pop()
        }
    }


    return(
        <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
            <IconButton
                icon="close"
                iconColor='#FFF'
                size={40}
                onPress={() => navigation.pop()}
                style={{marginLeft:320}}
            />
            <Text style={styles.message}>Booking Information</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>{bookTitle}</Text>
            <Text>Check-Out date: {checkout}</Text>
            <Text>Return date: {dueDate}</Text>

            <Text style={styles.title}>Reader Information</Text>
            <Text>{reader.name}</Text>
            <Text>{reader.email}</Text>
            <Text>{reader.phone}</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => handleClick()}>
                <Text style={styles.buttonText}>Check-in reservation</Text>
            </TouchableOpacity>
        </Animatable.View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },
    containerHeader:{
        marginTop: '23%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
    },
    containerForm:{
        backgroundColor:'#FFF',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: '5%',
        paddingEnd: '5%',
    },
    title:{
        fontSize: 20,
        marginTop: 28,
        color: '#000'
    },
    button:{
        backgroundColor:'#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }

})