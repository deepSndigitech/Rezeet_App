import moment from "moment";
import { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, Text, View, Dimensions, Image, TextInput, Keyboard, ActivityIndicator } from "react-native"
import Modal from 'react-native-modal';
import { useSelector } from "react-redux";
import { apiMethod, apiRoutes, apimethods } from "../apiConfig/apiurl";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get('window')

const VarifyEmail = ({ visible, onClose, email, setEmailVerified }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpInputRefs = useRef([]);
    const Color = useSelector(state => state.Theme.Color)

    const [loading, setloading] = useState(false)

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otpInputRefs.current.length - 1) {
            otpInputRefs.current[index + 1].focus();
        }

        const filteredArray = newOtp.filter(item => item !== "");
        if (filteredArray.length === 4) {
            const newOtpp = newOtp.join('')
            // setOtp(newOtpp);
            submitOtp(newOtpp)
            Keyboard.dismiss()

        }

    };

    const submitOtp = async (id) => {
        // setOtpNumber(id);
        setloading(true);
        console.log('====================================')
        console.log("", id)
        console.log('====================================')

        let body = {
            method: apimethods.P,
            url: apiRoutes.emailVarify,
            data:
            {
                "email": email,
                "OTP": id
            }

        };
        try {
            const data = await apiMethod(body)
            console.log("data", data?.registerData);
            setloading(false);
            setEmailVerified(true);
            setOtp(['', '', '', '']);
            onClose();
            Toast.show({
                text1: data?.registerData?.message,
                type: 'success'
            });

        } catch (error) {
            // setLoading(false)
            setloading(false);

            Toast.show({
                text1: error?.response?.data?.message,
                type: 'error'
            });
            console.log('Error setting item in AsyncStorage:', error?.response?.data?.message);
        }
        // props.navigation.navigate('ConfirmePassword', { "email": email, "otp": id })
        // props.navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'ConfirmePassword' }]
        // });
        // onClose();
    }



    return (
        <>
            <Modal isVisible={visible}
                animationIn="slideInUp"
                animationInTiming={700}
                animationOut="slideOutDown"
                animationOutTiming={700}
                style={{ marginLeft: 0, marginBottom: 0, width: '100%' }}
                backdropOpacity={0.5}
                onBackButtonPress={() => onClose()}
                onBackdropPress={() => onClose()}>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    maxHeight: 500,
                    width: width,
                    height: height / 2,
                    backgroundColor: Color.onPrimary,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    elevation: 5,

                }}>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', height: 5, width: 100, borderRadius: 10, backgroundColor: Color.onSecondary }} activeOpacity={1}>

                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>

                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: Color.onSecondary }}>Verify Email</Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20, marginTop: 5 }}>Code has been send to {email}.
                        </Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20, }}>Enter the code to verify your account.</Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20, marginTop: 10 }}>Enter Code</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal: 10 }}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={{
                                        color: '#000',
                                        width: 45,
                                        backgroundColor: '#D3D3D3',
                                        height: 45,
                                        borderRadius: 5,
                                        borderColor: '#D3D3D3',
                                        borderWidth: 1,
                                        marginHorizontal: 5,
                                        textAlign: 'center',
                                        fontSize: 20,
                                    }}
                                    onChangeText={(text) => handleOtpChange(index, text)}
                                    value={digit}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    ref={(ref) => otpInputRefs.current[index] = ref}
                                />
                            ))}
                        </View>
                        {/* <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: Color.onSecondary, fontSize: 12 }}>Didn’t Receive Code?</Text>
                            <TouchableOpacity>
                                <Text style={{ fontWeight: '700', color: Color.onSecondary, textDecorationLine: 'underline', fontSize: 12 }}> Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, alignSelf: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: Color.onSecondary, fontSize: 12 }}>Resend code in 00:59</Text>
                        </View> */}

                        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, marginHorizontal: 20, borderRadius: 10, padding: 7, width: '80%', borderWidth: 1, borderColor: Color.onSecondary, justifyContent: 'center' }}
                        // onPress={() => submitOtp()}
                        >
                            {loading ?
                                <ActivityIndicator size="large" color={Color.onSecondary} />

                                : <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Verify Email</Text>
                            }
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>
        </>

    )
}
export default VarifyEmail