import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';
import { FetchLibraryByName } from "../../../Config/database";
import { LibraryContext } from "../../../Context/LibraryContext";

export default function SignInLibrary(){

        const navigation = useNavigation();
        const [name, setName] = useState(null);
        const [password, setPassword] = useState(null);
        const {login} = useContext(LibraryContext)

        const validateLibrary = async () => {
            if(name == null || password == null){
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
                var lib = await FetchLibraryByName(name);
                console.log(lib)
                if(lib[0] == null){
                    Alert.alert(
                        "Information Error",
                        "The name does not exist",
                        [
                            { text: "Ok", 
                                onPress: () => console.log("Ok")
                            }
                        ]
                    ); 
                }else{
                    if(lib[0]["password"] == password){
                           console.log("igual")
                           login(lib[0]["name"], lib[0]["id"], lib[0]["idssmv"])
                           navigation.navigate('LibraryHome')
                    }else{
                        Alert.alert(
                            "Information Error",
                            "Name or password is incorrect",
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
                        size={40}
                        onPress={() => navigation.pop()}
                        style={{marginLeft:320}}
                    />
                    <Text style={styles.message}>Welcome</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput
                        placeholder="Enter the name of the library..."
                        placeholderTextColor="#a1a1a1" 
                        style={styles.input}
                        onChangeText={newText => setName(newText)}
                    />

                    <Text style={styles.title}>Password</Text>
                    <TextInput
                        placeholder="Enter a password..."
                        secureTextEntry={true}
                        placeholderTextColor="#a1a1a1" 
                        style={styles.input}
                        onChangeText={newText => setPassword(newText)}
                    />

                    <TouchableOpacity style={styles.button}
                        onPress={
                            //() => navigation.navigate('LibraryHome')
                            () => validateLibrary()
                        }
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.buttonRegister}
                        onPress={
                            () => navigation.navigate('SignUpLibrary')
                        }
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