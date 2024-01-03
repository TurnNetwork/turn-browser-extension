import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { setExtensionStorage, getExtensionStorage } from 'src/utils/index'


export const thunkPw:any = createAsyncThunk('PW', async () => {
    const data = await getExtensionStorage('PW') || ''
    return data
})

export const pwSlice: any = createSlice({
    name: 'PW',
    initialState: {
        value: ''
    },
    reducers: {
        setPW: (state, action: any): any => {
            setExtensionStorage('PW', action.payload)
            state.value = action.payload
        }
    },
    extraReducers: {
        // @ts-ignore
        [thunkPw.fulfilled]: (state, actions) => {
            state.value = actions.payload || []
        }
    },
})

export const { setPW } = pwSlice.actions

export default pwSlice.reducer