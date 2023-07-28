import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import  api  from "../../../Config/api"; 
import { LibraryContext } from "../../../Context/LibraryContext";
import { FetchLibraryById, deleteLibrary } from "../../../Config/database";

export default function infoLibrary(){
    const navigation = useNavigation();
    const {libraryIdssmv, libraryId} = useContext(LibraryContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        async function FetchLibrary() {
            var res =  await FetchLibraryById(libraryId)
            setName(res.name)
            setAddress(res.address)
            setEmail(res.email)
            setPhone(res.phone)
            console.log(res)
        }
        FetchLibrary()
    }, [])

    async function deleteThisLibrary() {
        api.delete("library/" + libraryIdssmv, {
        }).then((response) => {
            console.log(response.status)
            console.log(response)
        })
        var res = await deleteLibrary(libraryId)
        console.log(res)
        navigation.pop()
    }

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
                <Text style={styles.textTitle}>Library Information</Text>
            </View>
            <View style={styles.containerBody}>
                <Text style={styles.textTitleBody}>Name: </Text>
                    <Text  style={styles.textBody}>{name}</Text>
                <Text style={styles.textTitleBody}>Address: </Text>
                    <Text style={styles.textBody}>{address}</Text>
                <Text style={styles.textTitleBody}>Email: </Text>
                    <Text style={styles.textBody}>{email}</Text>
                <Text style={styles.textTitleBody}>Phone: </Text>
                    <Text style={styles.textBody}>{phone}</Text>
                
                <TouchableOpacity style={styles.button}
                        onPress={
                            () => deleteThisLibrary()
                        }
                >
                    <Text style={styles.buttonText}>Delete Library</Text>
                </TouchableOpacity>
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
    containerBody: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    textTitle: {
        textAlign: 'center',
        marginLeft:25,
        fontSize:20,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
    textTitleBody: {
        textAlign:'flex-start',
        marginTop: 20,
        marginLeft: 5,
        fontSize:17,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
    textBody: {
        textAlign: 'flex-start',
        marginLeft:55,
        fontSize:14,
        lineHeight: 21,
        color: 'black',
        marginTop: 5
    },
    button:{
        backgroundColor:'#000000',
        width: '100%',
        borderRadius: 4,
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
})