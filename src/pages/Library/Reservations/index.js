import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LibraryContext } from "../../../Context/LibraryContext";
import { useFocusEffect } from '@react-navigation/native' 
import { FetchAllReservations } from "../../../Config/database";
import ReservationsLibrary from "../../../Components/ReservationLibrary";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';

export default function Reservations(){
    const {libraryIdssmv} = useContext(LibraryContext)
    const [reservations, setReservations] = useState([]);
    const navigation = useNavigation();

    async function fetchReservations() {
        var res = await FetchAllReservations(libraryIdssmv, false);
        setReservations(res)
    }

    useFocusEffect(
        React.useCallback(() => {
          fetchReservations()
        }, [])
    );

    return(
        <View style={styles.container}>
             <View style={styles.containerHeader}>
                <IconButton
                        icon="close"
                        iconColor='#000'
                        size={35}
                        onPress={() => navigation.pop()}
                        style={{marginLeft:330, marginTop: 25}}
                />
                <Text style={styles.textTitle}>List of Reservations</Text>
            </View>
            <View >
                <FlatList data={reservations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<ReservationsLibrary reservation={item} navigation={navigation} />)}>
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
    containerHeader: {
        backgroundColor:'white', 
        paddingTop:20, 
        alignContent: 'center'
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