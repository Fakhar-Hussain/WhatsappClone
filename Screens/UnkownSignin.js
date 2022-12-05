import React, {useEffect, useState} from 'react'
import {
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  TextInput,
  KeyboardAvoidingView, 
  Button,
  ActivityIndicator
} from 'react-native'

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function SignIn({navigation}) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [enabled, setEnabled] = useState(false)
  
  const [loading, setLoading] = useState(false)
  
  const [next, setNext] = useState(false)

  const [logo, setLogo] = useState()
  


  
  
  const SubmitLogin = async () => {
    setLoading(true)
    if (email == '' || password == '') {
      setLoading(false)
      alert('Please Complete all Fields')
    }
    else{
      try {
        const result = await auth().signInWithEmailAndPassword(email,password)
        setLoading(false)

      } catch (error) {
        setLoading(false)
        alert(error.message)
      }
    }
  }
  // fakharhussain.179@gmail.com

// john.420@email.com


  
  
  const Nav = ( ) => {
    navigation.navigate('SignUp')
  setEmail('')
  setPassword('')
}

const Picture = async () => {
  const Image = await firestore().collection('pictures').doc('images').get()
  setLogo(Image.data().Logo)
  // console.log(logo)
}


useEffect( () => {
  Picture() 
  setEnabled(false)
},[])


  return (
    
    <View style={styles.container}  >
      <StatusBar translucent={false} backgroundColor={'#075E54'} />
      {
        loading == true 
        ?
        (
          <View style={{flex:1,width: '100%' ,height: '100%', justifyContent:'center',alignItems: 'center',backgroundColor: '#075E54'}}>
            <ActivityIndicator size={50} color={'#fff'} />
          </View>
        )
        :
        (
          <View style={styles.container} >

          
             {/*    Welcome text    */}
          <View style={{
            flex: 0.3, 
            alignItems: 'center',
          }} >
            <Text style={styles.welcomeText} >Welcome To Whatsapp-Beta-Version 1.1</Text>
          </View>

                {/* // LOGO & Login Text  */}
          <View style={{
            flex: 1.6, 
            alignItems: 'center'
          }} >
            <Image source={{uri: logo}} style={[styles.whatsappLogo]} />
            <Text style={[styles.SignUpText]} >Login</Text>
          </View>

                        {/* Email Password Login  */}
          
          <View style={{
            flex: 2.1, 
            alignItems: 'center',
            paddingBottom: 30,
            backgroundColor: '#075E54'
          }} >
                                              {/* Email Text & TextInput */}
                <Text style={[styles.inputText]} >Email</Text>
                <TextInput style={styles.inputField} placeholder={'Email.123@email.com'} autoCorrect={false} value={email} onChangeText={(text) => setEmail(text)} onFocus={() => setEnabled(true)}  />
              
                                              {/* Password Text & TextInput */}
                <Text style={styles.inputText} >Password</Text>
                <TextInput style={styles.inputField} placeholder={'Password'} autoCorrect={false} value={password} onChangeText={(text) => setPassword(text)} onFocus={() => setEnabled(true)} />
                                          
                                          {/* Login_Submit Button SubmitLogin */}
                <TouchableOpacity style={styles.submitBtn} onPress={() => SubmitLogin()}>
                  <Text style={styles.submitBtnTxt}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.BackBtn, {alignSelf: 'center', top: 16, left: 0 } ]} onPress={() => Nav() } >
                  <Text style={styles.submitBtnTxt}>I don't have an account..?</Text>
                </TouchableOpacity>       

          </View>
        </View>
      )
        
      }            
    </View>
  )
}

//   <KeyboardAvoidingView style={{}} behavior='position' enabled={enabled} >
// </KeyboardAvoidingView>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075E54',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Overpass-Medium',
    color: '#fff',
    // marginTop: -10
  },
  whatsappLogo: {
    width: 180,
    height: 180,
    marginTop: -10,
  },
  SignUpText: {
    marginTop: 5,
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Sono_Monospace-Bold',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    alignSelf: 'flex-start',
    marginTop: 18,
    marginLeft: 50,
    marginBottom: 4,
    color: '#fff'
  },
  inputField: {
    width: 320,
    height: 55,
    borderRadius: 5,
    fontSize: 18,
    paddingLeft: 15,
    backgroundColor: '#fafafa',
    elevation: 10,
    fontFamily: 'Ubuntu-Regular',
  },
  submitBtn: {
    width: 320,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    top: 20,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 20
  },  
  submitBtnTxt: {
    fontSize: 18,
    fontFamily: 'Sono_Monospace-Medium',
    color: '#fafafa'
  },
  BackBtn: {
    top: 10,
    alignSelf: 'flex-end',
    right: 14
  },
})

