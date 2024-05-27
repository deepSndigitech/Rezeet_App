import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../constantComponent/color';
// import AddressList from '../../constantComponent/AddressList';
// import CountryPicker from 'react-native-country-picker-modal';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { CountryPicker } from "react-native-country-codes-picker";
import { useSelector } from 'react-redux';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import Toast from 'react-native-toast-message';
import AddressSection from '../../constantComponent/AddressSection';
import EditAddressPro from '../../constantComponent/EditAddressPro';

const { height, width } = Dimensions.get('screen');

const EditAddress = (props) => {


  const Color = useSelector(state => state.Theme.Color)
  const [data, setdata] = useState([]);
  const [addressModel, setaddressModel] = useState(false);

  const [profile, setProfile] = useState([
    {
      dob: '',
      firstName: '',
      lastName: '',
      title: '',
      address: '',
      countryCode: '',
      contact: ''
    },
  ])

  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');


  const handleDateChange = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);
    let updatedItems = { ...profile }
    updatedItems["dob"] = selectedDate;
    setProfile(updatedItems)
  };




  useEffect(() => {

    getProfile()


  }, [])

  const getProfile = async () => {
    let body = {
      method: apimethods.G,
      url: apiRoutes.profiledata,
    };
    try {
      const data = await apiMethod(body)
      console.log("data?.registerData?.message", data?.registerData?.data);
      console.log("data?.registerData?.message",);
      setdata(data?.registerData?.data)
      const {
        dob,
        firstName,
        lastName,
        title,
        address,
        contact,
        countryCode
      } = data?.registerData?.data;
      setProfile({
        dob,
        firstName,
        lastName,
        title,
        address,
        contact,
        countryCode
      });





    } catch (error) {
      console.log('error', error);

    }
  }


  const handleInputChange = (field, value) => {
    let updatedItems = { ...profile }
    updatedItems[field] = value;
    setProfile(updatedItems)
  }



  const UpdateProfile = async () => {
    setloading(true)
    let body = {
      method: apimethods.P,
      url: apiRoutes.profileUpdate,
      data: profile
    };
    try {

      const data = await apiMethod(body)
      setloading(false)
      getProfile()

      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      })

    } catch (error) {
      setloading(false)
      console.log('error', error);

    }
  }

  console.log('====================================')
  console.log("profilr", profile)
  console.log('====================================')



  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.onPrimary }}>
        {/* <StatusBar barStyle="default" /> */}
        <View style={{ paddingTop: 10, backgroundColor: Color.primary, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingBottom: 50 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: '#FFF', elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 30, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Edit Address </Text>
          </View>


        </View>

        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>First Name</Text>
              <View style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 7, backgroundColor: '#FFF', alignSelf: 'center', justifyContent: 'center' }}>

                <TextInput style={{ padding: 0, paddingHorizontal: 10, color: 'grey' }} placeholder="Tony" placeholderTextColor="#000"
                  keyboardType='ascii-capable'
                  editable={false}
                  onChangeText={(text) => handleInputChange('firstName', text)}
                  // onChangeText={(text) => setemail(text)}
                  value={profile?.firstName}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Last Name</Text>
              <View style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 7, backgroundColor: '#FFF', alignSelf: 'center', justifyContent: 'center' }}>

                <TextInput style={{ padding: 0, paddingHorizontal: 10, color: 'grey' }} placeholder="Stark" placeholderTextColor="#000"
                  keyboardType='ascii-capable'
                  editable={false}
                  onChangeText={(text) => handleInputChange('lastName', text)}
                  // onChangeText={(text) => setemail(text)}
                  value={profile?.lastName}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>E-mail</Text>
              <View style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 7, backgroundColor: '#FFF', alignSelf: 'center', justifyContent: 'center' }}>

                <TextInput style={{ padding: 0, paddingHorizontal: 10, color: 'grey' }} placeholder="Enter your email" placeholderTextColor="#000"
                  keyboardType='email-address'
                  editable={false}
                  value={data?.email}
                // onChangeText={(text) => setemail(text)}
                // value={email}
                />
              </View>
            </View>
            {/* birthday */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Birthday</Text>
              <TouchableOpacity style={{ borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', height: 40, paddingHorizontal: 10, justifyContent: 'center', backgroundColor: '#FFF' }} onPress={() => setOpen(true)} activeOpacity={0.6} disabled={true} >
                <Text style={{ color: 'lightgrey' }}>{profile?.dob === "" ? "MM/DD/YYYY" : moment(profile?.dob).format('MM/DD/YYYY')}</Text>
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
            {/* Mobile */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Mobile no.</Text>
              <View style={{ flexDirection: 'row', borderRadius: 10, padding: 0, height: 40, width: '90%', alignSelf: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'center', borderWidth: 1, borderRadius: 10, backgroundColor: '#FFF' }} activeOpacity={0.5}

                >
                  <Text style={{
                    color: 'grey',
                    fontSize: 18
                  }}>
                    {profile?.countryCode}
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
                  placeholderTextColor="#000"
                  keyboardType='number-pad'
                  maxLength={10}
                  // editable={false}
                  onChangeText={(text) => handleInputChange('contact', text)}
                  value={profile?.contact}
                  style={{ width: '65%', borderRadius: 10, marginLeft: 10, borderWidth: 1, paddingHorizontal: 10, backgroundColor: '#FFF', color: '#000' }} />


              </View>


            </View>


            {/* Address */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Address</Text>
              <View style={{ width: '90%', height: 40, borderWidth: 0.5, borderRadius: 7, alignSelf: 'center', flexDirection: 'row', backgroundColor: '#FFF' }}>

                {profile?.address === "" ?
                  <Text style={{ width: '85%', alignSelf: 'center', paddingHorizontal: 10, color: '#000' }} numberOfLines={1}>Enter address</Text>
                  :
                  <Text style={{ width: '85%', alignSelf: 'center', paddingHorizontal: 10, color: '#000' }} numberOfLines={1}>{profile?.address?.homeNo},{profile?.address?.street1},{profile?.address?.street2},{profile?.address?.state},{profile?.address?.city},{profile?.address?.country},{profile?.address?.postalCode}</Text>
                }

                <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => setaddressModel(!addressModel)}
                >
                  <Image source={require('../../Images/rezeetImg/plus.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

              </View>

            </View>


            {/* <View style={{ marginTop: 10 }}>
              <Text style={{ marginVertical: 5, marginHorizontal: 10, color: Color.onSecondary, fontSize: 14 }}>Company + Title ( optional)</Text>
              <View style={{ width: '90%', height: 40, borderWidth: 1, borderRadius: 7, backgroundColor: '#FFF', alignSelf: 'center', justifyContent: 'center' }}>

                <TextInput style={{ padding: 0, paddingHorizontal: 10 }} placeholder="Enter your email" placeholderTextColor="#000"
                  keyboardType='ascii-capable'
                  onChangeText={(text) => handleInputChange('title', text)}
                  value={profile?.title}
                />
              </View>
            </View> */}

            <TouchableOpacity style={{ height: 45, width: '70%', borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60, alignSelf: 'center', borderColor: Color.primaryButt, backgroundColor: Color.primaryButt }} onPress={() => UpdateProfile()}>
              {loading ?
                <ActivityIndicator size="large" color={Color.onPrimary} />
                :

                <Text style={{ fontSize: 20, color: Color.onPrimary, fontWeight: 'bold' }}>Save</Text>
              }
            </TouchableOpacity>



          </View>

          <EditAddressPro addmodel={addressModel} closeModel={() => setaddressModel(!addressModel)} props={props} addressa={profile?.address} setProfile={setProfile} />


        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EditAddress