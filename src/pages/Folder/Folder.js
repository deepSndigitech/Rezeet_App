import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ImageBackground, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { color } from '../../constantComponent/color';
import BusinessFolder from '../../constantComponent/BusinessFolder';
import PersonalFolder from '../../constantComponent/PersonalFolder';
import { useSelector } from 'react-redux';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import LoadingComponent from '../../constantComponent/LoadingComponent';
import Loader from '../../constantComponent/Loader';
const { height, width } = Dimensions.get('window');

const Folder = props => {
  const Color = useSelector(state => state.Theme.Color)

  const [businessFolder, setbusinessFolder] = useState(null)
  const [personlaFolder, setpersonlaFolder] = useState(null)
  const [loading, setloading] = useState(false)
  const [dateFilter, setdateFilter] = useState("")
  const [ShortByDatefilter, setShortByDatefilter] = useState("")

  const [folder, setfolder] = useState(["Personal Folder", "Business Folder"])
  const [folderActive, setfolderActive] = useState((props?.route?.params?.type ?
    props?.route?.params?.type
    : "Personal Folder"))


  useEffect(() => {
    getFolderData()
  }, [])


  console.log("dateFilterdateFilterdateFilter", dateFilter);
  console.log("dateFilterdateFilterdateFilter", ShortByDatefilter);

  const clearComponent = () => {
    setShortByDatefilter("")
    setdateFilter("")
    getFolderData()
  }
  useEffect(() => {
    getDataFilterValue()
    console.log("fcgfcgcgfc");
  }, [dateFilter, ShortByDatefilter])

  const getDataFilterValue = async () => {
    let body = {
      method: apimethods.G,
      url: `${apiRoutes.getAllRecipt}?${dateFilter ? `date=${dateFilter}&` : ''}${ShortByDatefilter ? `sorting=${ShortByDatefilter === 'Short by date (Newest First)' ? true : false}` : ''}`
    };
    setloading(true)
    try {
      const data = await apiMethod(body)
      setpersonlaFolder(data?.registerData?.data?.personalFolder)
      setloading(false)

      setbusinessFolder(data?.registerData?.data?.businessFolder)
    } catch (error) {
      console.log('====================================')
      setloading(false)

      console.log("error", error)
      console.log('====================================')
    }

  }

  const getFolderData = async () => {
    let body = {
      method: apimethods.G,
      url: apiRoutes.getAllRecipt
    };
    setloading(true)
    try {
      const data = await apiMethod(body)
      setloading(false)

      console.log("CArtItems@@@@@@@@@@@@@@@@", data?.registerData?.data);
      setpersonlaFolder(data?.registerData?.data?.personalFolder)
      setbusinessFolder(data?.registerData?.data?.businessFolder)
    } catch (error) {
      setloading(false)

      console.log('====================================')
      console.log("error", error)
      console.log('====================================')
    }



  }

  const moveFolderDate = async (id) => {
    setloading(true)
    console.log("ididididididid", id);
    let body = {

      method: apimethods.P,
      url: apiRoutes.changeCategory,
      data: {
        "receiptId": id
      }
    };
    try {
      const data = await apiMethod(body)
      console.log("CArtItems@@@@@@@@@@@@@@@@", data?.registerData);
      getFolderData()
      setloading(false)

    } catch (error) {
      console.log('====================================')
      console.log("error", error)
      setloading(false)

      console.log('====================================')
    }



  }







  return (
    <SafeAreaView>
      <View style={{ height: height, backgroundColor: Color.tertiary }}>

        <ImageBackground source={require('../../Images/rezeetImg/folderBackImg2.png')} style={{ height: 110, width: '100%', }} resizeMode='stretch'  >
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: '#FFF', elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 40, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Folder</Text>
          </View>

        </ImageBackground>

        <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: -30 }}>
          {folder?.map((ek, ind) => (
            <TouchableOpacity key={ind}
              style={{
                flexDirection: 'row', paddingVertical: 12,
                backgroundColor: ek === folderActive ? '#FFF' : 'rgba(23, 11, 59, 0.7)',
                width: '48%', justifyContent: 'center',
                alignItems: 'center',
                borderWidth: ek === folderActive ? 0 : 1,
                borderTopWidth: ek === folderActive ? 1 : 0,
                borderLeftWidth: ek === folderActive ? 1 : 0,
                borderRightWidth: ek === folderActive ? 1 : 0,
                borderColor: ek === folderActive ? '#000' : color.secondry
              }}
              activeOpacity={0.5} onPress={() => setfolderActive(ek)}
            >
              <Image style={{
                height: 25, width: 25, resizeMode: 'contain', marginRight: 10,
                tintColor: ek === folderActive ? '#000' : '#FFF'
              }}
                source={
                  ind === 0 ? require('../../Images/rezeetImg/pers_folder.png') :
                    require('../../Images/rezeetImg/bus_Folders.png')
                }

              />
              <Text style={{ fontSize: 12, fontWeight: '700', color: ek === folderActive ? '#000' : '#FFF' }}>{ek}</Text>
            </TouchableOpacity>
          ))}


        </View>

        <View style={{ flex: 1, marginHorizontal: 15, marginBottom: 25, paddingTop: 10, backgroundColor: Color.tertiary, borderRightWidth: folderActive === "Business Folder" ? 1 : 0, borderLeftWidth: folderActive === "Personal Folder" ? 1 : 0, borderColor: Color.onSecondary }}>
          {folderActive === "Business Folder" ?
            <BusinessFolder colorCode={Color} data={businessFolder} props={props} moveFolderDate={(id) => moveFolderDate(id)} setdateFilter={setdateFilter} setShortByDatefilter={setShortByDatefilter}
              clearComponent={clearComponent} dateFilter={dateFilter} ShortByDatefilter={ShortByDatefilter} />
            :
            <PersonalFolder colorCode={Color} data={personlaFolder} props={props} moveFolderDate={(id) => moveFolderDate(id)} setdateFilter={setdateFilter} setShortByDatefilter={setShortByDatefilter}
              clearComponent={clearComponent} dateFilter={dateFilter} ShortByDatefilter={ShortByDatefilter} />

          }

        </View>


        <Loader isLoading={loading} />



      </View>
    </SafeAreaView>
  )
}


export default Folder





