import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, Linking, ActivityIndicator, Alert, } from 'react-native'
import React, { useState, useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useSelector } from 'react-redux';
import OnScanSucess from '../../constantComponent/OnScanSucess';
import { apiMethod, apiRoutes, apimethods } from '../../apiConfig/apiurl';
import Toast from 'react-native-toast-message';
import OnScanWithoutLogin from '../../constantComponent/OnScanWithoutLogin';
import ImageCropPicker from "react-native-image-crop-picker";
import RNQRGenerator from 'rn-qr-generator';
// import { color } from '../../constantComponent/color';
// import Pdf from 'react-native-pdf';


const { height, width } = Dimensions.get('window');
const ScanQRWithoutLogin = props => {
  const Color = useSelector(state => state.Theme.Color)


  const [qrData, setQrData] = useState('');
  const [showQRScanner, setshowQRScanner] = useState(true)
  const [ScanDone, setScanDone] = useState(false)
  const [flash, setFlash] = useState(false)
  const [ScanResult, setScanResult] = useState(null)


  const onSuccess = async (e) => {
    setshowQRScanner(false)

    console.log('code', JSON.parse(e?.data)?._id);
    let id = e?.data?._id;
    console.log("_id_id", id);

    let body = {
      method: apimethods.G,

      // url: `https://dev.rezeet.io/api/user/generate/invoice/${JSON.parse(e?.data)?._id}`,
      url: `${apiRoutes.generateRecipt}/${JSON.parse(e?.data)?._id}`,
    };
    try {

      const data = await apiMethod(body)
      console.log("datadatadatadata", data?.registerData);
      setScanResult(data?.registerData?.data)
      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      })
      setshowQRScanner(true)

      setScanDone(true);

    } catch (error) {
      console.log('error', error?.response?.data);
      Toast.show({
        text1: error?.response?.data?.message,
        type: 'error'
      })
      setshowQRScanner(true)
    }



  };



  const pickImageFromGallery = () => {
    try {
      ImageCropPicker.openPicker({
        mediaType: 'photo'
      }).then(photo => {
        console.log("fdmsfdjnsdf", photo);
        decodeQrCode(photo);
      });

    } catch (error) {
      console.log("error");
    }

  }

  const decodeQrCode = (photo) => {
    try {
      RNQRGenerator.detect({
        uri: photo.path,
      })
        .then(response => {
          console.log("responce#############", response);
          const { values, type } = response;
          if (type == 'QRCode') {
            console.log("QRCodeQRCodeQRCodeQRCode data", JSON.parse(values));
            setQrData(JSON.parse(values));
            callingApi(values)
          } else {
            console.log("QR code is not detected in Image, Try another image");
            Alert.alert('Warning', "QR code is not detected in Image, Try another image")
          }
        })
        .catch(error => {
          console.log("errorrrrrrr", error);
        })


    } catch (error) {

      console.log("kndsfndsjfnjksdnf", error);
    }

  }

  const callingApi = async (val) => {
    setshowQRScanner(false)
    setScanResult(JSON.parse(val))
    let body = {
      method: apimethods.G,
      url: `${apiRoutes.generateRecipt}/${JSON.parse(val)?._id}`,
    };
    try {

      const data = await apiMethod(body)
      console.log("datadatadatadata", data?.registerData);
      setScanResult(data?.registerData?.data)
      Toast.show({
        text1: data?.registerData?.message,
        type: 'success'
      })
      setshowQRScanner(true)

      setScanDone(true);

    } catch (error) {
      Toast.show({
        text1: error?.response?.data?.message,
        type: 'error'
      })
      setshowQRScanner(true)

    }
  }

  return (
    <View style={{}}>



      <>
        {showQRScanner ? (
          <View
            style={{
              flex: 1,

            }}>
            <QRCodeScanner
              cameraStyle={[
                {
                  height: height,
                  width: width,
                  // alignSelf:'center'
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}

              // showMarker={true}

              flashMode={flash ?
                RNCamera.Constants.FlashMode.torch :
                RNCamera.Constants.FlashMode.off
              }
              cameraProps={{ captureAudio: false }}
              onRead={onSuccess}
              fadeIn={true}
              vibrate={true}
              // flashMode={RNCamera.Constants.FlashMode.torch}
              bottomContent={
                <>
                  <View style={{ marginHorizontal: 10, flexDirection: 'row', position: 'absolute', top: 10, left: 0 }}>

                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.goBack()}>
                      <Image style={{ height: 35, width: 35, marginRight: 10, tintColor: "#FFF", resizeMode: 'contain' }} source={require('../../Images/rezeetImg/left_arrow.png')} />

                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10, color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Scan</Text>



                  </View>
                  <View style={{ marginTop: height / 2, }}>
                    <ImageBackground source={require('../../Images/rezeetImg/scanImageBack.gif')} style={{ height: 250, width: 260, justifyContent: 'center', }}>

                      <TouchableOpacity style={{ marginHorizontal: 10, alignSelf: 'flex-end' }} onPress={() => setFlash(!flash)}>
                        <Image
                          source={flash ?
                            require('../../Images/rezeetImg/bolt.png') :
                            require('../../Images/rezeetImg/nobolt.png')
                          } style={{ height: 25, width: 25, tintColor: '#FFF' }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginHorizontal: 15, alignSelf: 'flex-end', marginTop: 30 }} onPress={() => pickImageFromGallery()}>
                        <Image
                          source={
                            require('../../Images/rezeetImg/gallery.png')
                          } style={{ height: 25, width: 25, tintColor: '#FFF' }} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>



                </>


              }
            />

          </View>
        ) : (
          <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={{ marginTop: 30, color: '#000', fontSize: 16 }}>Generating Receipt...</Text>

          </View>
        )}
      </>

      {/* <View style={{ flex: 1, backgroundColor: 'red' }}>
        {ScanResult &&
          <Text>DAta Found {ScanResult}</Text>
        }
      </View> */}
      <OnScanWithoutLogin addmodel={ScanDone} props={props} closeModel={() => setScanDone(!ScanDone)} ScanResult={ScanResult} />

      {/* <OnScanSucess addmodel={ScanDone} props={props} closeModel={() => setScanDone(!ScanDone)} ScanResult={ScanResult} /> */}
    </View>
  )
}
export default ScanQRWithoutLogin

