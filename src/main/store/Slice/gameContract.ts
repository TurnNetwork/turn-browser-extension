import { createSlice } from '@reduxjs/toolkit'
import { setStorage, getStorage } from 'src/utils/index'

export const gameContractSlice: any = createSlice({
    name: 'gameContract',
    initialState: {
        value: getStorage('gameContractJson')
    },
    reducers: {
        setNetwork: (state, action: any): any => {
            setStorage('gameContractJson', action.payload)
            state.value = action.payload
        }
    }
})

export const { setNetwork } = gameContractSlice.actions

export default gameContractSlice.reducer