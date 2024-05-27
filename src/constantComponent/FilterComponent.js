import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { color } from './color'

const FilterComponent = ({ setOpen, open, setFilter }) => {

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', marginVertical: 5 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%', borderWidth: 1, borderRadius: 10, height: 32, borderColor: color.secondry }} onPress={() => setOpen(!open)}>
                <Image style={{ height: 23, width: 23, resizeMode: 'contain' }} source={require('../Images/rezeetImg/calander.png')} />
                <Text style={{ color: color.secondry, fontSize: 12, fontWeight: '500' }}>
                    Select date from calendar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '25%', borderWidth: 1, borderRadius: 10, height: 32, borderColor: color.secondry }} onPress={() => setFilter()}>
                <Image style={{ height: 23, width: 23, resizeMode: 'contain' }} source={require('../Images/rezeetImg/Filter.png')} />
                <Text style={{ color: color.secondry, fontSize: 13, fontWeight: 'bold' }}>
                    Filter
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterComponent