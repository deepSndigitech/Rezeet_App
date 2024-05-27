import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, Alert, RefreshControl } from "react-native"
import { color } from "./color";
import FilterComponent from "./FilterComponent";
import moment from "moment";
const { height, width } = Dimensions.get('window')
import DatePicker from 'react-native-date-picker'
import FilterFolder from "./FilterFolder";


const PersonalFolder = ({ data, props, moveFolderDate, colorCode, setdateFilter, setShortByDatefilter, clearComponent, dateFilter, ShortByDatefilter }) => {

    console.log("PersonalFolderPersonalFolderPersonalFolder", data);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState(false)
    const [refersh, setrefersh] = useState(false)




    const caling = (id) => {
        Alert.alert('Move To Business Folder', 'Do you really want to Move ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Move', onPress: () => moveFolderDate(id) },
        ]);
    }


    const pullReferesh = () => {
        setrefersh(true)
        clearComponent()
        setTimeout(() => {
            setrefersh(false)
        }, 2000);
    }


    return (
        <View style={{ flex: 1 }}>
            <FilterComponent setOpen={setOpen} open={open} setFilter={() => setFilter(!filter)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                <Text style={{ color: colorCode.primary, }}>{dateFilter}</Text>
                <Text style={{ color: colorCode.primary, }}>{ShortByDatefilter}</Text>
            </View>

            <ScrollView style={{}} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refersh} onRefresh={pullReferesh} />
            } >

                {data && data[0] ?
                    data?.map((ele, inde) => (
                        <>
                            <TouchableOpacity key={`personal${inde}`} style={{ height: 90, borderRadius: 10, elevation: 7, backgroundColor: '#FFF', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }} activeOpacity={0.9} onLongPress={() => caling(ele?._id)}>
                                <View style={{ width: '50%', padding: 10 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={require('../Images/rezeetImg/brand1A.png')} style={{ height: 40, width: 40 }} />
                                        <View style={{ marginLeft: 8, width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', lineHeight: 20 }}>{ele?.storeInfo?.name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '400', color: 'grey' }} numberOfLines={1}>{ele?.storeInfo?.category}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: '#000', margin: 10, fontWeight: 'bold', fontSize: 16 }}>{moment(ele?.createdAt).format('MM/DD/YYYY')}</Text>
                                </View>
                                <View style={{ width: '50%', padding: 10, alignItems: 'flex-end' }}>
                                    <Text style={{ lineHeight: 30, fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 5 }} numberOfLines={1}>{ele?.category}</Text>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 35, backgroundColor: color.primary, width: '80%', borderRadius: 8, }} onPress={() => props.navigation.navigate('ViewPdf', { "pdf_Url": ele })}>
                                        <Text style={{ color: '#FFF', fontWeight: "bold", fontSize: 14 }}>View Receipt</Text>
                                    </TouchableOpacity>

                                </View>


                            </TouchableOpacity>
                        </>
                    )) :
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <Text style={{ fontWeight: '700', fontSize: 22, color: colorCode.primary }}>No Data Found !</Text>
                    </View>
                }
                <View style={{ marginTop: 70 }} />
                <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setdateFilter(moment(date).format('DD/MM/YYYY'))
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

            </ScrollView>
            <FilterFolder closeModel={() => setFilter(!filter)} addmodel={filter} setShortByDatefilter={setShortByDatefilter} />

        </View>
    )
}
export default PersonalFolder