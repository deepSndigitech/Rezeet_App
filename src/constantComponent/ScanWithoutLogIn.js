import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiMethod, apiRoutes, apimethods } from "../apiConfig/apiurl";

const { height, width } = Dimensions.get('window')

const ScanWithoutLogIn = ({ addmodel, closeModel, props, }) => {
    const Color = useSelector(state => state.Theme.Color)

    const [Email, setEmail] = useState("")
    const [loading, setloading] = useState(false)
    const [EmailError, setEmailError] = useState("")
    const isEmailValid = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const scanwithout = async () => {
        if (Email) {
            if (isEmailValid(Email)) {
                setloading(true)
                let body = {
                    method: apimethods.P,
                    url: apiRoutes.scanwithoutLogin,
                    data: {
                        "email": Email
                    }
                };
                try {
                    const data = await apiMethod(body)
                    setloading(false)
                    closeModel()
                    console.log("", data?.registerData);
                    props.navigation.navigate('ScanQRWithoutLogin')


                } catch (error) {
                    setloading(false)
                    Toast.show({
                        text1: error?.response?.data?.message,
                        type: 'error'
                    });

                }

            }
            else {
                setEmailError("Please enter a valid email address.");
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Email Id To use Scan !'
            })
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
                        marginTop: height / 3,
                        width: width / 1.19,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: Color.onPrimary, backfaceVisibility: 'visible'
                    }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => closeModel()}>
                        <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: Color.onSecondary }} />
                    </TouchableOpacity>
                    <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: '900', color: Color.onSecondary }}>Scan Without Login</Text>
                        <Text style={{ fontSize: 11, fontWeight: '400', color: Color.onSecondary, marginHorizontal: 40, textAlign: 'center' }}>Please provide email to be used on the rezeet application.</Text>

                        <View style={{ marginTop: 30, width: '90%', height: 35, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', alignItems: 'center' }}>
                            <TextInput style={{ textAlign: 'center', padding: 0, color: Color.primary }} placeholder="Enter your email"
                                placeholderTextColor={Color.primary}
                                onChangeText={(text) => setEmail(text)}
                                value={Email}


                                keyboardType="email-address" />
                        </View>
                        {EmailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{EmailError}</Text>}

                        <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '45%', borderWidth: 1, marginTop: 20, borderColor: Color.onSecondary, backgroundColor: Color.primary }} onPress={() => scanwithout()}>
                            {loading ?
                                <ActivityIndicator size="small" color="#FFF" />
                                :
                                <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Submit</Text>
                            }

                        </TouchableOpacity>

                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default ScanWithoutLogIn