import { configureStore, createSlice } from '@reduxjs/toolkit'

let locker = createSlice({
  name: 'locker',
  initialState: [],
  reducers: {
    // 보관함 담기
    addLocker(state, action) {
      state.push(action.payload);
    }
  }
})

export let { addLocker} = locker.actions ;

export default configureStore({
  reducer: {
    locker: locker.reducer
  }
}) 