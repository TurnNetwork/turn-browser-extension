import { createSlice } from '@reduxjs/toolkit'
import { getExtensionStorage,setExtensionStorage } from 'src/utils/index'
import {NET_WORK_N} from '../../../../extension-config'


export const networkSlice: any = createSlice({
    name: 'network',
    initialState: {
        value: getExtensionStorage(NET_WORK_N)
    },
    reducers: {
        setNetwork: (state, action: any): any => {
            // setStorage('networkJson', action.payload)
            setExtensionStorage(NET_WORK_N, action.payload)
            state.value = action.payload
        }
    }
})

export const { setNetwork } = networkSlice.actions

export default networkSlice.reducer