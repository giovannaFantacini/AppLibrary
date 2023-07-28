import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from "react-native";
import { UserContext } from "../../../Context/UserContext";
import ReservationsUser from "../../../Components/ReservationsUser";
import  api  from "../../../Config/api";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native' 
import { IconButton } from 'react-native-paper';

export default function History(){
    const {userName} = useContext(UserContext)
    const navigation = useNavigation();
    const [reservation, setReservation] = useState([])

    async function fetchCheckOut() {
        setReservation([])
        console.log("Buscando Reservas")
        var res = await api.get("user/checkout-history?userId=" + userName, null, {params: {
            userId: userName
        }})
        res.data.forEach(element => {
            const newReservation = {
                libraryName: element["libraryName"],
                returnDate: element["updateTimestamp"].substring(0,10),
                id: element["id"],
                book: element["book"]["title"]
            }
            setReservation(oldArray => [...oldArray,newReservation] );
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchCheckOut()
        }, [])
    );

    return(
        <View style={styles.container}>
        <View style={{width: '100%', marginHorizontal: '0%', flexDirection:'column', backgroundColor:'white', paddingTop:10}}>
            <IconButton
                icon="close"
                iconColor='#000'
                size={35}
                onPress={() => navigation.pop()}
                style={{marginLeft:330, marginTop: 25}}
            />
           <Text style={styles.textTitle}>History</Text>
       </View>
       <View >
           <FlatList data={reservation}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (<ReservationsUser reservation={item} navigation={navigation}/>)}>
           </FlatList>
       </View>
  </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
      textTitle: {
        textAlign: 'center',
        marginLeft:25,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
})