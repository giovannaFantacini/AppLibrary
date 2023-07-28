import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import { FetchUserByEmail } from "../../../Config/database";
import { UserContext } from "../../../Context/UserContext";
import { IconButton } from 'react-native-paper';

export default function SignInUser(){
    const navigation = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {login} = useContext(UserContext)

    const validateUser = async () => {
        if(email == null || password == null){
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
            var user = await FetchUserByEmail(email);
            console.log(user)
            if(user[0] == null){
                Alert.alert(
                    "Information Error",
                    "The email does not exist",
                    [
                        { text: "Ok", 
                            onPress: () => console.log("Ok")
                        }
                    ]
                ); 
            }else{
                if(user[0]["password"] == password){
                    console.log("igual")
                    login(user[0]["name"], user[0]["id"])
                    navigation.navigate('UserHome')
                }else{
                    Alert.alert(
                        "Information Error",
                        "Email or password is incorrect",
                        [
                            { text: "Ok", 
                                onPress: () => console.log("Ok")
                            }
                        ]
                    );
                }
            }
        }
    }

    return(
        <View style={styles.conatiner}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <IconButton
                        icon="close"
                        iconColor='#FFF'
                        size={30}
                        onPress={() => navigation.pop()}
                        style={{marginLeft:320}}
                    />
                <Text style={styles.message}>Welcome</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Enter an email..."
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setEmail(newText)}
                />

                <Text style={styles.title}>Password</Text>
                <TextInput
                    placeholder="Enter a password..."
                    secureTextEntry={true}
                    placeholderTextColor="#a1a1a1" 
                    style={styles.input}
                    onChangeText={newText => setPassword(newText)}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={
                        //() => navigation.navigate('UserHome')
                        () => validateUser()
                    }
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('SignUpUser')}
                >
                    <Text style={styles.registerText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
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
        direction: 'column',
        
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
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText:{
        color: '#a1a1a1'
    }

})