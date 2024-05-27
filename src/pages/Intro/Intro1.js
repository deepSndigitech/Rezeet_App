
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window')


const Intro1 = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Color = useSelector(state => state.Theme.Color)


  const handleSkip = () => {
    props.navigation.navigate('Welcome')
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.onPrimary, paddingTop: 20 }}>
      <ImageBackground style={{ height: '100%', }} source={require('../../Images/rezeetImg/Onboarding01.png')} >
        <View style={{ marginHorizontal: 20, }}>
          <TouchableOpacity onPress={handleSkip} style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: Color.onSecondary, fontSize: 16, fontWeight: '600' }}>Skip</Text>
          </TouchableOpacity>

          <View style={{ height: height / 2, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Image source={require('../../Images/rezeetImg/onborad1_1.png')} style={{ height: 250, width: 320, resizeMode: 'contain' }} />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: -20, flex: 1 }}>
          <Text style={{ color: Color.onSecondary, fontSize: 22, fontWeight: 'bold' }}>Welcome to ReZeet</Text>
          <Text style={{ color: Color.onSecondary, fontSize: 15, fontWeight: '400', lineHeight: 30 }}>Your mobile solution to Digital Receipt Archiving.</Text>

        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, bottom: 30, alignItems: 'center' }}>

          <Text></Text>
          <TouchableOpacity style={{ padding: 6, borderRadius: 20, backgroundColor: Color.onSecondary }} onPress={() => props.navigation.navigate('Intro2')}>
            <Image style={{ height: 25, width: 25, tintColor: Color.onPrimary }} source={require('../../Images/rezeetImg/right.png')} />
          </TouchableOpacity>
        </View>

      </ImageBackground>


    </View>
  );
};



export default Intro1;
