import { configureStore } from '@reduxjs/toolkit'
import walletSlice from './Slice/wallet'
import networkSlice from './Slice/network'
import gameContractSlice from './Slice/gameContract'
import tableSlice from './Slice/table'
import searchSlice from './Slice/search'
import pwSlice from './Slice/pw'


export default configureStore({
    reducer: {
        walletSlice,
        networkSlice,
        gameContractSlice,
        tableSlice,
        searchSlice,
        pwSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }
})