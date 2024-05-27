import moment from "moment";
import { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, Text, View, Dimensions, Image, TextInput } from "react-native"
import Modal from 'react-native-modal';
import { color } from "./color";

const { height, width } = Dimensions.get('window')

const VarifyOptions = ({ visible, onClose, props, Color }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    // const [byVarify, setbyVarify] = useState(["Verify through Email", "Verify through Number"]);
    const [isVarifyemail, setisVarifyemail] = useState(false);
    const [isVarifyphone, setisVarifyphone] = useState(false);
    const [isEmilVarifed, setisEmilVarifed] = useState(false);
    const [isphoneVarifed, setisphoneVarifed] = useState(false);
    const [isphoneVarify, setisphoneVarify] = useState(false);
    const otpInputRefs = useRef([]);
    const [term, setTerm] = useState("");






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
                    {/* {isVarifyemail ?
                        <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>

                            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: Color.onSecondary }}>
                            
                            </Text>
                            <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20, marginTop: 5 }}>Code has been send to
                            
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
                                        // onChangeText={(text) => handleOtpChange(index, text)}
                                        // value={digit}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        ref={(ref) => otpInputRefs.current[index] = ref}
                                    />
                                ))}
                            </View>
                            <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: Color.onSecondary, fontSize: 12 }}>Didn’t Receive Code?</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontWeight: '700', color: Color.onSecondary, textDecorationLine: 'underline', fontSize: 12 }}> Resend Code</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10, alignSelf: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: Color.onSecondary, fontSize: 12 }}>Resend code in 00:59</Text>
                            </View>

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 30, marginHorizontal: 20, borderRadius: 10, backgroundColor: '#FFF', padding: 7, width: '80%', borderWidth: 1, borderColor: Color.onSecondary, justifyContent: 'center' }}
                                onPress={() => onClose()}>

                                <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Verify Account</Text>
                            </TouchableOpacity>
                        </View> : null

                    } */}


                    <View style={{ flex: 1, marginVertical: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: Color.onSecondary }}>Verification Method</Text>
                            <Text style={{ fontSize: 12, textAlign: 'center', color: Color.onSecondary, marginHorizontal: 20, marginTop: 5 }}>Varify through Email and Number
                            </Text>
                        </View>

                        <View style={{ marginTop: 40, marginHorizontal: 10 }}>


                            <View style={{ flexDirection: 'row', marginVertical: 7 }} >
                                <View style={{ width: '10%', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center', height: 25, borderColor: Color.onSecondary }} onPress={() => setisVarifyemail(!isVarifyemail)} >
                                        {isVarifyemail ?
                                            <View style={{ height: 20, width: '80%', backgroundColor: color.secondry, borderRadius: 3 }} />
                                            : null}
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginLeft: 5, color: Color.onSecondary, marginTop: 2 }} >Varify through Email</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 7 }} >
                                <View style={{ width: '10%', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center', height: 25, borderColor: Color.onSecondary }} onPress={() => setisVarifyphone(!isVarifyphone)} >
                                        {isVarifyphone ?
                                            <View style={{ height: 20, width: '80%', backgroundColor: color.secondry, borderRadius: 3 }} />
                                            : null}
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginLeft: 5, color: Color.onSecondary, marginTop: 2 }} >Varify through Phone Number</Text>
                            </View>
                        </View>


                        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, marginHorizontal: 20, borderRadius: 10, backgroundColor: '#FFF', padding: 7, width: '80%', borderWidth: 1, borderColor: Color.onSecondary, justifyContent: 'center' }}
                            onPress={() => setisVarify(!isVarify)} >

                            <Text style={{ color: Color.onSecondary, textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Verify Account</Text>
                        </TouchableOpacity>
                    </View>




                </View>
            </Modal>
        </>

    )
}
export default VarifyOptions