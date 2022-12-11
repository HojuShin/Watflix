import { createSlice } from '@reduxjs/toolkit';

let locker = createSlice({
  name: 'locker',
  initialState: [],
  reducers: {
    // 보관함 담기
    addLocker(state, action) {
      state.push(action.payload);
    },
    // 삭제
    deleteLocker(state, action) {
      // locker 보관함에서 해당 title을 가진 객체를 삭제 
      let locketTitle = state.find(e => e.title === action.payload.title)
      for(var i = 0; i < state.length; i++){ 
        if (state[i].title == locketTitle.title) { 
          state.splice(i, 1); 
          // 배열 길이 변화
          i--; 
        }
      }
    },
  }
})

export let { addLocker, deleteLocker } = locker.actions ;

export default locker.reducer ;