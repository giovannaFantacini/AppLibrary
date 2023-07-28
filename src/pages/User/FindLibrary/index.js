import React, { useState, useContext, useEffect } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import { FetchAllLibraries, PostReservation, Put } from "../../../Config/database";
import { IconButton } from 'react-native-paper';


export default function FindLibrary({ route }){
    const navigation = useNavigation();
    const {userName, userId} = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showText, setShowText] = useState(false)
    const [value, setValue] = useState(null);
    const [textBook, setTextBook] = useState('');
    const [id, setId] = useState('');
    const [items, setItems] = useState([])
    const isbn = route.params.isbn;
    const bookTitle = route.params.bookTitle

    useEffect(() => {
        async function fetchData() {
            const response = await FetchAllLibraries(); 
            console.log(response)
            response.forEach(library => {
                items.push({
                    label: library["name"],
                    value: library["idssmv"]
                })
            });
            console.log(items)
        }
        fetchData()
    },[])

    const handleValue = async (value) => {
        console.log("library: " + value)
        console.log("ISBN: " + isbn)
        var res = await api.get("library/" + value + "/book/" + isbn, {
            'Content-Type': 'application/json',
        })
        console.log(res.data)
        if(res.data["available"] != null){
            setShowText(true)
            setTextBook("Book available, do you want to reserve the book?")
            setShowButton(true)
        }else{
            setShowText(true)
            setTextBook("Unfortunately the book is not available")
            console.log("Não Temmm")
        }
    }

    const handleClick = async () => {
        var checkout = await api.post("library/" + value + "/book/" + isbn + "/checkout", null, {params: {
            userId: userName
        }})
        if(checkout.status == 200){
            console.log(checkout.data)
            var res = await PostReservation(value, isbn, bookTitle, userId, checkout.data["dueDate"].substring(0,10), checkout.data["createTimestamp"].substring(0,10));
            console.log(res);
            var res2 = await Put(res);
            console.log(res2)
            navigation.pop()
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
                <Text style={styles.message}>Search for the library </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
              
                <View style={styles.dropdownMenu}>
                    <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Choose the Library"
                    placeholderStyle={styles.placeholderStyles}
                    activityIndicatorColor="#5188E3"
                    searchable={false}
                    onChangeValue={(value) => {
                        handleValue(value)
                        console.log(value);
                    }}
                    />
                </View>

                { showText && 
                   <Text style={{color:"#000", fontSize: 20, marginTop: 60}}>{textBook}</Text>
                }

                { showButton && 
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => handleClick()}>
                        <Text style={styles.buttonText}>Reserve book</Text>
                    </TouchableOpacity>
                }

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
    button:{
        backgroundColor:'#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dropdownMenu: {
        display: 'absolute',
        top: 30,
        zIndex: 50
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
     },
     placeholderStyles: {
        color: "grey",
      },


})