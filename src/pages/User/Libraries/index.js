import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import  Library from '../../../Components/Libraries' 
import { FetchAllLibraries } from "../../../Config/database";
import  api  from "../../../Config/api";
import { IconButton } from 'react-native-paper';

export default function Libraries(){
  
    const [libraries, setlibraries] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchData() {
            console.log("inicio")
            const response = await FetchAllLibraries(); 
            setlibraries(response)
            console.log(libraries)
        }
        fetchData()
    },[])

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
                <Text style={styles.textTitle}>List of Libraries</Text>
            </View>
            <View >
                <FlatList data={libraries}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<Library library={item} navigation={navigation} />)}>
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