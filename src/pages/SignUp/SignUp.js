import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal, StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { color } from '../../constantComponent/color';
import { CountryPicker } from "react-native-country-codes-picker";
import { useSelector } from 'react-redux';
import VarifyOptions from '../../constantComponent/VarifyOptions';
import VarifyNumber from '../../constantComponent/VarifyNumber';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import VarifyEmail from '../../constantComponent/VarifyEmail';
// import StatusBarApp from '../../constantComponent/StatusBar';

const SignUp = (props) => {
  const Color = useSelector(state => state.Theme.Color)

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  const [countryCode, setCountryCode] = useState('+1');
  const [email, setemail] = useState("")
  const [emailError, setemailError] = useState("")
  const [firstName, setfirstName] = useState("")
  const [firstNameError, setfirstNameError] = useState("")
  const [lastName, setlastName] = useState("")
  const [lastNameError, setlastNameError] = useState("")
  const [contact, setContact] = useState("");
  const [contacterror, setContacterror] = useState("");

  const [emailVerified, setEmailVerified] = useState(false)
  const [contactVerified, setContactVerified] = useState(false)
  const [varifyContect, setvarifyContect] = useState(false);
  const [varifyemail, setvarifyemail] = useState(false);
  console.log("countryCode", countryCode);



  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isPasswordValid = (password) => {
    return password.length > 8;
  };
  const handleRegistration = () => {
    setContacterror("")
    setfirstNameError("")
    setlastNameError("")
    setemailError("")
    let isValid = true;



    if (!isEmailValid(email)) {
      setemailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isPasswordValid(contact)) {
      setContacterror("Please Enter Valid Phone Number .");
      isValid = false;
    }
    if (firstName === "") {
      setfirstNameError("Please Enter First Name.");
      isValid = false;
    }
    if (lastName === "") {
      setlastNameError("Please Enter Last Name.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };


  const submitSignUp = () => {
    const registrationResult = handleRegistration();
    if (registrationResult.success) {
      console.log("i am enter");
      if (emailVerified && contactVerified) {
        props.navigation.navigate('SignUp_2', { "data": { email, contact, firstName, lastName, countryCode, emailVerified, contactVerified } })
      }
      else {
        Toast.show({
          text1: 'please Varify Email and Mobile Number First !',
          type: 'error'
        })
      }

    }
  }


  const ContectVarify = async () => {

    let body = {
      method: apimethods.P,
      url: apiRoutes.contectOtpSend,
      data: {
        "contact": contact,
        "countryCode": countryCode
      }
    };
    try {
      const data = await apiMethod(body)
      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      });
      setvarifyContect(true);
    } catch (error) {
      // setLoading(false)
      Toast.show({
        text1: error?.response?.data?.message,
        type: 'error'
      });
      console.log('Error setting item in AsyncStorage:', error?.response?.data?.message);
    }
  }
  const emailvarifyFun = async () => {

    let body = {
      method: apimethods.P,
      url: apiRoutes.emailOtpSend,
      data: {
        "email": email,
      }
    };
    try {
      const data = await apiMethod(body)
      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      });
      setvarifyemail(true);
    } catch (error) {
      // setLoading(false)
      Toast.show({
        text1: error?.response?.data?.message,
        type: 'error'
      });
      console.log('Error setting item in AsyncStorage:', error?.response?.data?.message);
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

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
          <View
            // key={slide.key}
            style={{
              width: 35,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: color.secondry,
            }}
          />
          <View
            // key={slide.key}
            style={{
              width: 25,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: Color.onSecondary,
            }}
          />
          <View
            // key={slide.key}
            style={{
              width: 25,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: Color.onSecondary,
            }}
          />

        </View>

        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 40, fontWeight: '900', color: Color.primaryButt }}>Register</Text>

        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>First  Name</Text>
          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center' }}>

            <TextInput style={{ padding: 0, paddingHorizontal: 10, color: Color.primary }} placeholder="Enter your first name" placeholderTextColor={Color.primary}
              keyboardType='ascii-capable'
              onChangeText={(text) => { setfirstName(text), setfirstNameError("") }}
              value={firstName}
            />
          </View>
          {firstNameError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{firstNameError}</Text>}



          <View style={{ marginTop: 5 }} />
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Last Name</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center' }}>

            <TextInput style={{ padding: 0, paddingHorizontal: 10, color: Color.primary }} placeholder="Enter your last name" placeholderTextColor={Color.primary}
              keyboardType='ascii-capable'
              onChangeText={(text) => { setlastName(text), setlastNameError("") }}
              value={lastName}
            />
          </View>
          {lastNameError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{lastNameError}</Text>}

          <View style={{ marginTop: 5 }} />
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>E-mail</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center' }}>

            <TextInput style={{ padding: 0, paddingHorizontal: 10, color: Color.primary }} placeholder="Enter your email" placeholderTextColor={Color.primary}
              keyboardType='email-address'
              onChangeText={(text) => { setemail(text), setemailError(""), setEmailVerified(false) }}
              value={email}
            />
          </View>
          {emailError !== "" ? <Text style={{ color: 'red', marginHorizontal: 20 }}>{emailError}</Text>
            :
            <>
              {emailVerified ?
                <Text style={{ alignSelf: 'flex-end', marginHorizontal: 20, color: Color.fix, fontWeight: '700' }}>✅ Varified</Text>

                :
                <>
                  {email.length > 5 ?
                    <TouchableOpacity onPress={() => emailvarifyFun()}>
                      <Text style={{ alignSelf: 'flex-end', marginHorizontal: 20, color: Color.onSecondary, textDecorationLine: 'underline', fontWeight: '700' }}>Varify ?</Text>
                    </TouchableOpacity> : null
                  }
                </>


              }
            </>

          }

          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Mobile no.</Text>
          <View style={{ flexDirection: 'row', borderRadius: 10, padding: 0, height: 40, width: '90%', alignSelf: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '25%', justifyContent: 'center', borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE' }} onPress={() => setShow(true)} activeOpacity={0.5}>
              <Text style={{
                color: Color.primary,
                fontSize: 18
              }}>
                {countryCode}
              </Text>
            </TouchableOpacity>
            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setShow(false);
              }}
            />


            <TextInput
              placeholder=' Mobile Number'
              placeholderTextColor={Color.primary}
              keyboardType='number-pad'
              maxLength={10}
              onChangeText={(text) => { setContact(text), setContacterror(""), setContactVerified(false) }}
              value={contact}
              style={{ width: '70%', borderRadius: 7, marginLeft: 10, borderWidth: 0.5, paddingHorizontal: 10, backgroundColor: '#EEEEEE', color: Color.primary }} />


          </View>
          {contacterror !== "" ? <Text style={{ color: 'red', marginHorizontal: 20 }}>{contacterror}</Text>
            :
            <>
              {contactVerified ?
                <Text style={{ alignSelf: 'flex-end', marginHorizontal: 20, color: Color.fix, fontWeight: '700' }}>✅ Varified</Text>

                :
                <>
                  {contact.length > 8 ?
                    <TouchableOpacity onPress={() => ContectVarify()}>
                      <Text style={{ alignSelf: 'flex-end', marginHorizontal: 20, color: Color.onSecondary, textDecorationLine: 'underline', fontWeight: '700' }}>Varify ?</Text>
                    </TouchableOpacity> : null
                  }
                </>
              }</>
          }










          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 100, marginHorizontal: 20, borderRadius: 10, padding: 6, width: '50%', borderWidth: 1, borderColor: Color.primaryButt, justifyContent: 'center', backgroundColor: Color.primaryButt }} onPress={() => submitSignUp()}>

            <Text style={{ color: Color.tertiary, textAlign: 'center', fontSize: 20, fontWeight: '700' }}>Next</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ color: Color.onSecondary }}>Already have an Account? ?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ fontWeight: '700', color: Color.onSecondary, textDecorationLine: 'underline' }}> Login Here</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 1, backgroundColor: Color.onSecondary, width: '35%' }} />
            <Text style={{ width: '10%', textAlign: 'center', color: Color.onSecondary }}>OR</Text>
            <View style={{ height: 1, backgroundColor: Color.onSecondary, width: '35%' }} />
          </View>


          <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: '#FFF', padding: 6, width: '70%', borderWidth: 1, borderColor: Color.onSecondary, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
            <Image source={require('../../Images/rezeetImg/google.png')} style={{ height: 20, width: 20, resizeMode: 'contain', }} />
            <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 16, marginLeft: 10 }}>Login with Google</Text>
          </TouchableOpacity> */}


          <VarifyNumber visible={varifyContect} onClose={() => setvarifyContect(!varifyContect)} countryCode={countryCode} contect={contact} setContactVerified={setContactVerified} />

          <VarifyEmail visible={varifyemail} onClose={() => setvarifyemail(!varifyemail)} email={email} setEmailVerified={setEmailVerified} />

          {/* <VarifyOptions visible={varifyContect} onClose={() => setvarifyContect(!varifyContect)} props={props} Color={Color} value={"phone"} data={{ contact, countryCode }} />

          <VarifyOptions visible={varifyemail} onClose={() => setvarifyContect(!varifyemail)} props={props} Color={Color} value={"email"} data={email} /> */}

          {/* <VarifyNumber visible={varifyContect} onClose={setvarifyContect(!varifyContect)} props={props} /> */}

        </View>
      </View>


    </ScrollView >
  )
}

export default SignUp