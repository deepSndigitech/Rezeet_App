
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import LoadingComponent from '../../constantComponent/LoadingComponent';
import { apiMethod, apiRoutes } from '../../apiConfig/apiurl';
import Toast from 'react-native-toast-message';
const { height, width } = Dimensions.get('window');

const ViewPdf = (props) => {

  const Color = useSelector(state => state.Theme.Color)
  const [loading, setloading] = useState(false)
  const [loadinga, setloadinga] = useState(false)
  const [pdf_url, setpdf_url] = useState(props?.route?.params?.pdf_Url?.url)
  const [data, setData] = useState(props?.route?.params?.pdf_Url)
  console.log("props?.route?.params?.pdf_Url?.url", props?.route?.params?.pdf_Url);


  const handleShare = async () => {
    // Check if the URL points to a PDF file
    if (!pdf_url.endsWith('.pdf')) {
      console.warn('Provided URL does not point to a PDF file');
      return;
    }

    const shareOptions = {
      url: pdf_url,
      message: 'Sharing a PDF', // Optional message to share
      title: 'Receipt', // Optional title for the share dialog
    };

    try {
      const result = await Share.open(shareOptions);
      if (result.action === Share.sharedAction) {
        console.log('PDF shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dialog dismissed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const getDownloard = () => {
    setloading(true)
    const downloadUrl = pdf_url; // URL of the file to download
    const savePath = RNFetchBlob.fs.dirs.DownloadDir + `/Rezeet_Receipt_${Date.now()}.pdf`; // Path to save the downloaded file with a timestamp to ensure a unique name

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Downloading PDF',
        description: 'Please wait...',
        mime: 'application/pdf', // Set mime type to restrict downloads to PDF files
        path: savePath,
      },
    })
      .fetch('GET', downloadUrl)
      .then((res) => {
        // File downloaded successfully
        setloading(false)
        console.log('PDF File downloaded:', savePath);
      })
      .catch((error) => {
        // Handle download error
        setloading(false)
        console.error('Error downloading PDF file:', error);
      });
  }


  const deleteRecipt = async () => {
    setloadinga(true)
    let body = {
      method: 'delete',
      // url: `http://54.210.49.103:3000/api/receipt/delete/${data?._id}`,
      url: `${apiRoutes.deleteReci}/${data?._id}`,
    };
    console.log("body", body);
    try {
      const data = await apiMethod(body)
      console.log("datadatadatadata", data?.registerData);
      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      })
      setloadinga(false)

      props.navigation.navigate('Home')
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });

    } catch (error) {
      setloadinga(false)

      console.log('error', error?.response?.data);

    }

  }



  return (
    <View style={{ flex: 1, backgroundColor: Color.onPrimary }}>


      <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row' }}>

        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.goBack()}>
          <Image style={{ height: 35, width: 35, marginRight: 10, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/left_arrow.png')} />

        </TouchableOpacity>
        <Text style={{ marginLeft: 10, color: Color.onSecondary, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Receipt</Text>



      </View>

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', width: 150, alignSelf: 'flex-end'
        }}>



          <TouchableOpacity style={{ height: 30, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Color.primaryButt, flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 5 }} onPress={() => handleShare()}>
            <Image source={require('../../Images/rezeetImg/share.png')} style={{ height: 20, width: 20, tintColor: Color.onPrimary }} />
          </TouchableOpacity >
          <TouchableOpacity style={{ height: 30, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Color.primaryButt, flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 5 }} onPress={() => getDownloard()}>
            <Image source={require('../../Images/Downlord.png')} style={{ height: 20, width: 20, tintColor: Color.onPrimary }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 30, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Color.primaryButt, flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 5 }} onPress={() => deleteRecipt()}>
            <Image source={require('../../Images/rezeetImg/delete.png')} style={{ height: 20, width: 20, tintColor: Color.onPrimary }} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Pdf trustAllCerts={false}
            // onLoadProgress={setloading(true)}
            // onLoadComplete={setloading(false)}
            source={{ uri: pdf_url }}

            style={{ height: height / 1.3, width: '100%', alignSelf: 'center' }}
          />

        </ScrollView>

        <LoadingComponent addmodel={loading} value={"Downloarding...."} />
        <LoadingComponent addmodel={loadinga} />
      </View>


    </View>
  )
}

export default ViewPdf