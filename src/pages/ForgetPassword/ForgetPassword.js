import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import Toast from 'react-native-toast-message'

// import { color } from '../../constantComponent/color';
import VarifyOtp from '../../constantComponent/VarifyOtp';
import { useSelector } from 'react-redux';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import StatusBarApp from '../../constantComponent/StatusBar';


const ForgetPassword = props => {



  const Color = useSelector(state => state.Theme.Color)
  const [loading, setLoading] = useState(false);


  const [email, setemail] = useState("")
  const [emailError, setEmailError] = useState("");


  const [hide, sethide] = useState(false);


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };


  const handleRegistration = () => {
    setEmailError("");

    let isValid = true;



    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };


  const forgetPassword = async () => {
    const registrationResult = handleRegistration();
    if (registrationResult.success) {
      setLoading(true)
      let body = {
        method: apimethods.P,
        url: apiRoutes.forgetPass,
        data: {
          "email": email
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
          sethide(!hide)
          // props.navigation.navigate('ConfirmePassword', { "email": email })
        } catch (error) {
          console.error('Error setting item in AsyncStorage:', error);
        }
      } catch (error) {
        setLoading(false)
        Toast.show({
          text1: error?.response?.data?.message,
          type: 'error'
        });
        console.error('Error setting item in AsyncStorage:', error);

      }
    }


  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.onPrimary, }}>
      {/* <StatusBarApp /> */}

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>

        <TouchableOpacity style={{ flexDirection: 'row', width: 35 }} onPress={() => props.navigation.pop()}>
          <Image style={{ height: 35, width: 35, marginRight: 10, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/left_arrow.png')} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginHorizontal: 20 }}>

        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, fontWeight: '700', color: Color.primaryButt }}>Forgot Password</Text>
        <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20 }}>No worries! Enter your email address below and we will send you a code to reset password.</Text>
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

          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 150, marginHorizontal: 20, borderRadius: 10, padding: 8, width: '75%', borderWidth: 1, borderColor: Color.primary, justifyContent: 'center', backgroundColor: Color.primaryButt }} onPress={() => forgetPassword()}>
            {loading ?
              <View><ActivityIndicator size="large" color={Color.onPrimary} /></View> :
              <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Send code</Text>
            }
          </TouchableOpacity>


        </View>
      </View>
      <VarifyOtp visible={hide} onClose={() => sethide(!hide)} props={props} email={email} />


    </ScrollView>
  )
}
export default ForgetPassword
