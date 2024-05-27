import { View, Text, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { color } from '../constantComponent/color'
import ScanWithoutLogIn from '../constantComponent/ScanWithoutLogIn'
import { useSelector } from 'react-redux'


// import LottieView from 'lottie-react-native';


const Welcome = props => {

  const [withoutScan, setWithoutScan] = useState(false);
  const Color = useSelector(state => state.Theme.Color)



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#170B3B' }}>
        {/* <StatusBar barStyle="default" /> */}
        <Image source={require('../Images/rezeetImg/logo.png')} style={{ height: 200, width: 200, resizeMode: 'contain', marginVertical: 10, tintColor: Color.onError }} />

        <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 10, padding: 5, width: '80%', marginVertical: 20, borderWidth: 1, borderColor: Color.onError }} onPress={() => setWithoutScan(!withoutScan)}>
          <Text style={{ color: Color.onError, textAlign: 'center', fontSize: 18 }}>Scan Without Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 10, padding: 5, width: '40%', backgroundColor: Color.onError, marginBottom: 20 }} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{ color: '#170B3B', textAlign: 'center', fontSize: 18, fontWeight: '700' }}>Login</Text>
        </TouchableOpacity>


        <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
          <View style={{ height: 1, backgroundColor: Color.onError, width: '35%' }} />
          <Text style={{ width: '10%', textAlign: 'center', color: Color.onError }}>OR</Text>
          <View style={{ height: 1, backgroundColor: Color.onError, width: '35%' }} />
        </View>

        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 30 }}>
          <Text style={{ color: Color.onError }}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={{ fontWeight: 'bold', color: Color.onError }}>Signup</Text>
          </TouchableOpacity>
        </View>


        {/* <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: Color.onPrimary, padding: 6, width: '70%', borderWidth: 1, borderColor: Color.tertiary, flexDirection: 'row', justifyContent: 'center' }} onPress={() => props.navigation.navigate('Home')}>
        <Image source={require('../Images/rezeetImg/google.png')} style={{ height: 20, width: 20, resizeMode: 'contain', }} />
        <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 16, marginLeft: 10 }}>Login with Google</Text>
      </TouchableOpacity> */}
        <ScanWithoutLogIn addmodel={withoutScan} props={props} closeModel={() => setWithoutScan(!withoutScan)} />

      </View>
    </SafeAreaView>
  )
}
export default Welcome