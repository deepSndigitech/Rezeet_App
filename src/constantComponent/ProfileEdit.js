import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import { color } from "./color";
import ImageCropPicker from "react-native-image-crop-picker";
import { ImageApi } from "../apiConfig/apiurl";

const { height, width } = Dimensions.get('window')

const ProfileEdit = ({ addmodel, closeModel, props, callApi}) => {

    const [image, setimage] = useState('')



    const handleImagePicker = async () => {

        const image = await ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })

        const data = await ImageApi(image)
        console.log('====================================')
        console.log("data?.image_data?.imagedata?.image_data?.image", data?.image_data?.image)
        console.log('====================================')
        // let updatedData = { ...items }
        closeModel();
        callApi()
        setimage(data?.image_data?.image)
    };



    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={addmodel}
        >
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0,0,0.6)'
            }} activeOpacity={1} onPress={() => closeModel()}>
                <View
                    style={{
                        marginTop: height / 4,
                        width: width / 1.5,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: color.primary,
                        backfaceVisibility: 'visible'
                    }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => closeModel()}>
                        <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: '#FFF' }} />
                    </TouchableOpacity>
                    <View style={{ marginVertical: 10 }}>
                        <Image source={image ? { uri: image } :
                            require('../Images/rezeetImg/Profile2.png')} style={{ height: 200, width: 200, alignSelf: 'center', marginBottom: 15, borderRadius: 100 }} />


                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {/* <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '45%', borderWidth: 1, backgroundColor: '#DA7878' }} onPress={() => props.navigation.navigate('Home')}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 12, fontWeight: '400' }}>Remove photo</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '45%', borderWidth: 1, borderColor: '#DA7878' }} onPress={() => handleImagePicker()}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 12, fontWeight: '400' }}>Update photo</Text>
                            </TouchableOpacity>
                        </View>


                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default ProfileEdit