import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { color } from '../../constantComponent/color';
import AddressList from '../../constantComponent/AddressList';
import { useSelector } from 'react-redux';


const { height, width } = Dimensions.get('screen');

const Address = (props) => {
  const Color = useSelector(state => state.Theme.Color)


  return (
    <SafeAreaView>
      <View style={{ height: '100%', backgroundColor: Color.tertiary }}>
        <View style={{ paddingTop: 10, backgroundColor: 'rgba(155, 122, 255,0.5)', borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingBottom: 50 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={require('../../Images/rezeetImg/left_arrow.png')} style={{ height: 40, width: 40, tintColor: Color.onSecondary, elevation: 5 }} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 30, color: Color.onSecondary, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Your Address </Text>
          </View>


        </View>

        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 10 }}>

            <AddressList colorCode={Color} />
            {/* <View style={{ paddingVertical: 5, backgroundColor: '#FFF', elevation: 4, marginTop: 20, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                <View style={{ width: '80%', flexDirection: 'row', }}>
                  <TouchableOpacity style={{ height: 25, width: 25, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <View style={{ height: 18, width: 18, backgroundColor: color.secondry, borderRadius: 20 }} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 5, fontSize: 20, fontWeight: '700', color: '#000' }}>Office</Text>
                  <View style={{ height: 25, width: 50, backgroundColor: color.secondry, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 10 }}>
                    <Text style={{ color: color.whiteR, fontSize: 12 }}>Default</Text>
                  </View>
                </View>
                <TouchableOpacity style={{ width: '10%' }}>
                  <Image style={{ height: 25, width: 25 }} source={require('../../Images/rezeetImg/more.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 0, marginHorizontal: 10 }}>
                <Text>Ground Floor, Eros Plaza, Eros Corporate Centre, Nehru Place, New Delhi-110019 Delhi South Delhi DL IN 110019</Text>
              </View>
            </View> */}
          </View>




        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Address