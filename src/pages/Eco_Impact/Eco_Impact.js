import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { color } from '../../constantComponent/color';
import { useSelector } from 'react-redux';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import CO2Calculator from '../../constantComponent/CO2Calculator';
import Loader from '../../constantComponent/Loader';
const Eco_Impact = props => {


  const Color = useSelector(state => state.Theme.Color)

  const [date, setdata] = useState(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {

    getProfile()


  }, [])

  const getProfile = async () => {
    let body = {
      method: apimethods.G,
      url: apiRoutes.profiledata,
    }; setloading(true)
    try {
      const data = await apiMethod(body)
      console.log("data?.registerData?.message", data?.registerData?.data);
      setdata(data?.registerData?.data)
      setloading(false)


    } catch (error) {
      console.log('error', error); setloading(false)


    }
  }

  console.log("date@@@@@@@@@@", date?.scanCount);


  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.onPrimary }}>
        {/* <StatusBar barStyle="default" /> */}
        <ImageBackground source={require('../../Images/rezeetImg/notifibackImg.png')} style={{ height: 300, width: '100%', paddingTop: 10 }}  >
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: '#FFF', elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 40, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Eco Impact</Text>
          </View>
          <ImageBackground style={{ height: 200, width: '100%', marginTop: 50, }} source={require('../../Images/rezeetImg/treeEco.png')}>
            <View style={{ marginHorizontal: 15, width: '60%', marginTop: -15 }}>
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>Eco Impact From Per Scan</Text>
              <Text style={{ color: '#FFF', fontWeight: '700' }}>1.2 kg CO2e</Text>
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16, marginTop: 5, }}>Total Impact Now</Text>
              <CO2Calculator totalScans={date?.scanCount} />
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16, marginTop: 5, }}>Target Eco Impact </Text>
              <Text style={{ color: '#FFF', fontWeight: '700' }}>1.5 tons CO2e</Text>
            </View>
          </ImageBackground>

        </ImageBackground>


        <ScrollView style={{}}>
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20, }}>
            <Text style={{ color: Color.onSecondary, fontWeight: 'bold', fontSize: 22, }}>Reduce your carbon footprint</Text>
            <ScrollView style={{}} horizontal={true}>
              <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, width: 180, marginTop: 10, marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', height: 35, width: 35, borderRadius: 40, backgroundColor: '#170B3B' }}>
                    <Image style={{ height: 25, width: 25, }} source={require('../../Images/rezeetImg/eco_Impact.png')} />
                  </View>
                  <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 10, color: '#000' }}>Reduce, reuse, and recycle</Text>
                </View>
                <Text style={{ marginTop: 5, color: '#000', fontSize: 14 }}>Practice the 3Rs as much as possible to reduce the amount of waste</Text>
              </View>
              <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, width: 210, marginTop: 10, marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', height: 35, width: 35, borderRadius: 40, backgroundColor: '#170B3B' }}>
                    <Image style={{ height: 25, width: 25, }} source={require('../../Images/rezeetImg/bela.png')} />
                  </View>
                  <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 10, color: '#000' }}>Cut down on meat consumption</Text>
                </View>
                <Text style={{ marginTop: 5, color: '#000', fontSize: 14 }}>Farming is a significant contributor to greenhouse gas emissions</Text>
              </View>




            </ScrollView>
            <View style={{ borderRadius: 10, backgroundColor: '#7CCB83', height: 120, marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                <Image style={{ height: 120, width: '40%', resizeMode: 'contain' }} source={require('../../Images/rezeetImg/glass.png')} />
                <View style={{ justifyContent: 'center', width: '60%' }}>
                  <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 22, }}>Be the change</Text>
                  <Text style={{ color: '#FFF', fontWeight: '700', marginTop: 5 }}>Showcase your friend your score and be on the top of leaderboard.</Text>
                </View>
              </View>

            </View>


          </View>


        </ScrollView>
        <Loader isLoading={loading} />
      </View>
    </SafeAreaView>
  )
}


export default Eco_Impact


