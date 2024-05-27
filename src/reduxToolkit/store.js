import { configureStore } from '@reduxjs/toolkit'
// import SidebarMenu from './slice/SidebarMenuSlice'
import ThemeSlice from './ThemeSlice'
export const store = configureStore({
    reducer: {

        Theme: ThemeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
})