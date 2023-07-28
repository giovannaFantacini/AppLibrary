import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";

export default function SignIn(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            
             <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../Assets/findyourbook.png')}
                    style={{width: '100%'}}
                    resizeMode="contain"
                />
            </View> 
            
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Find a book for you</Text>
                <Text  style={styles.text}>Get started</Text>

                <TouchableOpacity
                 style={styles.buttonUser}
                 onPress={() => navigation.navigate('SignInUser')}
                >
                    <Text style={styles.buttonText}>Sign In as User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style={styles.buttonLibrary}
                 onPress={() => navigation.navigate('SignInLibrary')}
                >
                    <Text style={styles.buttonText}>Sign In as Library</Text>
                </TouchableOpacity>
            </Animatable.View>

            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000000'
    },
    containerLogo:{
        flex:2,
        backgroundColor:'#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm:{
        flex:1,
        backgroundColor:'#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'

    },
    title:{
       fontSize: 24,
       fontWeight: 'bold',
       marginTop: 28,
       marginBottom: 12
    },
    text:{
        color: '#a1a1a1'
    },
    buttonLibrary:{
        position: 'absolute',
        backgroundColor: '#000000',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonUser:{
        position: 'absolute',
        backgroundColor: '#000000',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 18,
        color:'#FFF',
        fontWeight:'bold'
    }
})