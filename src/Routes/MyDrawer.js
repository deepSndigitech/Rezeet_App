import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../reduxToolkit/ThemeSlice'
import Switch from '../constantComponent/Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyDrawer = props => {


  const dispatch = useDispatch()
  const Color = useSelector(state => state.Theme.Color)
  const isDarkMode = useSelector(state => state.Theme.isDarkMode)
  console.log("isDarkMode", isDarkMode, Color);

  const [open, setOpen] = useState(false)

  const logoutScreen = async () => {
    await AsyncStorage.removeItem('Token');
    props.navigation.navigate('Welcome')
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }]
    });
  }


  return (
    <View style={{ flex: 1, backgroundColor: Color.primary }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30 }}>
          <TouchableOpacity style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', }} activeOpacity={0.6} onPress={() => props.navigation.toggleDrawer()}>
            <Image source={require('../Images/close4.png')} style={{ height: 20, width: 20, tintColor: '#FFF' }} />

          </TouchableOpacity>
          <View style={{}}>
            <Switch dark={() => dispatch(changeTheme())} />

          </View>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => props.navigation.navigate('Profile')}>
            <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/profile.png')} />
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Profile</Text>
          </TouchableOpacity>

          {open ?
            <>
              <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => setOpen(!open)}>
                <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/folder.png')} />
                <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Folder</Text>
                <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF', marginLeft: 20 }} source={require('../Images/rezeetImg/up_arrow.png')} />

              </TouchableOpacity>

              <View style={{ marginLeft: 40 }}>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => props.navigation.navigate('Folders', { "type": "Personal Folder" })}>
                  <Image style={{ resizeMode: 'contain', height: 25, width: 25, tintColor: '#FFF' }} source={require('../Images/rezeetImg/pers_folder.png')} />
                  <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: '700', color: '#FFF' }}>Personal Folder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => props.navigation.navigate('Folders', { "type": "Business Folder" })}>
                  <Image style={{ resizeMode: 'contain', height: 25, width: 25, tintColor: '#FFF' }} source={require('../Images/rezeetImg/bus_Folders.png')} />
                  <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: '700', color: '#FFF' }}>Business Folder</Text>
                </TouchableOpacity>


              </View>

            </>


            :

            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => setOpen(!open)}>
              <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/folder.png')} />
              <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Folder</Text>
              <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF', marginLeft: 20 }} source={require('../Images/rezeetImg/down_arrow.png')} />

            </TouchableOpacity>

          }


          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => props.navigation.navigate('Notifications')}>
            <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/bell.png')} />
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Notifications</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => props.navigation.navigate('Eco_Impacts')}>
            <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/eco_Impact.png')} />
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Eco Impact</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}
            onPress={() => Alert.alert("Comming Soon !!")}
            // onPress={() => dispatch(changeTheme())}
          >
            <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/feedback2.png')} />
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Feedback</Text>
          </TouchableOpacity> */}


          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => logoutScreen()}>
            <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: '#FFF' }} source={require('../Images/rezeetImg/logout.png')} />
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#FFF' }}>Logout</Text>
          </TouchableOpacity>

        </View>



      </View>

    </View>
  );
};


export default MyDrawer