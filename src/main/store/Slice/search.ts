import { createSlice } from '@reduxjs/toolkit'
import { setStorage, getStorage } from 'src/utils/index'

export const searchSlice: any = createSlice({
    name: 'search',
    initialState: {
        value: getStorage('searchJson') || []
    },
    reducers: {
        setSearch: (state, action: any): any => {
            let list = action.payload || []
            if( list?.length >=16){
                list = list.slice(list.length-15,list.length)
            }
            setStorage('searchJson', list)
            state.value = list
        }
    }
})

export const { setSearch } = searchSlice.actions

export default searchSlice.reducer