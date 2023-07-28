import React, { useEffect, useState } from "react";
import Icon  from 'react-native-vector-icons/AntDesign';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";


export default class Review extends React.Component{
    render(){
        const {reviewer, recommended, review} = this.props.review
        let icon;
        if(recommended == true){
            icon = "like1"
        }else{
            icon = "dislike1"
        }
        return(
          <View style={styles.container}>
              <View style={styles.TextColumn}>
                  <Text style={styles.title}>{reviewer}</Text>
                  <Text>{review}</Text>
              </View>
              <Icon name={icon} size={40} color="#000" style={styles.icon}/>
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