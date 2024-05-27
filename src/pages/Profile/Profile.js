import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState, version } from 'react'
import ProfileEdit from '../../constantComponent/ProfileEdit';
import Language from '../../constantComponent/Language';
import VarifyOtp from '../../constantComponent/VarifyOtp';
import Term_Condition from '../../constantComponent/Term_Condition';
import { useSelector } from 'react-redux';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import { useTranslation } from 'react-i18next';


const { height, width } = Dimensions.get('screen');

const Profile = (props) => {
  const { i18n, t } = useTranslation();

  const [visible, setvisible] = useState(false);
  const Color = useSelector(state => state.Theme.Color)


  const [language, setLanguage] = useState(false);
  const [data, setdata] = useState([]);
  const [term, setTerm] = useState(false);



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


    } catch (error) {
      console.log('error', error);

    }
  }



  const changeLanguage = async (value) => {
    if (value === "Hindi") {
      await i18n.changeLanguage('hi')
      // props.navigation.navigate('Home')
      // props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }]
      // });
    }
    if (value === "English") {
      await i18n.changeLanguage('en')
      // props.navigation.navigate('Home')
      // props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }]
      // });
    }

  }

  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.onPrimary }}>
        <View style={{ paddingTop: 10, backgroundColor: Color.primary, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingBottom: 10 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} >
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: '#FFF', elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 30, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Profile</Text>
          </View>

          <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setvisible(!visible)} style={{ borderWidth: 2, borderRadius: 100, borderColor: '#FFF' }}>

              <Image source={data?.image ? { uri: data?.image } : require('../../Images/rezeetImg/Profile2.png')} style={{ height: 100, width: 100, borderRadius: 100 }} />
            </TouchableOpacity>

            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFF', marginTop: 5 }}>{data?.firstName} {data?.lastName}</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF', }}>{data?.address?.state},{data?.address?.city},{data?.address?.country}</Text>
            <TouchableOpacity style={{ height: 30, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderColor: '#FFF' }} onPress={() => props.navigation.navigate('EditAddress')}>
              <Text style={{ fontSize: 12, color: '#FFF' }}>Edit Profile</Text>
            </TouchableOpacity>

          </View>
        </View>

        <ScrollView style={{ marginHorizontal: 10, marginTop: 20, bottom: 10 }} showsVerticalScrollIndicator={false}>

          {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderRadius: 10, backgroundColor: Color.onPrimary, elevation: 1, marginTop: 20, marginHorizontal: 10, borderColor: Color.onSecondary }} activeOpacity={0.5} onPress={() => props.navigation.navigate('Address')}>
            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 7, borderRightWidth: 0.5, borderColor: Color.onSecondary }}>
              <Image source={require('../../Images/rezeetImg/location.png')} style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: Color.onSecondary }} />
            </View>
            <View style={{ width: '75%', justifyContent: 'center', paddingVertical: 7 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Your Address</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderRadius: 10, backgroundColor: Color.onPrimary, elevation: 1, marginTop: 20, marginHorizontal: 10, borderColor: Color.onSecondary }} activeOpacity={0.5}
            onPress={() => props.navigation.navigate('Notifications')} >
            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 7, borderRightWidth: 0.5, borderColor: Color.onSecondary }}>
              <Image source={require('../../Images/rezeetImg/bell.png')} style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: Color.onSecondary }} />
            </View>
            <View style={{ width: '75%', justifyContent: 'center', paddingVertical: 7 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Notifications</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderRadius: 10, backgroundColor: Color.onPrimary, elevation: 1, marginTop: 20, marginHorizontal: 10, borderColor: Color.onSecondary }} activeOpacity={0.5} onPress={() => setTerm(!term)}>
            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 7, borderRightWidth: 0.5, justifyContent: 'center', borderColor: Color.onSecondary }}>
              <Image source={require('../../Images/rezeetImg/term.png')} style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: Color.onSecondary }} />
            </View>
            <View style={{ width: '75%', justifyContent: 'center', paddingVertical: 7 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Terms & Conditions,Privacy Policy</Text>
            </View>
          </TouchableOpacity>


          {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderRadius: 10, backgroundColor: Color.onPrimary, elevation: 1, marginTop: 20, marginHorizontal: 10, borderColor: Color.onSecondary }} activeOpacity={0.5} onPress={() =>
            setLanguage(true)
            // changeLanguage("Hindi")
          }>
            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 7, borderRightWidth: 0.5, justifyContent: 'center', borderColor: Color.onSecondary }}>
              <Image source={require('../../Images/rezeetImg/language.png')} style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: Color.onSecondary }} />
            </View>
            <View style={{ width: '75%', justifyContent: 'center', paddingVertical: 7 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Language</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderRadius: 10, backgroundColor: Color.onPrimary, elevation: 1, marginTop: 20, marginHorizontal: 10, borderColor: Color.onSecondary }} activeOpacity={0.5} onPress={() => props.navigation.navigate('Welcome')}>
            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 7, borderRightWidth: 0.5, justifyContent: 'center', borderColor: Color.onSecondary }}>
              <Image source={require('../../Images/rezeetImg/logout.png')} style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: Color.onSecondary }} />
            </View>
            <View style={{ width: '75%', justifyContent: 'center', paddingVertical: 7 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Logout</Text>
            </View>
          </TouchableOpacity>
          <ProfileEdit addmodel={visible} closeModel={() => setvisible(!visible)} props={props} callApi={() => getProfile()} />
          <Language addmodel={language} closeModel={() => setLanguage(!language)} props={props} />
          <Term_Condition addmodel={term} closeModel={() => setTerm(!term)} props={props} />

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Profile