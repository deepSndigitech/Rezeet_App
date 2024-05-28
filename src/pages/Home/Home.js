import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, SafeAreaView, RefreshControl, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'

import { color } from '../../constantComponent/color';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import Loader from '../../constantComponent/Loader';
import { Dropdown } from 'react-native-element-dropdown';

const Home = props => {

  const Color = useSelector(state => state.Theme.Color)
  const [refersh, setrefersh] = useState(false)
  const [loading, setloading] = useState(false)
  const [gender, setGender] = useState('')

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


  const Month = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },


  ];
  const Year = [
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },


  ];

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

                <Dropdown
                  style={{
                    height: 40,
                    width: '40%',
                    marginVertical: 0,
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                    // borderWidth: 1,
                    // borderRadius: 5,
                    borderColor: '#000'
                  }}
                  placeholderStyle={{
                    fontSize: 14,
                    // fontFamily: fontFamily.Montserrat_Medium,
                    color: 'gray'
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                    color: '#000',
                    // fontFamily: fontFamily.Montserrat_Medium
                  }}
                  inputSearchStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    color: '#000',
                    borderColor: 'lightgray',
                    fontSize: 12
                  }}
                  iconStyle={{
                    width: 25,
                    height: 25,
                    tintColor: '#000'

                  }}
                  data={Month}
                  itemTextStyle={{ color: '#000' }}
                  maxHeight={400}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  searchPlaceholder="Search..."
                  value={selectedMonth}
                  onChange={item => { setSelectedMonth(item.value) }}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <Dropdown
                  style={{
                    height: 40,
                    width: '40%',
                    marginVertical: 0,
                    paddingHorizontal: 15,
                    backgroundColor: 'transparent',
                    // borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#000'
                  }}
                  placeholderStyle={{
                    fontSize: 14,
                    // fontFamily: fontFamily.Montserrat_Medium,
                    color: 'gray'
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                    color: '#000',
                    // fontFamily: fontFamily.Montserrat_Medium
                  }}
                  inputSearchStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    color: '#000',
                    borderColor: 'lightgray',
                    fontSize: 12
                  }}
                  iconStyle={{
                    width: 25,
                    height: 25,
                    tintColor: '#000'

                  }}
                  data={Year}
                  itemTextStyle={{ color: '#000' }}
                  maxHeight={400}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  searchPlaceholder="Search..."
                  value={selectedYear}
                  // onChange={item => { setGender(item.value) }}
                  onChange={item => { setSelectedYear(item.value) }}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />


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


