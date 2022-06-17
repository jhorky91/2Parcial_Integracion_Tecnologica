import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
/*import Contacto from '../screens/Contacto';
import ListaPaises from '../screens/ListaPaises';
import Map from '../screens/Map';*/

import { set } from 'react-native-reanimated'; 

const google_url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token="  

export default function DrawerHome({route, navigation}) {
  
  const [userInfo, setUserInfo] = React.useState("");
  const [imgUser, setImgUser] = React.useState("");  
  
    function getUserInfo(token){
      fetch(token)
      .then(res => res.json())
      .then(res => {
        setUserInfo(res.name),
        setImgUser(res.picture)
      })
    }

      React.useEffect(() => {
      let token = google_url + route.params.auth.accessToken;
      getUserInfo(token);
      },[])
    
    
  return (

    <Drawer.Navigator initialRouteName="Home"    
                       /* drawerContent={(props) => <Menu {...props} />}  > */
                       drawerContent={(props) => <Menu navigation = {navigation} name = {userInfo} img = {imgUser} props = {props} {...props} />}  
                       screenOptions={{
                          drawerStyle: {
                            backgroundColor: '#b3e5fb',
                        },
                        drawerLabelStyle:{
                          fontWeight:'bold'
                        },
                        drawerActiveBackgroundColor: '#fbc02d',
                        drawerActiveTintColor:'black',
                        drawerInactiveTintColor:'grey',
                        headerStyle:{
                          backgroundColor:'#03a9f4'
                        }
                        }}
                       >
      <Drawer.Screen  name="Home"   component={Home}
                      options={{ title:'Inicio',
                      drawerIcon: ({focused, size}) => (
                                <Ionicons name="home" size={size} color={focused ? 'black' : 'grey'}/> ), }}
                      initialParams={{lista: route.params.datos}} />
      
    </Drawer.Navigator>
    
  );
}

const Menu = ({navigation, name, img, props}) => {
  return(
      <DrawerContentScrollView >
        <View style = {styles.info}>
           
           {/* REVISAR ERROR */}
           
            <Image style = {styles.imgUser} source={ (img !== '')?{uri: img}: require('../images/user-icon.png')  } />  
            
           

          <Text> {name}</Text>
        </View>
        <DrawerItemList style = {styles.items} {...props} />
        <DrawerItem label = "Salir" onPress = { () => {navigation.navigate("Login")}} 
                    icon={ ({focused, size}) => (
                        <MaterialIcons name="logout" size={size} color={focused ? 'black' : 'grey'}/> )}
                     />

        <View  style = {styles.about}>
          <Text> Integración Tecnologica </Text>
          <Text> @Copyright - 2022 | Ver. 1.0 </Text>
        </View>
        
      </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({

  imgUser: {
    height:50, 
    width:50, 
    borderRadius: 150/1,
    marginBottom: 10,
  },
  info: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  items:{
    color: 'black',
  },
  about:{
    
    textAlign: 'center',
    color: 'grey',
    flexDirection:'column',
    paddingHorizontal:30,
    paddingVertical:50,
    
  }
});

