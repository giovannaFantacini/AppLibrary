import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as Animatable from 'react-native-animatable'
import { IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import api from "../../../Config/api";
import { PostLibrary, Put } from "../../../Config/database"

export default function SignUpLibrary(){
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [open, setOpen] = useState(null);
    const [password, setPassword] = useState(null);
    const [confPassword, setConfPassword] = useState(null);
    const navigation = useNavigation();

    async function login () {
        if(confPassword != password){
            Alert.alert(
                "Password Error",
                "The passwords do not match please correct them",
                [
                    { text: "Ok", 
                        onPress: () => console.log("Ok")
                    }
                ]
            );
        }else{
            if( name == null || email == null || phone == null || address == null || password == null || open == null){
                Alert.alert(
                    "Information Error",
                    "There is missing information please fill in the missing fields",
                    [
                        { text: "Ok", 
                            onPress: () => console.log("Ok")
                        }
                    ]
                );
            }else{
                console.log("Name: " + name)
                console.log("Email: " + email)
                console.log("phone: " + phone)
                console.log("address: " + address)
                console.log(open)
                var response = await api.post("library", {
                  address: address,
                  name: name,
                  openStatement: open,
                  openTime: '00:00:01',
                  closeTime: '23:59:59',
                })
                if(response.status == 200){
                    const res = await PostLibrary(name, email, password, response.data["id"], address, phone);
                    console.log("Response post: " + res);
                    const res2 = await Put(res);
                    console.log("Rsposta put: " + res2);
                }
             }
        }
      };

    return(
        <ScrollView style={styles.conatiner}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <IconButton
                    icon="close"
                    iconColor='#FFF'
                    size={40}
                    onPress={() => navigation.pop()}
                    style={{marginLeft:320}}
                />
                <Text style={styles.message}>Sign Up</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Name</Text>
                <TextInput
                    placeholder="Enter the library name..."
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setName(newText)}
                />

                <Text style={styles.title}>Email address</Text>
                <TextInput
                    placeholder="Enter an email..."
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setEmail(newText)}
                />

                <Text style={styles.title}>Mobile Phone</Text>
                <TextInput
                    placeholder="+351 XX XXX XXX"
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setPhone(newText)}
                />

                <Text style={styles.title}>Address</Text>
                <TextInput
                    placeholder="Enter an address..."
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setAddress(newText)}
                />

                <Text style={styles.title}>Open Statement</Text>
                <TextInput
                    placeholder="Enter an open statement..."
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setOpen(newText)}
                />

                <Text style={styles.title}>Password</Text>
                <TextInput
                    placeholder="Enter a password..."
                    secureTextEntry={true}
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setPassword(newText)}
                />

                <Text style={styles.title}>Confirm your Password</Text>
                <TextInput
                    placeholder="Enter a password..."
                    secureTextEntry={true}
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setConfPassword(newText)}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => login()}
                >
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
        color: '#FFF'
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
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
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
    registerText:{
        marginTop: 14,
        alignSelf: 'center',
        color: '#a1a1a1'
    }

})