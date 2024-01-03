import { createSlice } from '@reduxjs/toolkit'
import { setExtensionStorage, getExtensionStorage } from 'src/utils/index'
import {WALLETNAME} from '../../../../extension-config'

export const walletSlice: any = createSlice({
    name: 'wallet',
    initialState: {
        value: getExtensionStorage(WALLETNAME) || []
    },
    reducers: {
        setWallet: (state, action: any): any => {
            setExtensionStorage(WALLETNAME, action.payload)
            state.value = action.payload
        }
    }
})

export const { setWallet } = walletSlice.actions

export default walletSlice.reducer