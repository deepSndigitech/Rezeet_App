import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux";
import { apiMethod, apiRoutes, apimethods } from "../apiConfig/apiurl";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get('window')

const OnScanSucess = ({ addmodel, closeModel, props, ScanResult }) => {
    const Color = useSelector(state => state.Theme.Color)
    const [folder, setfolder] = useState(["Personal Folder", "Business Folder"])
    const [selectedFolder, setselectedFolder] = useState("");
    const [loading, setloading] = useState(false);
    console.log("ScanResultScanResultScanResult@@@@@@", ScanResult);
    console.log("ScanResultScanResultScanResult@@@@@@", selectedFolder);

    const modelSave = async () => {
        setloading(true)
        let body = {
            method: apimethods.P,
            url: apiRoutes.saveRecipt,
            data: {
                "qrId": ScanResult?._id,
                "category": selectedFolder
            }
        };
        try {

            const data = await apiMethod(body)
            setloading(false)


            Toast.show({
                text1: data?.registerData?.message,
                type: 'success'
            })
            props.navigation.navigate('Folders');
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Folders' }]
            });
            closeModel();


        } catch (error) {
            setloading(false)
            console.log('error', error?.response?.data);

        }

    }

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={addmodel}
        >
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0,0,0.6)'
            }} activeOpacity={1} >
                <View
                    style={{
                        marginTop: height / 4,
                        width: width / 1.19,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: Color.onPrimary, backfaceVisibility: 'visible'
                    }}>
                    {/* <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => closeModel()}>
                        <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: Color.onSecondary }} />
                    </TouchableOpacity> */}
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{ fontSize: 18, fontWeight: '400', color: Color.onSecondary, alignSelf: 'center' }}>Select the folder to save your bill</Text>

                        {
                            folder.map((ele, index) => (

                                <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 10, padding: 6, marginTop: 10, backgroundColor: selectedFolder === ele ? '#170B3B' : null, borderRadius: 10 }} key={index} onPress={() => setselectedFolder(ele)}>
                                    <Image style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: selectedFolder === ele ? '#FFF' : '#000' }}
                                        source={index === 0 ? require('../Images/rezeetImg/pers_folder.png') :
                                            require('../Images/rezeetImg/bus_Folders.png')} />

                                    <Text style={{ marginLeft: 15, alignSelf: 'center', fontWeight: '700', color: selectedFolder === ele ? '#FFF' : '#000' }}>{ele}</Text>

                                </TouchableOpacity>

                            ))
                        }

                        <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '45%', borderWidth: 1, marginTop: 20, borderColor: Color.onSecondary, backgroundColor: Color.primary, alignSelf: 'center' }} onPress={() => modelSave()}>
                            {loading ?
                                <ActivityIndicator size="small" color="#FFF" />
                                : <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Save</Text>
                            }

                        </TouchableOpacity>

                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default OnScanSucess