import { createSlice } from '@reduxjs/toolkit'
import { setStorage, getStorage } from 'src/utils/index'

export const tableSlice: any = createSlice({
    name: 'table',
    initialState: {
        value: getStorage('tableJson')
    },
    reducers: {
        setTable: (state, action: any): any => {
            setStorage('tableJson', action.payload)
            state.value = action.payload
        }
    }
})

export const { setTable } = tableSlice.actions

export default tableSlice.reducer