import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";


class Library extends React.Component{
    render(){
        const {name, address, phone, idssmv} = this.props.library
        const navigation = this.props.navigation
        return(
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                navigation.navigate('BookLibrary', { idssmv: idssmv, name: name})
                console.log("Clicou")
                console.log(idssmv)
             }}>
            <View style={{width: '100%', marginHorizontal: '50%', flexDirection:'row'}}>
                <View style={{textAlign: 'center', width: '60%'}}>
                  <Text style={styles.title}>{name}</Text>
                  <Text style={styles.subTitle}>{address}</Text>
                  <Text style={styles.subTitle}>{phone}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
        }

        
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width:-2, height:6},
        shadowOpacity:0.2,
        shadowRadius: 3,
        backgroundColor: '#ECECEC'
        
    },
    title:{
        fontSize: 20,
        marginTop: 5,
        fontWeight: "bold"
    },
    subTitle: {
        fontSize: 15,
        margin: 2,
        fontWeight: "normal"
    },
    buttonBooks: {
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#000',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
     
})
export default Library;