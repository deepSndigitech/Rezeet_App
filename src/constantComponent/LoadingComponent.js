import { useEffect, useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get('window')

const LoadingComponent = ({ addmodel, closeModel, props, value }) => {
    const Color = useSelector(state => state.Theme.Color)



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
                        width: width / 1.3,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: Color.onPrimary, backfaceVisibility: 'visible',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <ActivityIndicator size="large" color="#000" />
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{value}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default LoadingComponent