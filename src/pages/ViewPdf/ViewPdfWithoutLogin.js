import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, } from 'react-native'
import React, { useState, useRef } from 'react'
import Share from 'react-native-share';

import { color } from '../../constantComponent/color';
import Pdf from 'react-native-pdf';
import { useSelector } from 'react-redux';

import RNFetchBlob from 'rn-fetch-blob';
import LoadingComponent from '../../constantComponent/LoadingComponent';
import { apiMethod } from '../../apiConfig/apiurl';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');
const ViewPdfWithoutLogin = props => {

  const Color = useSelector(state => state.Theme.Color)
  const [loading, setloading] = useState(false)

  const [pdf_url, setpdf_url] = useState(props?.route?.params?.pdf)





  console.log("props dat vierw", props?.route);

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




  return (
    <View style={{ flex: 1, backgroundColor: Color.onPrimary }}>


      <View style={{ marginHorizontal: 10, marginTop: 30, flexDirection: 'row' }}>

        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.navigate('Welcome')}>
          <Image style={{ height: 35, width: 35, marginRight: 10, tintColor: Color.onSecondary, resizeMode: 'contain' }} source={require('../../Images/rezeetImg/left_arrow.png')} />

        </TouchableOpacity>
        <Text style={{ marginLeft: 10, color: Color.onSecondary, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Receipt</Text>



      </View>

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', width: 100, alignSelf: 'flex-end'
        }}>



          <TouchableOpacity style={{ height: 30, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Color.primaryButt, flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 5 }} onPress={() => handleShare()}>
            <Image source={require('../../Images/rezeetImg/share.png')} style={{ height: 20, width: 20, tintColor: Color.onPrimary }} />
          </TouchableOpacity >
          <TouchableOpacity style={{ height: 30, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: Color.primaryButt, flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 5 }} onPress={() => getDownloard()}>
            <Image source={require('../../Images/Downlord.png')} style={{ height: 20, width: 20, tintColor: Color.onPrimary }} />
          </TouchableOpacity>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pdf trustAllCerts={false}
            source={{ uri: pdf_url }}

            style={{ height: height / 1.2, width: '100%', alignSelf: 'center' }} />

        </ScrollView>

        <LoadingComponent addmodel={loading} />
      </View>


    </View>
  )
}
export default ViewPdfWithoutLogin
