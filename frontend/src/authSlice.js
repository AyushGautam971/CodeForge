
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

// Helper to extract error message from Axios error
const getErrorMessage = (error) => {
  console.log("axiosClient loaded");
  if (error.response?.data?.message) {
    return error.response.data.message; // your backend's `message` field
  }
  if (error.response?.data?.error) {
    return error.response.data.error;   // alternative field
  }
  return error.message || 'Something went wrong';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/register', userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/user/check');
      return data.user;
    } catch (error) {
      // If 401, we treat as not authenticated but no error message needed
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post('/user/logout');
      return null;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    // optional: clear error manually
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        alert("Invalid credential or weak password")
        state.isAuthenticated = false;
        state.user = null;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        state.error = null; // clear any previous error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        // If we explicitly passed null (401), don't set an error message
        state.error = action.payload !== null ? action.payload : null;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient'

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//     const response =  await axiosClient.post('/user/register', userData);
//     return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check');
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         return rejectWithValue(null); // Special case for no session
//       }
//       return rejectWithValue(error);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout');
//       return null;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register User Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Login User Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Check Auth Cases
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Logout User Cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   }
// });

// export default authSlice.reducer;
