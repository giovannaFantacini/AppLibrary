import React, { useEffect, useState } from "react";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { Button, PaperProvider } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";


export default class ReservationsUser extends React.Component{
    render(){
        const {libraryName, returnDate, id, book, isbn} = this.props.reservation
        const navigation = this.props.navigation
        return(
          <View style={styles.container}>
              <View style={styles.TextColumn}>
                  <Text style={styles.title}>Library: {libraryName}</Text>
                  <Text>Book: {book}</Text>
                  <Text>Return date: {returnDate}</Text>
              </View>
            <IconButton
                    icon="comment-edit"
                    iconColor='#000'
                    size={40}
                    onPress={() => {
                        navigation.navigate("ReviewUser", {isbn: isbn})
                    }}
                />
          </View>
        )
    }

        
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        width: '93%', 
        marginHorizontal: '5%', 
        flexDirection:'row',
        marginLeft: 15,
        marginRight: 15,
        margin: 7,
        borderRadius: 15, 
        backgroundColor: '#ECECEC',
        shadowColor: '#171717'
      },
      TextColumn: {
        alignItems: 'flex-start',
        width: '70%', 
        marginHorizontal: '5%', 
        flexDirection:'column',
      },
      containerColumn: {
        alignItems: 'center',
        width: '93%', 
        marginHorizontal: '5%', 
        flexDirection:'column',
        marginLeft: 15,
        marginRight: 15,
        margin: 7,
        borderRadius: 15, 
      },
      icon:{
        margin: 10,
      },
      title:{
        fontWeight: 'bold', 
        fontSize: 20, 
        marginTop: 3
      }

})