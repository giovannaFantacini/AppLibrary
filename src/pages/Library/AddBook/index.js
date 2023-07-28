import React, { useState, useContext } from "react";
import { View, 
         Text, 
         StyleSheet, 
         ScrollView, 
         Alert, 
         TextInput, 
         TouchableOpacity,
         Keyboard,
         Image } from "react-native";
import * as Animatable from 'react-native-animatable'
import api from "../../../Config/api";
import { useNavigation } from "@react-navigation/native";
import { LibraryContext } from "../../../Context/LibraryContext";



export default function BooksAvailable(){
    const navigation = useNavigation();
    const [stock, setStock] = useState('');
    const [isbn, setIsbn] = useState('');
    const {libraryIdssmv} = useContext(LibraryContext)


    const handleClick = async () => {

        const isBook = await api.get( "book/" + isbn + "?persist=true", {
            'Content-Type': 'application/json',
        })
        console.log(isBook.status)

        if(isBook.status != "200"){
            Alert.alert(
            "Book Error",
            "Unfortunately there is no book with ISBN inserted",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
            );
        }else{
            api.post("library/" + libraryIdssmv + "/book/" + isbn, {
                stock : stock
            }).then((response) => {
                console.log(response)
                navigation.goBack();
            })
        }
    }


    return(
        <ScrollView style={styles.conatiner}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Add a Book</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>ISBN</Text>
                <TextInput
                    placeholder="Enter the isbn..."
                    style={styles.input}
                    keyboardType = 'numeric'
                    onChangeText={newText => setIsbn(newText)}
                    placeholderTextColor="#a1a1a1" 
                />

                <Text style={styles.title}>Number of copies available in stock</Text>
                <TextInput
                    placeholder="Enter the number of copies available in stock..."
                    style={styles.input}
                    keyboardType = 'numeric'
                    onChangeText={newText => setStock(newText)}
                    placeholderTextColor="#a1a1a1" 
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => handleClick()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animatable.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        backgroundColor: '#000000'
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
        padding: '5%',
        paddingEnd: '5%',
    },
    title:{
        fontSize: 20,
        marginTop: 28,
        color: '#000'
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
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
    },
    btnImage: {
        backgroundColor: '#FFF',
        marginTop: 10
    },
    btnImageTitle:{
        color: '#000',
        textDecorationLine: 'underline'
    },
    addAuthors: {
        alignContent: 'flex-start',
        flexDirection: "row",
        flex: 1,
       
    }

})