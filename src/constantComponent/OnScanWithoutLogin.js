import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux";
import { apiMethod, apiRoutes, apimethods } from "../apiConfig/apiurl";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get('window')

const OnScanWithoutLogin = ({ addmodel, closeModel, props, ScanResult }) => {
    const Color = useSelector(state => state.Theme.Color)
    const [folder, setfolder] = useState(["Personal Folder", "Business Folder"])
    const [selectedFolder, setselectedFolder] = useState("");
    const [loading, setloading] = useState(false);
    console.log("ScanResultScanResultScanResult@@@@@@", ScanResult);
    console.log("ScanResultScanResultScanResult@@@@@@", selectedFolder);

    const modelSave = async () => {
        // setloading(true)
        closeModel()
        props.navigation.navigate('ViewPdfWithoutLogin', { "pdf": ScanResult })


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
                        width: width / 1.5,
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
                        <Text style={{ color: 'green', alignSelf: 'center', fontWeight: '700' }}>Receipt Generated successfully</Text>

                        <Image source={require('../Images/rezeetImg/Pdf.png')} style={{ height: 100, width: 100, tintColor: Color.onSecondary, alignSelf: 'center' }} />


                        <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '60%', borderWidth: 1, marginTop: 20, borderColor: Color.onSecondary, backgroundColor: Color.primary, alignSelf: 'center' }} onPress={() => modelSave()}>
                            {loading ?
                                <ActivityIndicator size="small" color="#FFF" />
                                : <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>View Receipt</Text>
                            }

                        </TouchableOpacity>

                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default OnScanWithoutLogin