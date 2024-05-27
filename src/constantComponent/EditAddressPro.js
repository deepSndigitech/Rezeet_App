import { useEffect, useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get('window')

const EditAddressPro = ({ addmodel, closeModel, props, setProfile, addressa }) => {
    const Color = useSelector(state => state.Theme.Color)

    const [address, setAddress] = useState({
        country: '',
        state: '',
        homeNo: '',
        street1: '',
        street2: '',
        city: '',
        postalCode: ''
    });

    useEffect(() => {
        setAddress(addressa)
    }, [])

    console.log("sakdmasmd", addressa);

    const handleInputChange = (key, value) => {
        setAddress(prevAddress => ({
            ...prevAddress,
            [key]: value
        }));
    };



    const validateFields = () => {
        if (!address?.country || !address?.state || !address?.homeNo || !address?.street1 || !address?.city || !address?.postalCode) {

            Alert.alert('Error', 'All fields are required');
            return false;
        }

        // You can add more specific validations for each field if needed

        return true;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            // Handle form submission
            console.log('Form submitted:', address);
            setAddress(prevAddress => ({
                ...prevAddress,
                ["fullAddress"]: `${address?.homeNo},${address?.street1},${address?.street2},${address?.city},${address?.state},${address?.country},${address?.postalCode}`
            }));
            console.log('====================================')
            console.log("address", address)
            console.log('====================================')
            // setaddress(address);
            // closeModel();
            newUpdate();
        }
    };

    const newUpdate = () => {
        setTimeout(() => {
            setProfile(prevProfile => ({
                ...prevProfile,
                ["address"]: address
            }));
            closeModel();
        }, 100);
    }

    console.log('====================================')
    console.log("profileComing", address)
    console.log('====================================')



    return (
        <Modal
            animationType="slide"
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
                        width: width / 1.19,
                        height: height / 2.3,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignSelf: "center",
                        backgroundColor: Color.onPrimary, backfaceVisibility: 'visible'
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.onSecondary }}>Add Address</Text>
                        <TouchableOpacity style={{}} onPress={() => closeModel()}>
                            <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: Color.onSecondary }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: Color.onSecondary }}>Address</Text>

                        <ScrollView style={{ height: 220 }} showsVerticalScrollIndicator={false}>
                            {/* houseNo */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="Apt No./House No" placeholderTextColor={Color.primary}
                                    maxLength={5}
                                    keyboardType="numeric"
                                    value={address?.homeNo}
                                    onChangeText={value => handleInputChange('homeNo', value)}
                                />
                            </View>
                            {/* street1 */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="Street1" placeholderTextColor={Color.primary}
                                    keyboardType="ascii-capable"
                                    value={address?.street1}
                                    onChangeText={value => handleInputChange('street1', value)}
                                />
                            </View>
                            {/* street2 */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="Street2" placeholderTextColor={Color.primary}
                                    keyboardType="ascii-capable"
                                    value={address?.street2}
                                    onChangeText={value => handleInputChange('street2', value)} />
                            </View>
                            {/* City */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="City" placeholderTextColor={Color.primary}
                                    keyboardType="ascii-capable"
                                    value={address?.city}
                                    onChangeText={value => handleInputChange('city', value)} />
                            </View>
                            {/* State */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="State" placeholderTextColor={Color.primary}
                                    value={address?.state}
                                    onChangeText={value => handleInputChange('state', value)} />
                            </View>
                            {/* Country */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="Country" placeholderTextColor={Color.primary}
                                    value={address?.country}
                                    onChangeText={value => handleInputChange('country', value)} />
                            </View>
                            {/* Zip/Postal Code */}
                            <View style={{ width: '100%', height: 34, borderWidth: 0.5, borderRadius: 7, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 0, color: Color.primary }} placeholder="Zip/Postal Code" placeholderTextColor={Color.primary}
                                    value={address?.postalCode}
                                    keyboardType="numeric"
                                    maxLength={7}
                                    onChangeText={value => handleInputChange('postalCode', value)} />
                            </View>
                        </ScrollView>

                        <TouchableOpacity style={{ borderRadius: 7, padding: 2, width: '35%', borderWidth: 1, borderColor: Color.onSecondary, alignSelf: 'flex-end', marginTop: 10 }} onPress={() => handleSubmit()}>
                            <Text style={{ color: Color.primaryButt, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Submit</Text>
                        </TouchableOpacity>

                    </View>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default EditAddressPro