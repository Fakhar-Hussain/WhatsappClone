import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {navigationRef} from './RootNavigation.js';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import HomePage from './Screens/HomePage'
import ChatPage from './Screens/ChatPage';
import AccountPage from './Screens/AccountPage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user , setUser] = useState('');

  useEffect(() => {
    const Subscription = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        firestore().collection('users').doc(userExist.uid)
        .update({
          status: 'online'
        })
        setUser(userExist);
      } else {
        setUser('');
      }
    })

    return () => {
      Subscription()
    }
  },[])




  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator >
        {

          user !== ''
          ?
          <>

            <Stack.Screen name='Home' 
              options={{
                headerShown: true,
                headerStyle :{backgroundColor: "#075E54"},

                headerTitle: () => {
                  return(
                    <View style={{}} >
                      <Text style={{fontSize: 22 ,fontFamily: 'Ubuntu-Medium', color: '#fff'}} >Whatsapp</Text>
                    </View>
                )}, 
                headerRight: () => {
                  return(
                    <TouchableOpacity style={{}} onPress={() => navigationRef.navigate('Profile' )}>
                      <Text style={{fontSize: 18 ,top: 3,fontFamily: 'Ubuntu-Medium', color: '#fff'}} >Profile</Text>
                    </TouchableOpacity>
                )},
              }} 
            >
              {props => <HomePage {...props} user={user} /> }
            </Stack.Screen>

            <Stack.Screen name='Chat' 
            
            options={({ route }) => ({
                  headerStyle :{backgroundColor: "#075E54"},
                  headerTintColor: "#fff",
                  headerTitle: () => {
                    return(
                      <View style={{flexDirection: 'row',left: -16, alignItems: 'center'}} >
                        <Image source={{uri: route.params.img }} style={{backgroundColor: 'green',width: 45,height: 45,borderRadius: 23, top: -3}} />
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{fontSize: 18 ,fontFamily: 'Ubuntu-Medium', color: '#f3f3f3', left: 10,top: -3}} >{route.params.name}</Text>
                          <Text style={{fontSize: 14 ,fontFamily: 'Ubuntu-Medium', color: '#f3f3f3', left: 10,width: 240,maxHeight: 20,top: -2, }} >{route.params.status}</Text>
                          {/* {route.params.status} */}
                        </View>
                      </View>
                  )},
                })
              } 
            >
              {props => <ChatPage {...props} user={user} /> }
            </Stack.Screen>
            
            <Stack.Screen name='Profile' 
              options={{
                headerShown: true,
                headerStyle :{backgroundColor: "#075E54",},
                headerTintColor: "#fff",
                headerTitleStyle: {fontFamily: 'Ubuntu-Bold'}
              }}>
              {props => <AccountPage {...props} user={user} /> }
            </Stack.Screen>

          </> 
          :
          <>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}} />
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
