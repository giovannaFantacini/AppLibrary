import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";


class Book extends React.Component{
    render(){
        const {isbn, title, authors, imageUrl} = this.props.book
        const navigation = this.props.navigation
        const idLibrary = this.props.library
        const nextPage = this.props.nextPage
        const authorsString = authors.map(author => author.name).join(", "); //como os authors trata-se de um array tivemos de fazer desta maneira
        return(
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                navigation.navigate(nextPage, { isbn: isbn, idLibrary: idLibrary})
              }}>

      <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%", marginHorizontal: "50%", flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>{title}</Text>
              <Text style={{ marginLeft: 10, marginBottom: 10 }}>{authorsString}</Text>
            </View>
      </View>
    </TouchableOpacity>
    );
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
      buttonHistory: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#53E88B',
      },
      textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
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
      }

})
export default Book;