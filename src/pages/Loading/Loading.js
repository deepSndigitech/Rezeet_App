import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';


// import LottieView from 'lottie-react-native';


const Loading = props => {

  const Color = useSelector(state => state.Theme.Color)


  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Congratulation')
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Congratulation' }],
      });
    }, 2500);

  }, [])






  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.onPrimary }}>

      <Image source={require('../../Images/rezeetImg/Loading.gif')} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
      <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700', color: color.secondry }}>Please Wait</Text>
      <Text style={{ textAlign: 'center', fontSize: 13, color: color.secondry, fontWeight: '700' }}>while we are configuring your account</Text>




    </View>
  )
}

export default Loading