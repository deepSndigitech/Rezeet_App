import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import StatusBarApp from '../../constantComponent/StatusBar';
import { useDispatch, } from 'react-redux';
import { changeTheme } from '../../reduxToolkit/ThemeSlice'
import axios from 'axios';


const Login = props => {
  const dispatch = useDispatch()

  const Color = useSelector(state => state.Theme.Color)




  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [hide, sethide] = useState(true);


  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 3;
  };

  const handleRegistration = () => {
    setEmailError("");
    setPasswordError("");
    let isValid = true;



    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };


  const LogIn = async () => {
    const registrationResult = handleRegistration();
    if (registrationResult.success) {
      setLoading(true)

    
      let body = {
        method: apimethods.P,
        url: apiRoutes.logIn,
        data: {
          "email": email,
          "password": password
        }
      };
      try {
        const data = await apiMethod(body)
        setLoading(false)
        try {
          Toast.show({
            text1: data?.registerData?.message,
            type: 'success'
          });
          // console.error('Error setting item in AsyncStorage:', data?.registerData);
          await AsyncStorage.setItem('Token', data?.registerData.token);

          props.navigation.navigate('Home')
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          });
        } catch (error) {
          console.error('Error setting item in AsyncStorage:', error);
        }
      } catch (error) {
        setLoading(false)
        console.log('error', error?.response?.data);
        Toast.show({
          text1: error?.response?.data?.message,
          type: 'error'
        });

      }
    }


  }


  const Toasttry = () => {
    Toast.show({
      text1: "data?.registerData?.message",
      type: 'success'
    });
  }



  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.onPrimary, }}>
      {/* <StatusBarApp /> */}

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>

        <TouchableOpacity style={{ flexDirection: 'row', width: 35 }} onPress={() => props.navigation.navigate('Welcome')}>
          <Image style={{ height: 35, width: 35, marginRight: 10, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/left_arrow.png')} />
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1, marginHorizontal: 20 }}>

        <Text style={{ fontSize: 32, textAlign: 'center', marginTop: 70, fontWeight: '900', color: Color.primaryButt }}>Login</Text>
        {/* <Text style={{ fontSize: 15, textAlign: 'center', color: '#000266' }}>Login to continue</Text> */}
        <View style={{ flex: 1, marginTop: 50 }}>
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>E-mail</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center' }}>

            <TextInput style={{ padding: 0, paddingHorizontal: 10, color: Color.primary }} placeholder="Enter your email" placeholderTextColor={Color.primary}
              keyboardType='email-address'
              onChangeText={(text) => { setemail(text), setEmailError("") }}
              value={email}
            />

          </View>
          {emailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{emailError}</Text>}
          <View style={{ marginTop: 10 }} />
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Password</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TextInput style={{ padding: 0, width: '80%', color: Color.primary }}
              placeholder="Enter your password"
              placeholderTextColor={Color.primary}
              secureTextEntry={hide}
              onChangeText={(text) => { setpassword(text), setPasswordError("") }}
              value={password} />
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => sethide(!hide)} disabled={true}>
              <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={hide ?
                require('../../Images/rezeetImg/hide.png') :
                require('../../Images/rezeetImg/show.png')
              } />
            </TouchableOpacity>
          </View>
          {passwordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{passwordError}</Text>}



          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 5, marginHorizontal: 15 }} onPress={() => props.navigation.navigate('ForgetPassword')}><Text style={{ color: '#3C9AFB', fontWeight: 'bold', textDecorationLine: 'underline' }}>Forget Password ?</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 35, marginHorizontal: 20, borderRadius: 10, backgroundColor: Color.primaryButt, padding: 6, width: '50%', borderWidth: 1, borderColor: Color.onSecondary, justifyContent: 'center' }} onPress={() => LogIn()}>
            {loading ?
              <View><ActivityIndicator size="small" color="#FFF" /></View> :
              <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Login</Text>
            }
          </TouchableOpacity>

          <View style={{ marginTop: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
            <View style={{ height: 1, backgroundColor: Color.onSecondary, width: '35%' }} />
            <Text style={{ width: '10%', textAlign: 'center', color: Color.onSecondary }}>OR</Text>
            <View style={{ height: 1, backgroundColor: Color.onSecondary, width: '35%' }} />
          </View>
          <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ color: Color.onSecondary }}>Don't Have an Account ?</Text>
            <TouchableOpacity onPress={() =>
              props.navigation.navigate('SignUp')
              // dispatch(changeTheme())
            }>
              <Text style={{ fontWeight: '700', color: Color.onSecondary, textDecorationLine: 'underline' }}> Create Account</Text>
            </TouchableOpacity>
          </View>



          {/* 
          <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: Color.onPrimary, padding: 6, width: '70%', borderWidth: 1, borderColor: Color.onSecondary, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }} onPress={() => Toasttry()}>
            <Image source={require('../../Images/rezeetImg/google.png')} style={{ height: 20, width: 20, resizeMode: 'contain', }} />
            <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 16, marginLeft: 10 }}>Login with Google</Text>
          </TouchableOpacity> */}







        </View>
      </View>


    </ScrollView>
  )
}
export default Login
