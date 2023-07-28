import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import api from '../../../Config/api'
import Book from "../../../Components/Book";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';


export default function BookFromLibrary({ route }){
    const navigation = useNavigation();
  
    const [book, setBooks] = useState("");

    const idLibrary = route.params.idssmv;
    const nameLibrary = route.params.name;
   
    useEffect(() => {
        async function fetchBook() {
            console.log("Buscando Livros")
            setBooks("")
            var res = await api.get("library/" + idLibrary + "/book", {
                'Content-Type': 'application/json',
            })
            res.data.forEach(element => {
                const newBook = element.book
                setBooks(oldArray => [...oldArray,newBook] );
            });
            console.log(res.data)
        }
        fetchBook()
    },[])

    return(
       <View style={styles.container}>
             <View style={{width: '100%', marginHorizontal: '50%', flexDirection:'column', backgroundColor:'white', marginTop: 150}}>
                <IconButton
                        icon="close"
                        iconColor='#000'
                        size={40}
                        onPress={() => navigation.pop()}
                        style={{marginLeft:320}}
                    />
                <Text style={styles.textTitle}>List of Books from {nameLibrary}</Text>
            </View>
            <View >
                <FlatList data={book}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<Book book={item} navigation={navigation} library={idLibrary} nextPage={"BookInfo"}/>)}
                    style={styles.list}>
                </FlatList>
            </View>
       </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
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