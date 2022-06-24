import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

const google_url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token="  
// Implementer inicio de sesion con google

export default function Login({ navigation }) {

  const [userInfo, setUserInfo] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [imgUser, setImgUser] = React.useState("");  
  
  function getUserInfo(token){
    fetch(token)
    .then(res =>  res.json())
    .then(res => {
      
      setUserInfo(res.name),
      setImgUser(res.picture),
      setUserEmail(res.email)
      
    })
    
  }

  /* INICIO DE SESION */
   const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '601630457399-3st75uj1css39f18ik7jhntvb20s5uu2.apps.googleusercontent.com'
  });
  
    React.useEffect(() => {
      if (response?.type === 'success') {
          console.log(response);
          const { authentication } = response;

          let token = google_url + response.authentication.accessToken;
          getUserInfo(token);
        }
    }, [response]);

    React.useEffect(() => {
      if(userEmail != "")
      {
        navigation.navigate("DrawerHome", {name: userInfo, email: userEmail, img: imgUser});
      }
      
    }, [userEmail]);
    

  return (
   
    <View style = {styles.container}>
      <StatusBar hidden />
        <Text style = {styles.titulo}> 
            Bienvenido a nuestro Proyecto
        </Text>
        <Text style={ styles.texto }> 
          Necesitas iniciar sesión para poder acceder a la App.
        </Text>         
        <TouchableOpacity style={ styles.btns }
                          onPress={() =>  {promptAsync();} 
                          }>
          <Text  style={ styles.btnsTxt }>Iniciar Sesión</Text>
        </TouchableOpacity>
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
    color: 'black'
  },
  texto: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20,
    marginHorizontal: 20

  },
  btns: {
    justifyContent: "center",
    backgroundColor: "#ffcd00",
    borderRadius: 6,
    width: "60%",
    marginHorizontal: "20%",
    padding:10,
    elevation:5
  },
  btnsTxt: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    fontWeight: 'bold',        
  },
});