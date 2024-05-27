
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window')


const Intro2 = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const Color = useSelector(state => state.Theme.Color)



  const handleSkip = () => {
    props.navigation.navigate('Welcome')
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.onPrimary, paddingTop: 20 }}>
      <ImageBackground style={{ height: '100%', }} source={require('../../Images/rezeetImg/Onboarding02.png')} >
        <View style={{ marginHorizontal: 20, }}>
          <TouchableOpacity onPress={handleSkip} style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: Color.onSecondary, fontSize: 16, fontWeight: '600' }}>Skip</Text>
          </TouchableOpacity>

          <View style={{ height: height / 2, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Image source={require('../../Images/rezeetImg/onBoard2_1.png')} style={{ height: 250, width: 280, resizeMode: 'contain' }} />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: -20, flex: 1 }}>
          <Text style={{ color: Color.onSecondary, fontSize: 22, fontWeight: 'bold', lineHeight: 40, }}>Convenient and Sustainable!</Text>
          <Text style={{ color: Color.onSecondary, fontSize: 15, fontWeight: '400', marginHorizontal: 40, marginTop: 5, textAlign: 'center' }}>Scan and Save your QR code, View Receipt and Repeat.</Text>

        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, bottom: 30, alignItems: 'center' }}>
          <TouchableOpacity style={{ width: 100, height: 30, borderColor: Color.onSecondary, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1 }} onPress={() => props.navigation.pop()}>
            <Text style={{ color: Color.onSecondary, fontWeight: 'bold' }}>Back</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity style={{ padding: 6, borderRadius: 20, backgroundColor: Color.onSecondary }} onPress={() => props.navigation.navigate('Intro3')}>
            <Image style={{ height: 25, width: 25, tintColor: Color.onPrimary }} source={require('../../Images/rezeetImg/right.png')} />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
};



export default Intro2;
