import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from "react-native";
import { UserContext } from "../../../Context/UserContext";
import ReservationsUser from "../../../Components/ReservationsUser";
import  api  from "../../../Config/api";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native' 
import { IconButton } from 'react-native-paper';

export default function MyReservation(){
    const {userName} = useContext(UserContext)
    const [reservation, setReservation] = useState([])
    const navigation = useNavigation();

    async function fetchCheckOut() {
        console.log("Buscando Reservas")
        setReservation([])
        var res = await api.get("user/checked-out?userId=" + userName, null, {params: {
            userId: userName
        }})
        console.log(res.data)
        res.data.forEach(element => {
            const newReservation = {
                libraryName: element["libraryName"],
                returnDate: element["dueDate"].substring(0,10),
                id: element["id"],
                book: element["book"]["title"],
                isbn: element["book"]["isbn"]
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
        <View style={{width: '100%', marginHorizontal: '0%', flexDirection:'column', backgroundColor:'white', paddingTop:40}}>
            <IconButton
                icon="close"
                iconColor='#000'
                size={35}
                onPress={() => navigation.pop()}
                style={{marginLeft:330}}
            />
           <Text style={styles.textTitle}>My Reservations</Text>
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