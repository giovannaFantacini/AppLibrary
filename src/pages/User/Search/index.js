import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList} from "react-native";
import { Searchbar } from 'react-native-paper'
import api from '../../../Config/api'
import Book from "../../../Components/Book";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';

export default function FindYourBook(){
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState("");
    const navigation = useNavigation();

    const onChangeSearch = query => setSearch(query);

    async function searchBooks() {
        console.log("Buscando Livros")
        var res = await api.get("search?page=0&query=" + search, {
            'Content-Type': 'application/json',
        })
        setBooks(res.data)
        console.log(res.data)
    }

    return(
       <View style={styles.conatiner}>
            <IconButton
                    icon="close"
                    iconColor='#000'
                    size={35}
                    onPress={() => navigation.pop()}
                    style={{marginLeft:330, marginTop: 30}}
            />
            <Searchbar 
                placeholder="What are you looking for? "
                onChangeText={onChangeSearch} 
                value={search}
                style={styles.searchbar}
                onSubmitEditing={searchBooks}
            />
            <FlatList data={books}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<Book book={item} navigation={navigation} nextPage={"BookInfo"}/>)}
                    style={styles.list}>
            </FlatList>
       </View>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: "center"
    },
    searchbar: {
        margin: 9,
        marginTop:5,
    }
})