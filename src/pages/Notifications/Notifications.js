import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'


import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';
const Notifications = props => {


  const Color = useSelector(state => state.Theme.Color)





  return (
    <View style={{ flex: 1, backgroundColor: Color.tertiary }}>
      {/* <StatusBar barStyle="default" /> */}
      <ImageBackground source={require('../../Images/rezeetImg/notifibackImg.png')} style={{ height: 90, width: '100%', justifyContent: 'center' }}  >
        <View style={{ flexDirection: 'row', marginTop: -10 }}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: '#FFF', elevation: 5 }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 40, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Notifications</Text>
        </View>

      </ImageBackground>


      <ScrollView style={{}}>
        <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20, bottom: 10 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((em, inde) => (

            <>
              <View style={{ borderRadius: 10, elevation: 7, backgroundColor: Color.onPrimary, flexDirection: 'row', marginTop: 10, padding: 10 }} key={inde}>
                <Text style={{ color: Color.onSecondary }}>"Hello! Your recent electricity bill has been successfully scanned. Total amount due is $78.23. Please review the details and make the payment by the due date."</Text>
              </View>
              <View style={{ borderRadius: 10, elevation: 7, backgroundColor: Color.onPrimary, flexDirection: 'row', marginTop: 10, padding: 10, borderLeftWidth: 4, borderColor: color.secondry }}>
                <Text style={{ color: Color.onSecondary }}>"Hello! Your recent electricity bill has been successfully scanned. Total amount due is $78.23. Please review the details and make the payment by the due date."</Text>
              </View>
            </>
          ))}



        </View>


      </ScrollView>

    </View>
  )
}

export default Notifications


