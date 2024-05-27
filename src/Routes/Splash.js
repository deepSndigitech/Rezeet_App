import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux'
const Splash = () => {
  const anim1 = useRef(new Animated.Value(-100)).current;
  const anim2 = useRef(new Animated.Value(100)).current;
  const Color = useSelector(state => state.Theme.Color)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: Color.onPrimary

    }}>
      <Animated.View style={[{ marginHorizontal: 0 }, { transform: [{ translateX: anim1 }] }]}>
        <Image source={require('../Images/rezeetImg/logoS1.png')} style={{ height: 120, width: 100, resizeMode: 'contain', tintColor: Color.onSecondary, }} />
      </Animated.View>
      <Animated.View style={[{ marginHorizontal: 0 }, { transform: [{ translateX: anim2 }] }]}>
        <Image source={require('../Images/rezeetImg/logoS2.png')} style={{ height: 120, width: 140, resizeMode: 'contain', tintColor: Color.onSecondary, }} />
      </Animated.View>
    </View>
  );
};


export default Splash;
