import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Book from "../../../Components/Book";
import  api  from "../../../Config/api";
import { useFocusEffect } from '@react-navigation/native' 
import { LibraryContext } from "../../../Context/LibraryContext";


export default function Books(){
    const navigation = useNavigation();
    const [book, setBooks] = useState([]);
    const [stock, setStock] = useState([]);
    const [error, setError] = useState();
    const {libraryIdssmv} = useContext(LibraryContext)

    async function fetchBook() {
        setBooks([])
        console.log("Buscando Livros")
        var res = await api.get("library/" + libraryIdssmv + "/book", {
            'Content-Type': 'application/json',
        })
        res.data.forEach(element => {
            const newBook = element.book
            setBooks(oldArray => [...oldArray,newBook] );
        });
        console.log(res.data[0].book)

    }

    useFocusEffect(
        React.useCallback(() => {
          fetchBook()
        }, [])
    );

    return(
       <View style={styles.container}>
            <View style={styles.containerFlatList}>
                <IconButton
                        icon="close"
                        iconColor='#000'
                        size={35}
                        onPress={() => navigation.pop()}
                        style={{marginLeft:330}}
                />
                <FlatList data={book}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<Book book={item} navigation={navigation} nextPage={"BookInfoLib"}/>)}
                    style={styles.list}>
                </FlatList>
            </View>
            <View style={styles.btnContainer}>
                <IconButton
                    icon="book-plus"
                    iconColor='#000000'
                    size={50}
                    onPress={() => navigation.navigate('AddBook')}
                />
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: "center"
    },
    btnContainer: {
        backgroundColor: '#0000',
        position: 'absolute',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        top: '90%',
        marginRight: '6%',
        justifyContent: 'flex-end',
        height:'9%',
        width: '10%'

    },
    list: {
        backgroundColor: '#0000',
    },
    containerFlatList: {
        marginTop: "13%",
        flex: 1,
    }
})