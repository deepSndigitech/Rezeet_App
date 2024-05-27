import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';
const Tax_Filling = props => {


  const Color = useSelector(state => state.Theme.Color)




  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.onPrimary }}>
        {/* <StatusBar barStyle="default" /> */}
        <ImageBackground source={require('../../Images/rezeetImg/tax.png')} style={{ height: 350, width: '100%', paddingTop: 10 }}  >
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: Color.onSecondary, elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 40, color: Color.onSecondary, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Tax Filling</Text>
          </View>
          {/* <ImageBackground style={{ height: 200, width: '100%', marginTop: 50, justifyContent: 'center' }} source={require('../../Images/rezeetImg/treeEco.png')}> */}
          {/* <Text style={{ color: color.balck2, fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>Comming Soon .</Text> */}
          {/* </ImageBackground> */}

        </ImageBackground>


        <ScrollView style={{}}>
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20, }}>
            <Text style={{ color: Color.onSecondary, fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>Comming Soon .</Text>


          </View>


        </ScrollView>

      </View>
    </SafeAreaView>
  )
}


export default Tax_Filling


