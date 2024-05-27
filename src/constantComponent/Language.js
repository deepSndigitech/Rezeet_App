import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import { color } from "./color";

const { height, width } = Dimensions.get('window')

const Language = ({ addmodel, closeModel, props, }) => {
    return (
        <Modal
            animationType="slide"

            transparent={true}
            visible={addmodel}
        >
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0,0,0.6)'
            }} activeOpacity={1}
            // onPress={() => closeModel()}
            // onLongPress={()=>closeModel()}
            >
                <View
                    style={{
                        marginTop: height / 2,
                        width: width,
                        height: 380,
                        // padding: 15,
                        borderRadius: 10,
                        backgroundColor: '#FFF',
                        backfaceVisibility: 'visible'
                    }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 15 }} onPress={() => closeModel()}>
                        <Text style={{ color: '#000', fontWeight: '800' }}>Done</Text>
                    </TouchableOpacity>

                    <ScrollView style={{ maxHeight: 300, }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((ele, index) => (

                            <View style={{
                                paddingVertical: 10, paddingHorizontal: 20, backgroundColor: index % 2 === 0 ?'#DDDD' : '#FFF'}} key={ele}>
                                <Text style={{ color: '#000' }}>English</Text>
                            </View>
                        ))}


                    </ScrollView>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default Language