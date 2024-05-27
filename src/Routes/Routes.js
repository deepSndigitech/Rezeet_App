import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message'


import Sidebar from './Sidebar';
import Login from '../pages/Login/Login';
import Intro1 from '../pages/Intro/Intro1';
import Intro2 from '../pages/Intro/Intro2';
import Intro3 from '../pages/Intro/Intro3';
import Loading from '../pages/Loading/Loading';

import Profile from '../pages/Profile/Profile';
import Splash from './Splash';
import Welcome from './Welcome';

import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';
import BottomTab from './BottomTab';
import Notifications from '../pages/Notifications/Notifications';
import Eco_Impact from '../pages/Eco_Impact/Eco_Impact';
import Folder from '../pages/Folder/Folder';
import ConfirmePassword from '../pages/ForgetPassword/ConfirmePassword';
import Congratulation from '../pages/Loading/Congratulation';
import ViewPdf from '../pages/ViewPdf/ViewPdf';
import ScanQR from '../pages/ScanQR/ScanQR';
import Address from '../pages/Address/Address';
import EditAddress from '../pages/Address/EditAddress';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignUp_2 from '../pages/SignUp/SignUp_2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import StatusBarApp from '../constantComponent/StatusBar';
import Tax_Filling from '../pages/Tax_Filling/Tax_Filling';
import ScanQRWithoutLogin from '../pages/ScanQR/ScanQRWithoutLogin';
import ViewPdfWithoutLogin from '../pages/ViewPdf/ViewPdfWithoutLogin';

const Stack = createNativeStackNavigator();

const Route = props => {

    const [isLogIn, setisLogIn] = useState(false)
    const [loarding, setloarding] = useState(true)
    const [token, setToken] = useState("")




    console.log("asdsdsad");

    useEffect(() => {
        tokenfun()

        setTimeout(() => {
            setloarding(false)
        }, 2000);

    }, []);

    const tokenfun = async () => {
        const tokens = await AsyncStorage.getItem('Token');

        setToken(tokens);
    }



    return (

        <>
            {/* <StatusBarApp /> */}
            {loarding ?
                <>
                    <Splash />
                </>
                :

                <NavigationContainer>
                    {token ?
                        <Stack.Navigator initialRouteName='Home'>

                            <Stack.Screen name='Home' component={Sidebar} options={{ headerShown: false }} />
                            {/* <Stack.Screen name='Home' component/={Home} options={{ headerShown: false }} /> */}

                            <Stack.Screen name='Intro1' component={Intro1} options={{ headerShown: false }} />
                            <Stack.Screen name='Intro2' component={Intro2} options={{ headerShown: false }} />
                            <Stack.Screen name='Intro3' component={Intro3} options={{ headerShown: false }} />
                            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
                            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp_2' component={SignUp_2} options={{ headerShown: false }} />
                            <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
                            <Stack.Screen name='ConfirmePassword' component={ConfirmePassword} options={{ headerShown: false }} />
                            <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
                            <Stack.Screen name='Sidebar' component={Sidebar} options={{ headerShown: false }} />
                            <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
                            <Stack.Screen name='Eco_Impact' component={Eco_Impact} options={{ headerShown: false }} />
                            <Stack.Screen name='Folder' component={Folder} options={{ headerShown: false }} />
                            <Stack.Screen name='Profiles' component={Profile} options={{ headerShown: false }} />
                            <Stack.Screen name='Loading' component={Loading} options={{ headerShown: false }} />
                            <Stack.Screen name='Congratulation' component={Congratulation} options={{ headerShown: false }} />
                            <Stack.Screen name='ViewPdf' component={ViewPdf} options={{ headerShown: false }} />
                            <Stack.Screen name='ScanQR' component={ScanQR} options={{ headerShown: false }} />
                            <Stack.Screen name='Address' component={Address} options={{ headerShown: false }} />
                            <Stack.Screen name='EditAddress' component={EditAddress} options={{ headerShown: false }} />
                            <Stack.Screen name='Tax_Filling' component={Tax_Filling} options={{ headerShown: false }} />



                        </Stack.Navigator>
                        :

                        <Stack.Navigator initialRouteName='Intro1'>

                            <Stack.Screen name='Home' component={Sidebar} options={{ headerShown: false }} />
                            {/* <Stack.Screen name='Home' component/={Home} options={{ headerShown: false }} /> */}

                            <Stack.Screen name='Intro1' component={Intro1} options={{ headerShown: false }} />
                            <Stack.Screen name='Intro2' component={Intro2} options={{ headerShown: false }} />
                            <Stack.Screen name='Intro3' component={Intro3} options={{ headerShown: false }} />
                            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
                            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp_2' component={SignUp_2} options={{ headerShown: false }} />
                            <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
                            <Stack.Screen name='ConfirmePassword' component={ConfirmePassword} options={{ headerShown: false }} />
                            <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
                            <Stack.Screen name='Sidebar' component={Sidebar} options={{ headerShown: false }} />
                            <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
                            <Stack.Screen name='Eco_Impact' component={Eco_Impact} options={{ headerShown: false }} />
                            <Stack.Screen name='Folder' component={Folder} options={{ headerShown: false }} />
                            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                            <Stack.Screen name='Loading' component={Loading} options={{ headerShown: false }} />
                            <Stack.Screen name='Congratulation' component={Congratulation} options={{ headerShown: false }} />
                            <Stack.Screen name='ViewPdf' component={ViewPdf} options={{ headerShown: false }} />
                            <Stack.Screen name='ScanQR' component={ScanQR} options={{ headerShown: false }} />
                            <Stack.Screen name='Address' component={Address} options={{ headerShown: false }} />
                            <Stack.Screen name='EditAddress' component={EditAddress} options={{ headerShown: false }} />
                            <Stack.Screen name='Tax_Filling' component={Tax_Filling} options={{ headerShown: false }} />
                            <Stack.Screen name='ScanQRWithoutLogin' component={ScanQRWithoutLogin} options={{ headerShown: false }} />
                            <Stack.Screen name='ViewPdfWithoutLogin' component={ViewPdfWithoutLogin} options={{ headerShown: false }} />




                        </Stack.Navigator>

                    }




                </NavigationContainer>
            }

            <Toast />
        </>
    )
}

export default Route
