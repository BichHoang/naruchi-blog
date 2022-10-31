import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryCurrentSlug: '',
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCategoryCurrentSlug: (state, action) => {
      state.categoryCurrentSlug = action.payload;
    },
  },
})

export const { setCategoryCurrentSlug } = commonSlice.actions

export default commonSlice.reducer
