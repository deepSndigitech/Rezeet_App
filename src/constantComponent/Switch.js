import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const Switch = ({ dark,  }) => {
    const [isday, setisday] = useState(true);


    const animation = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animation.value }]
        }
    })

    // useEffect(() => {
    //     setisday(mode)
    // }, [0])

    return (
        <TouchableOpacity
            style={{
                width: 80,
                height: 40,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#FFF',

                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                elevation: 5,
            }} activeOpacity={0.8} onPress={() => {
                if (animation.value == 0) {
                    animation.value = withTiming(8, { duration: 500 })
                    setisday(false)
                }
                else {
                    animation.value = withTiming(0, { duration: 500 })
                    setisday(true)
                }
                dark()

            }}>
            {isday ? null :
                <Text style={{ marginLeft: 4, fontWeight: '700', color: '#FFF', fontSize: 14 }}>Dark</Text>
            }
            <Animated.View
                style={[{ width: 30, height: 30, borderRadius: 20 }, animatedStyle]}>
                <Image source={isday ? require('../Images/rezeetImg/light.png') : require('../Images/rezeetImg/dark.png')} style={{ height: '100%', width: '100%', borderWidth: 1, borderRadius: 20, borderColor: isday ? 'transparent' : '#FFF' }} />
            </Animated.View>
            {isday &&
                <Text style={{ marginLeft: 2, fontWeight: '700', color: '#FFF', fontSize: 14 }}>Light</Text>
            }
        </TouchableOpacity>
    )
}

export default Switch