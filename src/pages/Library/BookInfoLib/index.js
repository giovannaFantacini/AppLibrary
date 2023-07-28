import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import api from '../../../Config/api'
import Review from "../../../Components/Review";
import imageBook from "../../../Assets/CoverNotAvailable.png"
import { IconButton } from 'react-native-paper';
import { LibraryContext } from "../../../Context/LibraryContext";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native' 

export default function BookInfo({ route }){
    const defaultimage = Image.resolveAssetSource(imageBook).uri
    const navigation = useNavigation();
    const [book, setBook] = useState("");
    const [description, setDescription] = useState("Unfortunately, there is no description for this book");
    const [available, setAvailable] = useState("");
    const [stock, setStock] = useState("");
    const [review, setReview] = useState([]);
    const [image, setImage] = useState(defaultimage);
    const [urlImage, seturlImage] = useState("");
    const isbn = route.params.isbn;
    const {libraryIdssmv} = useContext(LibraryContext)
    console.log(libraryIdssmv)
    console.log(isbn)

    async function fetchBook() {
        console.log("Buscando Livros")
        var res = await api.get("library/" + libraryIdssmv + "/book/" + isbn , {
            'Content-Type': 'application/json',
        })
        console.log("Lista: " + res.data)
        setBook(res.data["book"])
        console.log("Book: " + res.data["book"])
        setAvailable(res.data["available"])
        console.log("Av: " + res.data["available"])
        setStock(res.data["stock"])
        console.log(res.data["stock"])
        if(book.description != null){
            setDescription(book["description"])
        }
        console.log("Buscando reviews")
        var rev = await api.get("book/" + isbn + "/review",{
            'Content-Type': 'application/json',
        })
        console.log(rev.data)
        setReview(rev.data)
        let url = book["cover"]["mediumUrl"]
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

    useFocusEffect(
        React.useCallback(() => {
          fetchBook()
        }, [])
    );

    const changeStock = async () => {
        var newStock
        Alert.prompt(
            "Stock",
            "Enter the number of books in stock",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "OK",
                onPress: newStock => {
                    api.put("library/" + libraryIdssmv + "/book/" + isbn, {
                        stock : newStock
                    }).then((response) => {
                        console.log(response)
                    })
                    fetchBook()
                }
              }
            ],
          );
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
                            //defaultSource={{uri: defaultimage}}
                        />
                    </View>
                    <View style={styles.infoStock}>
                        <Text style={styles.description}>Available: </Text>
                        <Text style={styles.textInfoStock}>{available}</Text>
                    </View>
                    <View style={styles.infoStock}>
                        <Text style={styles.description}>Stock: </Text>
                        <Text style={styles.textInfoStock}>{stock}</Text>
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
                    icon="pencil-outline"
                    iconColor='#FFF'
                    size={35}
                    onPress={() => changeStock()}
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
    infoStock: {
        flexDirection:'row',
        alignContent: 'flex-start',
        alignItems:'baseline',
    },
    textInfoStock: {
        fontSize: 18
    }
})