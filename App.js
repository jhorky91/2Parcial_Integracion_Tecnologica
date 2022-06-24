import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

import Login from './screens/Login';
import DrawerHome from './navigators/DrawerHome';



export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator  initialRouteName="Login">

        <Stack.Screen  name="Login"  component={Login} options={{  headerShown: false  }} />
        
        { <Stack.Screen name="DrawerHome" component={DrawerHome} options={{  headerShown: false,  }} />         }
        
      </Stack.Navigator>

    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//
// APIs
// https://restcountries.com/#rest-countries-users
// https://www.metaweather.com/api/
//
//
// npm install @react-navigation/bottom-tabs
// npm install @react-navigation/stack
// npm install @react-navigation/drawer
// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// expo install expo-auth-session expo-random
// expo install react-native-maps
// npm install install @expo/ngrok@^4.1.0 globally
// npm install @expo/ngrok@^4.1.0 globally