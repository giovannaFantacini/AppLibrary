import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import api from '../../../Config/api'
import Review from "../../../Components/Review";
import imageBook from "../../../Assets/CoverNotAvailable.png"
import { IconButton } from 'react-native-paper';
import { UserContext } from "../../../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { PostReservation, Put} from "../../../Config/database";

export default function BookInfo({ route }){
    const defaultimage = Image.resolveAssetSource(imageBook).uri
    const navigation = useNavigation();
    const [book, setBook] = useState("");
    const [description, setDescription] = useState("Unfortunately, there is no description for this book");
    const [review, setReview] = useState([]);
    const [image, setImage] = useState(defaultimage);
    const [id, setId] = useState("");
    const [urlImage, seturlImage] = useState("");
    const isbn = route.params.isbn;
    const idLibrary = route.params.idLibrary;
    const {userName, userId} = useContext(UserContext)

    useEffect(() => {
        async function fetchBook() {
            console.log("Buscando Livros")
            var res = await api.get("book/" + isbn , {
                'Content-Type': 'application/json',
            })
            setBook(res.data)
            console.log(res.data)
            if(res.data["description"] != null){
                setDescription(res.data["description"])
            }
            console.log("Buscando reviews")
            var rev = await api.get("book/" + isbn + "/review",{
                'Content-Type': 'application/json',
            })
            console.log(rev.data)
            setReview(rev.data)
            let url = res.data["cover"]["mediumUrl"]
            url = url.substring(21,42)
            seturlImage(url)
            console.log(url)
            console.log("Buscando Image")
            var res = await api.get("assets/cover/" + urlImage , {
                'Content-Type': 'application/json',
            })
            if(res.data != null){
                setImage("http://193.136.62.24/v1/assets/cover/" + urlImage) 
            }   
        }
        fetchBook()
    },[])

    const reserve = () => {
        if(idLibrary != null){
            console.log(idLibrary)
            Alert.alert(
                "Reserve book",
                "Do you want to reserve this book?",
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    
                    },
                    { text: "Yes", 
                        onPress: async () => {
                            var checkout = await api.post("library/" + idLibrary + "/book/" + isbn + "/checkout", null, {params: {
                                userId: userName
                              }})
                            console.log("Buscando id")
                            const value = checkout.data["id"]
                            setId(value)
                            console.log(checkout.data)
                            var res = await PostReservation(idLibrary, isbn, book.title, userId, checkout.data["dueDate"].substring(0,10), checkout.data["createTimestamp"].substring(0,10));
                            console.log(res);
                            var res2 = await Put(res);
                            console.log(res2)
                        }
                    }
                ]
            );
        }else{
            navigation.navigate('FindLibrary', {isbn: isbn, bookTitle: book.title })
            console.log("NULL")
        }
    }

    return(
        <View style={styles.conatiner}>
            <ScrollView >
                <View style={styles.conatiner}>
                    <View style={styles.containerHeader}>
                        <IconButton
                            icon="close"
                            iconColor='#000'
                            size={40}
                            onPress={() => navigation.pop()}
                            style={{marginLeft:320}}
                        />
                        <Text style={styles.title}>{book.title}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Image 
                            source={{ uri: image}} 
                            style={{ width: 150, height: 200 }} 
                        />
                    </View>

                    <View>
                        <Text style={styles.description}>Description</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                    <View>
                            <Text style={styles.description}>Review</Text>
                            { review.map((item)=> <Review review={item} />) }
                    </View> 
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                        <IconButton
                            icon="plus"
                            iconColor='#FFF'
                            size={40}
                            onPress={() => reserve()}
                        />
            </View>
        </View>
        
                
    )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: "center",
    },
    containerHeader:{
        marginTop: '10%',
        marginBottom: '8%',
        paddingStart: '5%',
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        justifyContent: "center",
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
        alignItems: 'baseline'
    },
    description:{
        justifyContent: "flex-start",
        margin: 15,
        fontWeight:'bold',
        fontSize: 20
    },
    descriptionText:{
        justifyContent: "center",
        marginLeft: 15,
        marginRight: 8,
        marginBottom: 15,
        fontSize: 15
    },
    reserveText:{
        color: '#a1a1a1'
    },
    buttonReserve:{
        backgroundColor:'#000000',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        backgroundColor: '#000',
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'flex-end',
        top: '25%',
        justifyContent: 'center',
        borderRadius: 50,
        width: 50,
        height: 50,
        right: 10
    },
})