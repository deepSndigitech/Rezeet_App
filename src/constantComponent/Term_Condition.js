import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import { color } from "./color";
import { history } from "../_helpers/history";

const { height, width } = Dimensions.get('window')

const Term_Condition = ({ addmodel, closeModel, props, }) => {

    const [folder, setfolder] = useState(["Terms & Conditions", "Privacy Policy"])
    const [folderActive, setfolderActive] = useState("Terms & Conditions");
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
                        marginTop: 50,
                        width: width / 1.1,
                        height: height / 1.3,

                        alignSelf: 'center',
                        // padding: 15,
                        borderRadius: 10,
                        backgroundColor: '#FFF',
                        backfaceVisibility: 'visible'
                    }}>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}>
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ color: '#000', fontWeight: '800', fontSize: 18 }}>PDF Scanner Application </Text>
                        </View>
                        <TouchableOpacity style={{}} onPress={() => closeModel()}>
                            <Image source={require('../Images/rezeetImg/close.png')} style={{ height: 18, width: 18, tintColor: '#000' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5 }}>
                        {folder.map((ek, ind) => (
                            <TouchableOpacity style={{
                                height: 30, width: '45%',
                                backgroundColor: '#FFF', elevation: folderActive === ek ? 0 : 4,
                                justifyContent: 'center', alignItems: 'center'
                            }} key={ind} onPress={() => setfolderActive(ek)}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>{ek}</Text>
                            </TouchableOpacity>))
                        }

                        {/* <TouchableOpacity style={{ height: 30, width: '45%', backgroundColor: '#FFF', elevation: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>Privacy Policy</Text>
                        </TouchableOpacity> */}

                    </View>


                    <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                        {folderActive === "Terms & Conditions" ?
                            < View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>Terms of Service Agreement</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 5 }}>Effective Date: September 2023</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>This Terms of Service Agreement ("Agreement") is entered into between ReZeet.io, a Incorporation ("Company," "we," "us," or "our"), and you ("User," "you," or "your"). By accessing or using the ReZeet digital receipt mobile application ("App" or "Service"), you agree to comply with and be bound by the terms and conditions of this Agreement.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    1. Acceptance of Terms</Text>
                                <Text style={{ color: '#000', }}>By accessing or using the App, you agree to be bound by the terms and conditions set forth in this Agreement. If you do not agree to these terms, please do not use the App.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    2. Description of Service</Text>
                                <Text style={{ color: '#000', }}>The Company provides a mobile application that allows users to generate and store digital receipts. The primary purpose of the App is to reduce paper usage, contribute to environmental conservation efforts, and provide a convenient alternative to traditional paper receipts.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    3. User Registration</Text>
                                <Text style={{ color: '#000', }}>To use certain features of the App, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    4. User Obligations</Text>
                                <Text style={{ color: '#000', }}>You agree not to:{"\n"}Use the App for any unlawful purpose or in violation of any applicable laws.</Text>
                                <Text style={{ marginTop: 10, color: '#000' }}>
                                    Attempt to gain unauthorized access to any portion of the App or any systems or networks connected to the App.
                                </Text>
                                <Text style={{ marginTop: 10, color: '#000' }}>
                                    Engage in any activity that interferes with or disrupts the App or the servers and networks used to provide the App.
                                </Text>
                                <Text style={{ marginTop: 10, color: '#000' }}>
                                    Use any automated means to access or use the App.
                                </Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}> 5. Privacy Policy</Text>
                                <Text style={{ color: '#000' }}>Your use of the App is also governed by our Privacy Policy, which can be found in the App. By using the App, you consent to the terms of the Privacy Policy</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>6. Intellectual Property</Text>
                                <Text style={{ color: '#000' }}>All content and materials available on the App, including but not limited to trademarks, logos, text, graphics, images, and software, are the property of the Company or its licensors and are protected by applicable intellectual property laws.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>7.Disclaimers</Text>
                                <Text style={{ color: '#000' }}>The App is provided on an "as-is" and "as-available" basis. The Company makes no representations or warranties of any kind, express or implied, regarding the use or the results of the App in terms of its correctness, accuracy, reliability, or otherwise.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>8. Limitation of Liability</Text>
                                <Text style={{ color: '#000' }}>To the fullest extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</Text>
                                <Text style={{ color: '#000', marginTop: 10 }}>Your use or inability to use the App.</Text>
                                <Text style={{ color: '#000', marginTop: 10 }}>Any unauthorized access to or use of our servers and/or any personal information stored therein.</Text>
                                <Text style={{ color: '#000', marginTop: 10 }}>Any interruption or cessation of transmission to or from the App</Text>
                                <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold' }}>9. Termination</Text>
                                <Text style={{ color: '#000', }}>The Company reserves the right, in its sole discretion, to terminate your access to the App at any time and for any reason, without prior notice.</Text>


                                <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold' }}>10. Changes to Terms</Text>
                                <Text style={{ color: '#000', }}>The Company reserves the right to modify this Agreement at any time. Changes will become effective immediately upon posting. Your continued use of the App following the posting of changes constitutes your acceptance of such changes.</Text>
                                <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold' }}>11. Governing Law</Text>
                                <Text style={{ color: '#000', }}>This Agreement shall be governed by and construed in accordance with the laws of Canada and United States.</Text>
                                <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold' }}>By using the App, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</Text>


                            </View>
                            : null}

                        {/* Privecy Policy */}
                        {folderActive === "Privacy Policy" ?
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>This is the privacy policy that we can also add to the mobile App.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 5 }}>Effective Date: September, 2023</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>Welcome to Rezeet Digital Receipts App (referred to as "we," "us," or "our"). We are committed to protecting your privacy and providing you with a secure and efficient digital receipt management experience. This Privacy Policy outlines the information we collect, how we use it, and the choices you have concerning your data. By using our Digital Receipts App, you agree to the terms outlined in this Privacy Policy.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    Information We Collect:</Text>
                                <Text style={{ color: '#000', }}>a. Personal Information: We may collect personal information such as your name, email address, and contact details when you create an account or contact our support team.</Text>
                                <Text style={{ color: '#000', }}>b. Transaction Data: Our app collects transaction data when you use it to store or manage your digital receipts. This data may include purchase details, receipts, and transaction history.</Text>
                                <Text style={{ color: '#000', }}>c. Device Information: We may collect information about the device you use to access our app, including the device type, operating system, and unique device identifiers.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    How We Use Your Information:</Text>
                                <Text style={{ color: '#000', }}>a. Digital Receipt Management: We use your personal information to provide you with digital receipt management services, including storing, organizing, and retrieving digital receipts.</Text>
                                <Text style={{ color: '#000', }}>b. Customer Support: Your contact information may be used to respond to your inquiries, provide support, and address technical issues.</Text>
                                <Text style={{ color: '#000', }}>c. App Improvement: We may use aggregated and anonymized data to improve our app's functionality, performance, and user experience.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    Data Security:</Text>
                                <Text style={{ color: '#000', }}>a. We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>
                                    Data Retention</Text>
                                <Text style={{ color: '#000', }}>a. We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</Text>

                                <Text style={{ marginTop: 10, color: '#000' }}>
                                    Third-Party Services:
                                </Text>
                                <Text style={{ marginTop: 10, color: '#000' }}>
                                    a. Our app may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. Please review their privacy policies before interacting with them.
                                </Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>Cookies and Similar Technologies:</Text>
                                <Text style={{ color: '#000' }}>a. We may use cookies and similar tracking technologies to enhance your app experience. You can manage your cookie preferences through your device settings.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>Your Choices:</Text>
                                <Text style={{ color: '#000' }}>a. You can review, update, or delete your personal information by accessing your account settings.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>Changes to this Privacy Policy:</Text>
                                <Text style={{ color: '#000' }}>a. We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted here, and the date of the latest revision will be indicated at the top of the Privacy Policy.</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000', marginTop: 10 }}>Contact Us:</Text>

                                <Text style={{ color: '#000', fontWeight: 'bold' }}>a. If you have any questions, concerns, or requests regarding your privacy or this Privacy Policy, please contact us at customer.champs@rezeet.io.</Text>
                                <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold' }}>By using our Digital Receipts App, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</Text>



                            </View> : null}

                    </ScrollView>
                </View>
            </TouchableOpacity >
        </Modal >
    )
}

export default Term_Condition;