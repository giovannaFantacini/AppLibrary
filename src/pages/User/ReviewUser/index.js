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
import { UserContext } from "../../../Context/UserContext";
import { IconButton } from 'react-native-paper';


export default function ReviewUser({ route }){
    const navigation = useNavigation();
    const {userName} = useContext(UserContext)
    const [recommended, setRecommended] = useState(null);
    const [iconTrue, setIconTrue] = useState("heart-outline")
    const [iconFalse, setIconFalse] = useState("heart-off-outline")
    const [review, setReview] = useState(null);
    const isbn = route.params.isbn;
    console.log("isbn: " + isbn);

    const handleClick = async () => {
        if(review == null || recommended == null){
            Alert.alert(
                "Review error",
                "Please fill in all fields ",
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    
                    },
                    { text: "Ok", 
                    onPress: () => console.log("Ok Pressed"),
                    }
                ]
            );
        }else{
            await api.post( "book/" + isbn + "/review?userId=" + userName, {
                recommended: recommended,
                review: review
            }).catch((response) => {
                if(response.status != 200){
                    Alert.alert(
                        "Review error",
                        "There was an error in the creation of your review if you have already written a review for the book you can't write another one, if you haven't written a review yet please try again later",
                        [
                            {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            
                            },
                            { text: "Ok", 
                            onPress: () => console.log("Ok Pressed"),
                            }
                        ]
                    );
                }else{
                    navigation.pop();
                }
            })
           
        }
    }

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
                <Text style={styles.message}>Write Your Review</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Review</Text>
                <TextInput
                    placeholder="Enter the review..."
                    style={styles.input}
                    onChangeText={newText => setReview(newText)}
                    placeholderTextColor="#a1a1a1" 
                />

                <Text style={styles.title}>Would you recommend this book?</Text>
                <View style={{flexDirection:'row'}}>
                    <IconButton
                        icon={iconTrue}
                        iconColor='#000'
                        size={40}
                        onPress={() => {
                            setRecommended(true)
                            setIconTrue("heart")
                            setIconFalse("heart-off-outline")
                        }}
                    />
                    <IconButton
                        icon={iconFalse}
                        iconColor='#000'
                        size={40}
                        onPress={() => {
                            setRecommended(false)
                            setIconFalse("heart-off")
                            setIconTrue("heart-outline")
                        }}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => handleClick()}>
                    <Text style={styles.buttonText}>Save Review</Text>
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
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
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