import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk('users/login', async (payload) => {
  try {
    const response = await axios.post("http://localhost:3000/sessions", payload)
    return response.data
  } catch (error) {
    return error.message
  }
})

export const checkLogin = createAsyncThunk('user/checkLogin', async() => {
  try {
    const response = await axios.get('http://localhost:3000/sessions/logged_in')
    return response.data
  } catch(error) {
    return error.message
  }
})


export const register = createAsyncThunk('user/register', async(payload) => {
  try {
    const response = await axios.post('http://localhost:3000/registrations', (payload))
    return response.data
  } catch(error) {
    return error.message
  }
})


const initialState = {
  user: {},
  logged_in: false,
  loading: false,
  wrongData: '',
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
        if(action.payload.status === 'created') {
          state.logged_in = true;
          state.user = (action.payload.user);
          state.logged_in = (action.payload.logged_in)
          state.wrongData = ''
          console.log(action.payload)
        } else if (action.payload.status === 401 ) {
          state.wrongData = 'Wrong password or email'
        }
      })

      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(checkLogin.fulfilled, (state, action) => {
        state.logged_in = action.payload.logged_in
        state.loading = false
      })

      .addCase(checkLogin.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })

      .addCase(register.pending, state => {
        state.loading = true
      })

      .addCase(register.fulfilled, (state, action) => {
        if(action.payload.status === 'created') {
          state.logged_in = true;
          state.user = (action.payload.user);
          state.logged_in = (action.payload.logged_in)
          state.wrongData = ''
          state.loading = false
        } else if (action.payload.status === 500 ) {
          state.wrongData = 'Wrong password or email'
          state.loading = false
        }
      })

      .addCase(register.rejected, (state, {payload}) => {
        state.error = payload
        state.loading = false
      })
  },
})

export default userSlice.reducer;