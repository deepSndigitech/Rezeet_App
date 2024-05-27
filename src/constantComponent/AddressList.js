import moment from "moment";
import { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, Text, View, Dimensions, Image, TextInput, Modal } from "react-native"
// import Modal from 'react-native-modal';
import { color } from "./color";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
const { height, width } = Dimensions.get('window')

const AddressList = ({ colorCode }) => {



    const [visible, setvisible] = useState(false)

    return (
        <>
            <View style={{ paddingVertical: 5, backgroundColor: colorCode.onPrimary, elevation: 4, marginTop: 20, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <View style={{ width: '80%', flexDirection: 'row', }}>
                        <TouchableOpacity style={{ height: 25, width: 25, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 5, borderColor: colorCode.onSecondary }}>
                            <View style={{ height: 18, width: 18, backgroundColor: color.secondry, borderRadius: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 5, fontSize: 20, fontWeight: '700', color: colorCode.onSecondary }}>Home</Text>
                        <View style={{ height: 25, width: 50, backgroundColor: color.secondry, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 10 }}>
                            <Text style={{ color: color.whiteR, fontSize: 12 }}>Default</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity style={{ width: '10%' }}>
                        <Image style={{ height: 25, width: 25 }} source={require('../Images/rezeetImg/more.png')} />
                    </TouchableOpacity> */}

                    <Menu style={{}} >
                        <MenuTrigger  >
                            <Image style={{ height: 25, width: 25, marginRight: 5, tintColor: colorCode.onSecondary }} source={require('../Images/rezeetImg/more.png')} />
                        </MenuTrigger>
                        <MenuOptions style={{}}>
                            <View style={{ borderRadius: 10, backgroundColor: '#FFF' }}>

                                <MenuOption onSelect={() => alert(`Delete`)} disabled={true}>
                                    <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: 16 }}>Edit</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Delete`)} >
                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={{ color: color.secondry, fontWeight: '700', fontSize: 16, textAlign: 'center' }}>Set as default</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Delete`)} >
                                    <View style={{ alignItems: 'center', backgroundColor: '#DA7878' }}>
                                        <Text style={{ color: '#000', fontWeight: '700', fontSize: 16 }}>Remove</Text>
                                    </View>
                                </MenuOption>
                            </View>



                        </MenuOptions>
                    </Menu>


                </View>
                <View style={{ marginTop: 0, marginHorizontal: 10 }}>
                    <Text style={{ color: colorCode.onSecondary }}>Ground Floor, Eros Plaza, Eros Corporate Centre, Nehru Place, New Delhi-110019 Delhi South Delhi DL IN 110019</Text>
                </View>
            </View>



        </>

    )
}
export default AddressList