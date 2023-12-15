import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('users/login', async () => {
    try {
        const response = await axios.post("http://localhost:3000/sessions", {
            user: {
              email: 'aelkholy690@gmail.com',
              password: 'AAAeee'
            }
          }, 
          { withCredentials: true }
          )

          return response.data
    } catch(error) {
        return error.message
    }
}) 

const initialState = {
  user: {},
  logged_in: false,
  loading: false,
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
        state.loading = true;
    })

    .addCase(login.fulfilled, (state, action) => {
      state.logged_in = true;
      state.user = (action.payload.user);
      state.logged_in = (action.payload.logged_in)
    })

    .addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
})

export default userSlice.reducer;