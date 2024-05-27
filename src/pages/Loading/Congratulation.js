import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';


// import LottieView from 'lottie-react-native';


const Congratulation = props => {

  const Color = useSelector(state => state.Theme.Color)


  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login')
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 2000);

  }, [])






  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.onPrimary }}>

      <Image source={require('../../Images/rezeetImg/congress.gif')} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
      <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: color.secondry }}>Congratulation</Text>
      <Text style={{ textAlign: 'center', fontSize: 14, color: color.secondry, fontWeight: '700' }}>you have been successfully registered</Text>




    </View>
  )
}

export default Congratulation