import React from 'react'
import Routes from './src/Routes/Routes'
import { MenuProvider } from 'react-native-popup-menu';
import { Provider,  } from 'react-redux';
import { store } from './src/reduxToolkit/store';


const App = () => {

  return (
    <Provider store={store}>
      <MenuProvider>
        <Routes />
      </MenuProvider>

    </Provider>
  )
}
export default App

