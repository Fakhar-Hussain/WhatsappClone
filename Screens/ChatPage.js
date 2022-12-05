import React, {useEffect,useState} from 'react'
import { KeyboardAvoidingView,ImageBackground, StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { GiftedChat, Bubble, Time, InputToolbar, Send,Day } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';


export default function ChatPage({user , route}) {
  const {uid} = route.params;
  const ownerID = user.uid
  const [messages, setMessages] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [BGimg, setBGimg] = useState()
  
  
  const RealTimeMessages = () => {
    const DOC_ID =  uid > ownerID ? ownerID + '-' + uid : uid + '-' + ownerID
    const messageRef = firestore().collection('chatrooms')
    .doc(DOC_ID)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot( snapshot => {
      const allMessages = snapshot?.docs.map(item => {
        const data = item.data();  
        if (data.createdAt) {
          return({
            ...item.data(),
            createdAt: item.data().createdAt.toDate(),
          })
        } 
        else {
          return( {
            ...item.data(),
            createdAt: new Date(),
          })
        }  
      })
      setMessages(allMessages)  
    })
  }

  
  
  const onSend = (message) => {
    const SMS = message[0]
    const MySMS = {
      ...SMS,
      sentBy: ownerID,
      sentTo: uid,
      createdAt: new Date(),
      sent : true,
      received : true,
      panding: true
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, MySMS))
    const DOC_ID =  uid > ownerID ? ownerID + '-' + uid : uid + '-' + ownerID
    firestore().collection('chatrooms').doc(DOC_ID).collection('messages')
    .add({...MySMS, createdAt: firestore.FieldValue.serverTimestamp() })
  }


  const Picture = async () => {
    const Image = await firestore().collection('pictures').doc('images').get()
    setBGimg(Image.data().BGIMAGE)
  }

  
  
  useEffect(() => {
    RealTimeMessages();
    Picture();
  }, [])

  return (
  <View style={styles.container}  >

        <ImageBackground
          source={{uri: BGimg}}
          resizeMode={'cover'}
          style={{ flex: 1, width: '100%', }}
        >
          <StatusBar translucent={false} backgroundColor={'#075E54'} />
          <GiftedChat
            messagesContainerStyle={{paddingBottom: 14}}
            messages={messages}
            onSend={messages => onSend(messages)}
            alwaysShowSend={true}
            user={{
              _id: ownerID,
            }}
            
              renderBubble={props => {
              return (
                <Bubble
                  {...props}
                  
                  textStyle={{
                    left: {
                      color: '#333',
                      fontFamily: 'Ubuntu-Regular',
                      paddingRight: 8,
                      paddingTop: 5
                      // Sono_Monospace-Medium
                    },
                    right: {
                      color: '#333',
                      fontFamily: 'Ubuntu-Regular',
                      paddingHorizontal: 6,
                      paddingTop: 5
                      // Sono_Monospace-Medium
                    },
                  }}
                  wrapperStyle={{
                    left: {
                      backgroundColor: '#fafafa',
                    },
                    right: {
                      backgroundColor: '#DCF8C6',
                    },
                  }}
                  tickStyle={{
                    color: '#34B7F1',
                    fontWeight: 'bold'
                  }}
                />
                );
              }}

              renderDay = {props => {
              return(
                <Day {...props} 
                containerStyle={{
                  backgroundColor: '#fafafa',
                  height: 30,
                  width: "32%",
                  justifyContent: "center",
                  paddingTop: 4,
                  borderRadius: 7,
                  marginHorizontal: '34%',
                }}
                textStyle={{
                  color: '#317560',
                  fontSize: 15,
                  marginBottom: 5,
                  fontFamily: 'Ubuntu-Bold'
                }}/>
                ) 
              }}
            

              renderTime = {props => {
              return (
                <Time
                {...props}
                
                timeTextStyle={{
                  left: {
                    color: '#333'
                  },
                  right: {
                    color: '#333'
                  }
                }}
                  />
                  );
              }}
                
              renderInputToolbar={props => {
                return(
                  <InputToolbar
                  {...props}
                  containerStyle={{
                    backgroundColor: '#fff',
                    marginHorizontal: 8,
                    borderRadius: 22,
                    height: 44,
                    width: "83%",
                    marginBottom: 10,
                    justifyContent: "center",
                    paddingBottom: 10,
                    paddingLeft: 10,
                  }}
                  />
                      )
              }}

              renderSend={ props => {
                return(
              
                  <Send {...props} 
                  containerStyle={{
                    height: 60,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 64,
                    top: 4,
                  }}
                  >
                  <View
                    style={{
                      marginBottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50, 
                      height: 50, 
                      marginRight: 10,
                    }}>
                      <Icon
                          name='send'
                          type='ionicon'
                          size={30}
                          color={'#fff'}
                          />
                  </View>
                </Send>


              )
              }}

              renderAvatar={null}



              />
      </ImageBackground>
  </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})