import { useEffect, useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get('window')

const FilterFolder = ({ addmodel, closeModel, props, setShortByDatefilter ,}) => {
    const Color = useSelector(state => state.Theme.Color)
    const [folder, setfolder] = useState(["Short by date (Newest First)", "Short by date (Old First)"])
    const [selectedFolder, setselectedFolder] = useState("");

    // useEffect(() => {
    //     closeModel()
    // }, [selectedFolder])

    const functionCall = () => {
        closeModel()
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
                        width: width / 1.3,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: Color.onPrimary, backfaceVisibility: 'visible'
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: Color.onSecondary, }}>Filter</Text>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => closeModel()}>
                            <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: Color.onSecondary }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ paddingVertical: 0, }}>


                        {
                            folder.map((ele, index) => (

                                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 6, marginTop: 10, borderRadius: 10 }} key={index} >
                                    <TouchableOpacity style={{ height: 25, width: 25, borderRadius: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => { setselectedFolder(ele), setShortByDatefilter(ele), functionCall() }}>
                                        <View style={{
                                            height: 15, width: 15, backgroundColor:
                                                ele === selectedFolder ? '#000' : '#FFF', borderRadius: 20
                                        }} />
                                    </TouchableOpacity>

                                    <Text style={{ marginLeft: 15, alignSelf: 'center', fontWeight: '400', color: '#000' }}>{ele}</Text>

                                </View>

                            ))
                        }

                        {/* <TouchableOpacity style={{ borderRadius: 7, padding: 5, width: '45%', borderWidth: 1, marginTop: 20, borderColor: Color.onSecondary, backgroundColor: Color.primary, alignSelf: 'center' }} onPress={() => modelSave()}>
                            <Text style={{ color: Color.onPrimary, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Save</Text>
                        </TouchableOpacity> */}

                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default FilterFolder