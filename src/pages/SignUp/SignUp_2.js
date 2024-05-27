import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal, StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { color } from '../../constantComponent/color';
// import { CountryPicker } from "react-native-country-codes-picker";
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VarifyOtp from '../../constantComponent/VarifyOtp';
import VarifyOptions from '../../constantComponent/VarifyOptions';
import { useSelector } from 'react-redux';
import AddressSection from '../../constantComponent/AddressSection';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import StatusBarApp from '../../constantComponent/StatusBar';
import Term_Condition from '../../constantComponent/Term_Condition';

const SignUp_2 = (props) => {

  const Color = useSelector(state => state.Theme.Color)

  console.log("previus data ", props?.route?.params?.data);
  const dataPreviurs = props?.route?.params?.data;
  const [loading, setLoading] = useState(false);
  const [hide, sethide] = useState(true);
  const [varify, setvarify] = useState(false);
  const [addressModel, setaddressModel] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [doberror, setDoberror] = useState('');
  const [address, setaddress] = useState("")
  const [addresserror, setaddresserror] = useState("")
  const [companyName, setcompanyName] = useState("")
  const [companyNameerror, setcompanyNameerror] = useState("")
  const [password, setPassword] = useState("")
  const [passworderror, setPassworderror] = useState("")

  const [termcondi, settermcondi] = useState(false);
  const [term, setTerm] = useState(false);

  console.log("addressaddressaddress", address);
  const handleDateChange = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);
    const formattedDate = moment(selectedDate).format('MM/DD/YYYY');
    setFormattedDate(formattedDate);
  };


  const isPasswordValid = (password) => {
    return password.length >= 6;
  };



  const handleRegistration = () => {
    setPassworderror("")
    setDoberror("")
    setaddresserror("")
    let isValid = true;





    if (!isPasswordValid(password)) {
      setPassworderror("Password must be at least 6 characters long.");
      isValid = false;
    }
    if (formattedDate === '') {
      setDoberror("Please Select Date Of Birth.");
      isValid = false;
    }
    if (address === "") {
      setaddresserror("Please Enter Address.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };


  const SubmitRegisterFinal = async () => {
    const registrationResult = handleRegistration();
    if (registrationResult.success) {
      if (term) {


        console.log("i am in final submit ", dataPreviurs, address, formattedDate, companyName, password);
        setLoading(true)
        let body = {
          method: apimethods.P,
          url: apiRoutes.register,
          data: {
            "firstName": dataPreviurs?.firstName,
            "lastName": dataPreviurs?.lastName,
            "email": dataPreviurs?.email,
            "contact": dataPreviurs?.contact,
            "countryCode": dataPreviurs?.countryCode,
            "dob": formattedDate,
            "country": address?.country,
            "password": password,
            "title": "Home",
            "state": address?.state,
            "roleId": 2,
            "homeNo": address?.homeNo,
            "street1": address?.street1,
            "street2": address?.street2,
            "city": address?.city,
            "postalCode": address?.postalCode,
            "emailVerified": dataPreviurs?.emailVerified,
            "contactVerified": dataPreviurs?.contactVerified
          }
        };
        try {
          const data = await apiMethod(body)
          setLoading(false)

          Toast.show({
            text1: data?.registerData?.message,
            type: 'success'
          });
          props.navigation.navigate('Loading')
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Loading' }]
          });

        } catch (error) {
          setLoading(false)

          Toast.show({
            text1: error?.response?.data?.message,
            type: 'error'
          });
          console.log('error', error?.response?.data);

        }


      } else {
        Toast.show({
          text1: 'Please Allow Term And Condition and Privacy Policy To Continue..',
          type: 'info'
        })
      }


    }

  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.onPrimary, }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> */}
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

        </View>

        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 40, fontWeight: '900', color: Color.primaryButt }}>Register</Text>
        {/* <Text style={{ fontSize: 15, textAlign: 'center', color: '#000266' }}>Login to continue</Text> */}
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Address</Text>
          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', flexDirection: 'row' }}>

            {address === "" ? <Text style={{ width: '85%', alignSelf: 'center', paddingHorizontal: 10, color: '#000' }} numberOfLines={1}>Enter address</Text>
              : <Text style={{ width: '85%', alignSelf: 'center', paddingHorizontal: 10, color: Color.primary }} numberOfLines={1}>{address?.homeNo},{address?.street1},{address?.street2},{address?.city},{address?.state},{address?.country},{address?.postalCode}</Text>}
            {/* <TextInput style={{ padding: 0, paddingHorizontal: 10, width: '85%' }} placeholder="Add Address" placeholderTextColor={Color.primary}
              keyboardType='email-address'
            // onChangeText={(text) => setemail(text)}
            // value={email}
            /> */}
            <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { setaddressModel(!addressModel), setaddresserror("") }}
            >
              <Image source={require('../../Images/rezeetImg/plus.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>

          </View>
          {addresserror !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{addresserror}</Text>}



          <View style={{ marginTop: 5 }} />


          <View style={{ marginTop: 5 }}>
            <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Birthday</Text>
            <TouchableOpacity style={{ borderWidth: 0.5, width: '90%', borderRadius: 7, alignSelf: 'center', height: 40, paddingHorizontal: 10, justifyContent: 'center', backgroundColor: '#EEEEEE' }} onPress={() => { setOpen(true), setDoberror("") }} activeOpacity={0.6} >
              <Text style={{ color: Color.primary }}>{formattedDate === "" ? "MM/DD/YYYY" : formattedDate}</Text>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={(selectedDate) => handleDateChange(selectedDate)}
              onCancel={() => setOpen(false)}
            />

          </View>
          {doberror !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{doberror}</Text>}
          <View style={{ marginTop: 5 }} />
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Company + Title ( optional)</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center' }}>

            <TextInput style={{ padding: 0, paddingHorizontal: 10, color: Color.primary }} placeholder="Current company" placeholderTextColor={Color.primary}
              keyboardType='ascii-capable'
              onChangeText={(text) => setcompanyName(text)}
              value={companyName}
            />
          </View>
          <View style={{ marginTop: 5 }} />
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Password</Text>

          <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TextInput style={{ padding: 0, width: '80%', color: Color.primary }} placeholder="Enter your password" placeholderTextColor={Color.primary} secureTextEntry={hide}
              onChangeText={(text) => { setPassword(text), setPassworderror("") }}
              value={password} />
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => sethide(!hide)} disabled={true}>
              <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={hide ?
                require('../../Images/rezeetImg/hide.png') :
                require('../../Images/rezeetImg/show.png')
              } /></TouchableOpacity>
          </View>
          {passworderror !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{passworderror}</Text>}










          {/* <TouchableOpacity style={{ marginTop: 20, marginHorizontal: 20, borderRadius: 7, padding: 6, width: '40%', borderWidth: 1, borderColor: Color.onSecondary, justifyContent: 'center' }} onPress={() => setvarify(!varify)}>

            <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 14, fontWeight: '400' }}>Verify Identity</Text>
          </TouchableOpacity> */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20 }}>
            <View style={{ width: '10%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center', height: 25, borderColor: Color.onSecondary, color: Color.primary }} onPress={() => setTerm(!term)} >
                {term ?
                  <Image source={require('../../Images/rezeetImg/ok1.png')} style={{ height: 23, width: '100%', tintColor: Color.onSecondary }} />
                  : null}
              </TouchableOpacity>
            </View>
            <View style={{ width: '88%', }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, color: Color.onSecondary, fontWeight: '700' }}>Please confirm that you agree to our</Text>

              </View>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => settermcondi(!termcondi)}>
                  <Text style={{ color: color.secondry, fontSize: 13, textDecorationLine: 'underline', fontWeight: '700' }}>Terms and conditions</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 13, color: Color.onSecondary, fontWeight: '700' }}>  and  </Text>
                <TouchableOpacity onPress={() => settermcondi(!termcondi)}>
                  <Text style={{ color: color.secondry, fontSize: 13, textDecorationLine: 'underline', fontWeight: '700' }}>privacy statement.</Text>
                </TouchableOpacity>



              </View>
            </View>

          </View>

          {/* <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, marginHorizontal: 20, borderRadius: 10, backgroundColor: '#FFF', padding: 8, width: '70%', borderWidth: 1, borderColor: '#000', justifyContent: 'center' }} onPress={() => props.navigation.navigate('Loading')}>

            <Text style={{ color: '#000', textAlign: 'center', fontSize: 20, fontWeight: '700' }}>Create Account</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, marginHorizontal: 20, borderRadius: 10, padding: 6, width: '60%', borderWidth: 1, borderColor: Color.primaryButt, justifyContent: 'center', backgroundColor: Color.primaryButt }} onPress={() => SubmitRegisterFinal()}>
            {loading ?
              <ActivityIndicator size="large" color={Color.tertiary} />
              :

              <Text style={{ color: Color.tertiary, textAlign: 'center', fontSize: 20, fontWeight: '700' }}>Create Account</Text>
            }

          </TouchableOpacity>

          {/* <VarifyOtp visible={hide} onClose={() => sethide(!hide)} props={props} /> */}
          {/* <VarifyOptions visible={varify} onClose={() => setvarify(!varify)} props={props} Color={Color} /> */}

          <AddressSection addmodel={addressModel} closeModel={() => setaddressModel(!addressModel)} props={props} setaddress={setaddress} />
          <Term_Condition addmodel={termcondi} closeModel={() => settermcondi(!termcondi)} props={props} />





        </View>
      </View>


    </ScrollView >
  )
}

export default SignUp_2