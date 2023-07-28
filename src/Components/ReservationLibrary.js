import React, { useEffect, useState } from "react";
import { IconButton } from 'react-native-paper';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";


export default class ReservationsLibrary extends React.Component{
    render(){
        const {booktitle, checkoutdate, duedate, id, user } = this.props.reservation
        const navigation = this.props.navigation
        return(
        <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              navigation.navigate('ReservationInfo', { id: id})
           }}>
          <View style={styles.container}>
              <View style={{textAlign: 'center', width: '60%'}}>
                <Text style={styles.title}>{booktitle}</Text>
                <Text style={styles.subTitle}>Reader:  {user.name}</Text>
                <Text style={styles.subTitle}>Check-Out date:  {checkoutdate}</Text>
                <Text style={styles.subTitle}>Return date:  {duedate}</Text>
              </View>
          </View>
          </TouchableOpacity>
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
        padding: 5,
        borderRadius: 15, 
        backgroundColor: '#ECECEC'
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