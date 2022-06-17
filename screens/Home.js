import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Text, View,TouchableOpacity,ScrollView, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function Home({ route, navigation }) {

  return (
   
    <View style = {styles.container}>
        <ScrollView>     
            <Text> Bienvenido a Home </Text>
        </ScrollView>
    </View>
  
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#becfd7',
    alignItems: 'center',
    justifyContent: 'center',   
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: "center",
  },
  
  searchBar: {
    height: 50,
    width: 300,
    fontSize: 15,
    textAlign: "center",
    borderColor: "#ffcd00",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    marginBottom: 10,
    alignSelf: "center",
    marginVertical:10,
    elevation:5
  },
  texto: {
    fontSize: 15,
    fontWeight:'bold',
    color:'black',
    textAlign: "center",
    marginVertical:2

  },
  btns: {
    justifyContent: "center",
    backgroundColor: "#ffcd00",
    borderRadius: 6,
    width: "60%",
    marginHorizontal: "20%",
    marginVertical:10,
    padding:10,
    elevation:5
  },
  btnsTxt: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    fontWeight: 'bold',
           
  },
  parent: {
    width: '100%', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    backgroundColor:'#becfd7'
  },
  child: {
    width: '45%', 
    margin: '2%', 
    aspectRatio: 1,
  },    
});