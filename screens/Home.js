import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as Calendar from 'expo-calendar';


export default function Home({ route }) {
  var fecha;
  var count=0;
  const option = {weekday:"long",year:"numeric", mounth:"long", day:"numeric"};
  
  const [calendarios, setCalendarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  
  const mes = {january: "Enero"};

  useEffect(() => {
    (async () => {
      
      //OBTENEMOS LOS CALENDARIOS DEL USUARIO
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );

        //console.log("Calendarios");
        //console.log({ calendars });
        setCalendarios(calendars);
        
        let arrayID=[];
        calendars.map( c => {
          if(c.source.name == route.params.email)
          {
            arrayID.push(c.id)
          }
          
        })
        let fechaActual = new Date();
        let fechaFin = new Date();
        fechaFin.setDate(fechaActual.getDate()+10);
        //console.log(fechaActual);
        //console.log(fechaFin);
        
        //OBTENEMOS LOS EVENTOS DEL USUARIO
        const event = await Calendar.getEventsAsync(arrayID, fechaActual,fechaFin);
        event.sort(ordenarArray);
        setEventos(event);
        //console.log("Eventos");
        //console.log(eventos);
      }
    }) ();

  }, []);
  
  function ordenarArray(x, y){
    let fechaX = new Date(x.startDate);
    let fechaY = new Date(y.startDate);
    if (fechaX.getTime() < fechaY.getTime()) {return -1;}
    if (fechaX.getTime() > fechaY.getTime()) {return 1;}
    return 0;
  }
  

  return (
    <View style={styles.container}>
      <ScrollView>     
        {
         (eventos[0] === false)? 
          <Text> Cargando Eventos...</Text>
        :eventos.map(evento => { count++
          
            return(
              fecha = new Date(evento?.startDate),
    
                <Card key={count} style={styles.card}>
                  <Card.Title title={((fecha.getDate().toString().length == 1)? "0"+fecha.getDate():fecha.getDate())+'/'+((fecha.getMonth().toString().length == 1)? "0"+fecha.getMonth():fecha.getMonth())+'/'+fecha.getFullYear()} titleStyle={{ color: "#EC7063", fontWeight:'bold' }}/>
                  <Card.Content>
                    <Title style={styles.titulo}>{evento?.title}</Title>
                    <Paragraph> {evento?.notes}</Paragraph>
                  </Card.Content>
                </Card>
                
           
              )
            }
          )
        }

    </ScrollView>  
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    width: '100%', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    backgroundColor:'#becfd7'
  },
  card:{
    borderWidth:1,
    marginVertical:5,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  fecha:{
    color: 'red'
  },
  titulo:{
    textAlign:"center",
    fontWeight: 'bold',
  },   
});


/*

  FORMATO ALTERNATIVO DE FECHA

  <Text>{fecha.toDateString()}</Text>




  |#############################################################|
  |#############################################################|
    CALENDARIOS

    "calendars": Array [
    Object {
      "accessLevel": "owner",
      "allowedAttendeeTypes": Array [
        "none",
        "required",
        "optional",
      ],
      "allowedAvailabilities": Array [
        "busy",
        "free",
      ],
      "allowedReminders": Array [
        "default",
        "alert",
      ],
      "allowsModifications": true,
      "color": "#4CB5DE",
      "id": "1",
      "isPrimary": false,
      "isSynced": true,
      "isVisible": true,
      "name": "My calendar",
      "ownerAccount": "My calendar",
      "source": Object {
        "isLocalAccount": true,
        "name": "My calendar",
        "type": "LOCAL",
      },
      "timeZone": null,
      "title": "My calendar",
    },


  |#############################################################|
  |#############################################################|

    EVENTO

    Array [
  Object {
    "accessLevel": "public",
    "alarms": Array [],
    "allDay": true,
    "availability": "free",
    "calendarId": "6",
    "endDate": "2022-06-21T00:00:00.000Z",
    "endTimeZone": null,
    "guestsCanInviteOthers": true,
    "guestsCanModify": false,
    "guestsCanSeeGuests": true,
    "id": "1422",
    "instanceId": "444980",
    "location": "",
    "notes": "",      <--Esto
    "organizerEmail": "es.ar#holiday@group.v.calendar.google.com",
    "originalId": null,
    "startDate": "2022-06-20T00:00:00.000Z",        <--Esto
    "timeZone": "UTC",
    "title": "Paso a la Inmortalidad del General Manuel Belgrano",    <--Esto
  },
  Object {
    "accessLevel": "default",
    "alarms": Array [
      Object {
        "method": "alert",
        "relativeOffset": -10,
      },
    ],
    "allDay": false,
    "availability": "busy",
    "calendarId": "15",
    "endDate": "2022-06-24T02:00:00.000Z",
    "endTimeZone": null,
    "guestsCanInviteOthers": false,
    "guestsCanModify": false,
    "guestsCanSeeGuests": true,
    "id": "2019",
    "instanceId": "444974",
    "location": "Av. Corrientes 2037, Ciudad Autónoma de Buenos Aires, Argentina",
    "notes": "Carballido Carina 

        -::~:~::~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~::~:~::-
        No edites esta sección de la descripción.

        Este evento tiene una videollamada.
        Unirse: https://meet.google.com/cgw-umcr-bvv
        (AR) +54 11 3986-3700 PIN: 5306551592811#
        Ver más números de teléfono: https://tel.meet/cgw-umcr-bvv?pin=5306551592811&hs=7
        -::~:~::~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~:~::~:~::-",
    "organizerEmail": "calendario_as@davinci.edu.ar",
    "originalId": null,
    "recurrenceRule": Object {
      "frequency": "weekly",
    },
    "startDate": "2022-06-24T00:00:00.000Z",
    "timeZone": "America/Argentina/Buenos_Aires",
    "title": "[ ACN5AV ] Planificación del Seminario Final (S2055)",
  },

  |#############################################################|
  */





/* Dependencias instaladas:

- expo install expo-calendar
- npm install @expo/ngrok@^4.1.0 globally
- npm install @react-navigation/native
- npm install @react-navigation/stack
- npm install @react-navigation/drawer
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
- npm install react-native-paper

*/