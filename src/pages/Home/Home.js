import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import { color } from '../../constantComponent/color';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import Loader from '../../constantComponent/Loader';

const Home = props => {

  const Color = useSelector(state => state.Theme.Color)
  const [refersh, setrefersh] = useState(false)
  const [loading, setloading] = useState(false)

  const handleDatePress = (date) => {
    setSelectedDated(date);
  };
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const getMonthName = (monthNumber) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNumber];
  };
  const [selectedDated, setSelectedDated] = useState(new Date().getDate());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(getMonthName(new Date().getMonth()));

  const [recentScan, setrecentScan] = useState(null)


  const formatMonth = (month) => {
    const monthMap = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12'
    };
    return monthMap[month];
  };

  useEffect(() => {
    if (selectedDated && selectedYear && selectedMonth) {

      getByDate();
    }
  }, [selectedDated, selectedYear, selectedMonth])

  useEffect(() => {
    getFolderData()
  }, [])



  const getByDate = async () => {
    const formattedMonth = formatMonth(selectedMonth);
    const formattedDate = `${selectedDated}/${formattedMonth}/${selectedYear}`;
    let body = {
      method: apimethods.G,
      // url: `https://dev.rezeet.io/api/receipt/recent/get?date=${formattedDate}`
      url: `${apiRoutes.getRecentData}?date=${formattedDate}`
    };
    setloading(true)
    try {
      const data = await apiMethod(body)
      setloading(false)

      console.log("CArtItems@@@@@@@@@@@@@@@@", data?.registerData?.data);
      setrecentScan(data?.registerData?.data)
    } catch (error) {
      setloading(false)

      console.log('====================================')
      console.log("error", error)
      console.log('====================================')
    }
  }



  const getFolderData = async () => {
    let body = {
      method: apimethods.G,
      url: apiRoutes.getRecentData
    };
    setloading(true)
    try {
      const data = await apiMethod(body)
      setloading(false)

      console.log("CArtItems@@@@@@@@@@@@@@@@", data?.registerData?.data);
      setrecentScan(data?.registerData?.data)
    } catch (error) {
      setloading(false)

      console.log('====================================')
      console.log("error", error)
      console.log('====================================')
    }



  }

  const pullReferesh = () => {
    setrefersh(true)
    getFolderData()
    setTimeout(() => {
      setrefersh(false)
    }, 2000);
  }



  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.tertiary }}>

        <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.toggleDrawer()}>
            <Image style={{ alignSelf: 'center', height: 28, width: 28, marginRight: 10, tintColor: Color.onSecondary }} source={require('../../Images/more.png')} />
          </TouchableOpacity>
          <Image style={{ alignSelf: 'center', height: 50, width: 140, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/logo.png')} />

          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('Notifications')}>
            <Image style={{ alignSelf: 'center', height: 30, width: 30, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/bell.png')} />
          </TouchableOpacity>

        </View>

        <View style={{ flex: 1 }}
        >
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20, bottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary }}>Calendar</Text>

            <View style={{ elevation: 5, backgroundColor: Color.onError, borderRadius: 10, marginVertical: 10, padding: 10 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',

              }}>


                <Picker
                  selectedValue={selectedYear}

                  style={{ height: 50, width: 150, color: '#000', }}
                  onValueChange={(itemValue) => setSelectedYear(itemValue)}>

                  <Picker.Item label="2015" value={2015} />
                  <Picker.Item label="2016" value={2016} />
                  <Picker.Item label="2017" value={2017} />
                  <Picker.Item label="2018" value={2018} />
                  <Picker.Item label="2019" value={2019} />
                  <Picker.Item label="2020" value={2020} />
                  <Picker.Item label="2021" value={2021} />
                  <Picker.Item label="2022" value={2022} />
                  <Picker.Item label="2023" value={2023} />
                  <Picker.Item label="2024" value={2024} />

                </Picker>

                <Picker
                  selectedValue={selectedMonth}
                  style={{ height: 50, width: 150, color: '#000' }}

                  onValueChange={(itemValue) => setSelectedMonth(itemValue)}>
                  <Picker.Item label="January" value={"January"} />
                  <Picker.Item label="February" value={"February"} />
                  <Picker.Item label="March" value={"March"} />
                  <Picker.Item label="April" value={"April"} />
                  <Picker.Item label="May" value={"May"} />
                  <Picker.Item label="June" value={"June"} />
                  <Picker.Item label="July" value={"July"} />
                  <Picker.Item label="August" value={"August"} />
                  <Picker.Item label="September" value={"September"} />
                  <Picker.Item label="October" value={"October"} />
                  <Picker.Item label="November" value={"November"} />
                  <Picker.Item label="December" value={"December"} />
                </Picker>
              </View>
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignSelf: 'center' }}>
                  <Text style={{ color: '#000', fontWeight: '700', fontSize: 16 }}>{selectedMonth}{"\t\t"}{selectedYear}</Text>

                </View>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  height: 220
                  // paddingHorizontal: 10,
                  // paddingVertical: 10,
                }}>
                  {dates.map((date) => (
                    <TouchableOpacity
                      key={date}
                      onPress={() => handleDatePress(date)}
                      style={[
                        {
                          width: '15%',
                          aspectRatio: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 12,
                          marginVertical: 2,
                        },
                        selectedDated === date && {
                          backgroundColor: Color.fix,
                        },
                      ]}
                    >
                      <Text style={{ fontSize: 14, color: selectedDated === date ? '#FFF' : '#170B3B', fontWeight: '500' }}>{date}</Text>
                    </TouchableOpacity>
                  ))

                  }
                </View>
              </View>



            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.onSecondary, marginTop: 10 }}>Recent Scan</Text>
            <ScrollView showsVerticalScrollIndicator=
              {false} style={{}} refreshControl={
                <RefreshControl refreshing={refersh} onRefresh={pullReferesh} />
              } >

              {recentScan?.length > 0 ?
                recentScan?.map((ele, index) => (

                  <View key={`recent${index}`} style={{ height: 90, borderRadius: 10, elevation: 7, backgroundColor: Color.onPrimary, flexDirection: 'row', marginTop: 10, marginHorizontal: 5 }}>
                    <View style={{ width: '50%', padding: 10 }}>
                      <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../../Images/rezeetImg/brand1A.png')} style={{ height: 40, width: 40 }} />
                        <View style={{ marginLeft: 8, width: '90%' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: Color.onSecondary, lineHeight: 20 }}>{ele?.storeInfo?.name}</Text>
                          <Text style={{ fontSize: 12, fontWeight: '400', color: Color.onSecondary }} numberOfLines={1}>{ele?.storeInfo?.category}</Text>
                        </View>
                      </View>
                      <Text style={{ color: Color.onSecondary, margin: 10, fontWeight: 'bold', fontSize: 16 }}>{moment(ele?.createdAt).format('MM/DD/YYYY')}</Text>
                    </View>

                    <View style={{ width: '50%', padding: 10, alignItems: 'flex-end' }}>
                      <Text style={{ lineHeight: 30, fontSize: 14, fontWeight: 'bold', color: Color.onSecondary, marginTop: 5 }} numberOfLines={1}>{ele?.category}</Text>
                      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 35, backgroundColor: Color.onPrimaryContainer, width: '80%', borderRadius: 8, }} onPress={() => props.navigation.navigate('ViewPdf', { "pdf_Url": ele })}>
                        <Text style={{ color: Color.onPrimary, fontWeight: "bold", fontSize: 14 }}>View Receipt</Text>
                      </TouchableOpacity>

                    </View>


                  </View>
                ))
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                  <Text style={{ fontWeight: '700', fontSize: 22, color: Color.onSecondary }}>No Data Found !</Text>
                </View>
              }
              <View style={{ marginBottom: 10 }} />
            </ScrollView>

            <Loader isLoading={loading} />


          </View>


        </View>

      </View>
    </SafeAreaView>
  )
}


export default Home;


