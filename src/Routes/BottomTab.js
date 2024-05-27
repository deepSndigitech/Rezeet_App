import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image, View, Text } from 'react-native';

import Home from '../pages/Home/Home';
import { color } from '../constantComponent/color';
import Profile from '../pages/Profile/Profile';
import Eco_Impact from '../pages/Eco_Impact/Eco_Impact';
import Folder from '../pages/Folder/Folder';
import ScanQR from '../pages/ScanQR/ScanQR';
import { useSelector } from 'react-redux';
import Tax_Filling from '../pages/Tax_Filling/Tax_Filling';

const Tab = createBottomTabNavigator();

const BottomTab = (props) => {

  const Color = useSelector(state => state.Theme.Color)




  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false }}
      screenOptions={({ route }) => ({


        tabBarStyle: [{ backgroundColor: Color.onTertiary, borderTopRightRadius: 15, borderTopLeftRadius: 15, height: 60, elevation: 5, marginTop: -10 }],


        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return (

              <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: focused ? 3 : 0, paddingHorizontal: 10, borderColor: color.secondry }}>
                <Image source={require('../Images/rezeetImg/home.png')} style={{ tintColor: focused ? color.secondry : Color.onSecondary, height: 30, width: 30, resizeMode: 'contain' }} />
                {/* {focused &&  */}
                <Text style={{ color: focused ? color.secondry : Color.onSecondary, textAlign: 'center', fontSize: 11, fontWeight: '700' }}>{"Home"}</Text>
                {/* // } */}
              </View>

            );

          } else if (route.name === 'Folders') {
            return (

              <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: focused ? 3 : 0, paddingHorizontal: 10, borderColor: color.secondry }}>
                <Image source={require('../Images/rezeetImg/folder.png')} style={{ tintColor: focused ? color.secondry : Color.onSecondary, height: 30, width: 30, resizeMode: 'contain' }} />
                {/* {focused &&  */}
                <Text style={{ color: focused ? color.secondry : Color.onSecondary, textAlign: 'center', fontSize: 11, fontWeight: '700' }}>{"Folder"}</Text>
                {/* // } */}
              </View>

            );

          } else if (route.name === 'Scan') {
            return (
              <View style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35, backgroundColor: Color.onPrimary, marginTop: -40, elevation: 5 }}>
                <Image style={{ height: 60, width: 60 }} source={require('../Images/rezeetImg/post.png')} />
              </View>

            );

          } else if (route.name === 'Eco_Impacts') {
            return (

              <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: focused ? 3 : 0, paddingHorizontal: 2, borderColor: color.secondry }}>
                <Image source={require('../Images/rezeetImg/eco_Impact.png')} style={{ tintColor: focused ? color.secondry : Color.onSecondary, height: 30, width: 30, resizeMode: 'contain' }} />
                {/* {focused &&  */}
                <Text style={{ color: focused ? color.secondry : Color.onSecondary, textAlign: 'center', fontSize: 11, fontWeight: '700' }}>{"Eco Impact"}</Text>
                {/* // } */}
              </View>



            );

          }

          else if (route.name === 'Profile') {
            return (

              <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: focused ? 3 : 0, paddingHorizontal: 7, borderColor: color.secondry }}>
                <Image source={require('../Images/rezeetImg/profile.png')} style={{ tintColor: focused ? color.secondry : Color.onSecondary, height: 30, width: 30, resizeMode: 'contain' }} />
                {/* {focused &&  */}
                <Text style={{ color: focused ? color.secondry : Color.onSecondary, textAlign: 'center', fontSize: 11, fontWeight: '700' }}>{"Profile"}</Text>
                {/* // } */}
              </View>

            );
          }
        },
      })}

    >

      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, }} />
      <Tab.Screen name="Folders" component={Folder} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanQR} options={{ headerShown: false }} />
      <Tab.Screen name="Eco_Impacts" component={Eco_Impact} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />


    </Tab.Navigator>
  );
};



export default BottomTab