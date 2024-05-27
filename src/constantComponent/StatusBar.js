import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const StatusBarApp = () => {
    const theme = useSelector(state => state.Theme.isDarkMode)

  return (
    <StatusBar translucent backgroundColor="transparent" barStyle={theme ? "dark-content" : "light-content"} />

  )
}

export default StatusBarApp