import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Text, View,TouchableOpacity,ScrollView, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
//import ApiCalendar from 'react-google-calendar-api';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-login-google';

//export default function Home({ route, navigation }) {
  export default function Home() {
    const[userInfo, setUserInfo] = setState("");

/*   const responseGoogle = response => {
    console.log(response);
  }
  const responseError = error => {
    console.log(error);
  } */

  /*
  const config = {
    "clientId": "601630457399-3st75uj1css39f18ik7jhntvb20s5uu2.apps.googleusercontent.com",
    "apiKey": "AIzaSyDflIzw8SU2Myzoen-xIb6qmZmcwsBxN2k",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  }
  
  const apiCalendar = new ApiCalendar(config);

  // The user need to signIn with Handle AuthClick before
    apiCalendar.listEvents({
      timeMin: new Date().toISOString(),
      timeMax: new Date().addDays(10).toISOString(),
      showDeleted: true,
      maxResults: 10,
      orderBy: 'updated'
  }).then(({ result }) => {
    console.log(result.items);
  });
 */

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/calendar'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '601630457399-3st75uj1css39f18ik7jhntvb20s5uu2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: 'https://auth.expo.io', // specifies a hosted domain restriction
    forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login.
  });

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  

  return (
   
    <View style = {styles.container}>
        <ScrollView>     
            <Text> Bienvenido a Home </Text>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
              disabled={this.state.isSigninInProgress}

              /* clientId= '601630457399-3st75uj1css39f18ik7jhntvb20s5uu2.apps.googleusercontent.com'
              buttonText='inicia sesion y autoriza el calendario'
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={'single_host_origin'}

              responseType='code'
              accessType='offline'
              scope='openid email profile https://www.googleapis.com/auth/calendar' */
            />
            {/* <TouchableOpacity style={ styles.btns } onPress={() => { handleClick() } }>
                <Text>Agregar Evento</Text>          
            </TouchableOpacity> */}
          
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