import React, {useState , useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format,formatDistanceToNowStrict, } from 'date-fns'


  export default function HomePage({navigation, user}) {
  const [userProfiles , setUserProfiles] = useState('')

  const UsersProfile = async () => {
    const snapshots = firestore().collection('users').where('uid','!=',user.uid)
    snapshots.onSnapshot( (querySnap) => {
      const allUsers = querySnap?.docs.map( item => item.data() )
      setUserProfiles(allUsers)
    })
  }   

  useEffect( () => {
    UsersProfile();
  },[])

  return (
    <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={'#075E54'} />
          <FlatList 
            data={userProfiles}
            keyExtractor={(item) => item.uid}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {

              return(
                <View style={{}}>
                  <TouchableOpacity style={styles.ProfileView} onPress={() => navigation.navigate('Chat', 
                    {
                      name: item.name, 
                      img:item.profileImage, 
                      uid: item.uid , 
                      status: typeof(item.status) == 'string' 
                      ? 
                      item.status 
                      : 
                      "Last seen" +" "+ format(item.status.toDate() , 'hh:mm aaa ccc dd-LLL')
                    } 
                  )}>
                    <TouchableOpacity style={styles.ProfileImg}>
                      <Image source={{uri: item.profileImage }} style={{backgroundColor: '#075E54',width: 60,height: 60,borderRadius: 30}} />
                    </TouchableOpacity>
                      
                    <View style={styles.TextView}>
                      <Text style={styles.TextProfile} >{item.name}</Text>
                      <Text style={[styles.TextProfile, {top: 3, fontSize: 14}]} >{item.email}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ProfileView: {
    backgroundColor: '#fff' , 
    width: "94%", 
    height: 60, 
    marginTop: 5,
    marginBottom: 14,
    borderRadius: 6,
    flexDirection: 'row',
    marginLeft: "3%",
  },
  ProfileImg: {
    backgroundColor: '#333' , 
    width: 60, 
    height: 60, 
    borderRadius: 30,
    marginTop: 9,
    left: 4
  },
  TextView: {
    flexDirection: 'column',
    paddingTop: 22,
    left: 20,
  },
  TextProfile: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    color: '#000'
  }

})






// const snapshots = await firestore().collection('users').where('uid','==',user.uid).get()
//     const ProfileUser = snapshots.docs.map( (item) =>  console.log(item.data()))
    // const allUsers = snapshots.docs.map((item) => item.data())
    
 // const allUsers = snapshots.docs.map((item) => item.data())
   

    // Users.onSnapshot( (querySnap) => {
    //   const allUsers = querySnap?.docs.map( item => item.data() )
    // })



              // if ( typeof(item.status) == 'string') {
              //   let Item = item.status
              //   // console.log(Item)
              // }else{
              //   let DDD = item.status.toDate()
              //   const TimeFormat = format(DDD , 'hh:mm aaa ccc dd-LLL')
              //   console.log(TimeFormat)
              //   Date(TimeFormat)
              // }



// let TimeLap = formatDistanceToNowStrict(DDD)
              // let DateFormat = format(DDD , 'ccc dd-LLL-yyyy')

              // let Time = format(DDD , 'hh:mm aaa')
              // let Date = new Date().getHours()
              // let Time = item.status.toDate().toLocaleTimeString().split(' ')

              // let HMS = Time[4]
              // let format = Time[5]
              // let FullTime = HMS +' '+format 
              // let FullDateTime = Date + " " + FullTime 
              // console.log(TimeFormat)