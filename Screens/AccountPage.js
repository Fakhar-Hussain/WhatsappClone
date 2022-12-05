import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image , ImageBackground, StatusBar } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function AccountPage({user , route}) {
  
  const [profile , setProfile] = useState('')


  const SignOut = () => {
    firestore().collection('users').doc(user.uid)
    .update({
      status: firestore.FieldValue.serverTimestamp()
    })
    .then( () => {
        auth().signOut()
    })
  }

  const User = async () => {
    const snapshots = await firestore().collection('users').where('uid','==',user.uid).get()
    snapshots.docs.map( (item) =>  setProfile(item.data()))
  }


  useEffect( () => {
    User()
  },[])

  return (

      <ImageBackground 
        source={{uri: "https://cdn.wallpapersafari.com/19/15/HlpKYq.png"}}
        resizeMode={'cover'}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <StatusBar translucent={false} backgroundColor={'#075E54'} />


        <View style={styles.ImageView} >
          <View style={styles.TouchImageView} >
            <Image style={{width: 160,height: 160,borderRadius: 80,}} source={{uri: profile.profileImage }} />
          </View>
        </View>

        {/* editable={false} */}
        <View style={styles.ProfileData} >
          <View style={{flexDirection: 'row'}} >
            <Text style={styles.Text} >Name: </Text>
            <TextInput style={styles.TextInput} value={profile.name} editable={false} />
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.Text} >Email: </Text>
            <TextInput style={styles.TextInput} value={profile.email} editable={false} />
          </View>
          
          <TouchableOpacity style={styles.BtnView} onPress={() => SignOut()} >
            <Text style={styles.BtnText} >SignOut</Text>
          </TouchableOpacity>
      
        </View>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#075E54",
    alignItems: "center",
  },
  ImageView: {
    flex: 1, 
    width: "100%", 
    alignItems: "center",
  },
  TouchImageView: {
    top: 20,
  },


  ProfileData: {
    flex: 2,
    width: "100%",  
    paddingTop: '20%',
    alignItems: "center"
  },
  Text: {
    top: 18,
    fontSize: 14,
    fontFamily: 'Ubuntu-Bold',
    color: '#fff'
  },
  TextInput: {
    width: "74%",
    height: 50,
    marginBottom: 30,
    color: '#fff',
    paddingLeft: 14,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#fff',
    fontFamily: 'Ubuntu-Bold'
  },
  BtnView: {
    width: 140,
    height: 45,
    backgroundColor: '#075E54',
    borderRadius: 5,

    alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
  },
  BtnText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Ubuntu-Bold'
  },
})