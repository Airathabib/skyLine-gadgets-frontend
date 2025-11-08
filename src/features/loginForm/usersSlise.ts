import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_URL } from '@/shared/API/api';
import { AppDispatch } from '../../store/index';
import { clearFavorites } from '../favorites/favoritesSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { favoritesApi } from '@/store/favoritesApi';
import { AuthState, ErrorType, UserType } from '@/shared/types/interface';

const initialState: AuthState = {
  user: null,
  isAuth: false,
  role: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<UserType, UserType, { rejectValue: ErrorType }>(
  'auth/login',
  async (userForm, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${USER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: userForm.login,
          password: userForm.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка входа');
      }
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('token', data.token);
      dispatch(favoritesApi.util.invalidateTags(['Favorite']));
      return data.user;
    } catch (error: unknown) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Не удалось войти',
      });
    }
  }
);

export const userRegistration = createAsyncThunk<
  UserType,
  UserType,
  { dispatch: AppDispatch; rejectValue: ErrorType }
>('auth/userRegistration', async (userForm, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch(`${USER_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userForm),
    });
    if (!response.ok) {
      const errorData = await response.json();
      // ← передаём ошибку из бэкенда
      return rejectWithValue({ message: errorData.error });
    }

    const newUser = await response.json();
    // Автоматически логинимся после регистрации!!!
    const loginResponse = await fetch(`${USER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: userForm.login,
        password: userForm.password,
      }),
    });

    if (!loginResponse.ok) {
      throw new Error('Не удалось войти после регистрации');
    }

    const loginData = await loginResponse.json();
    localStorage.setItem('user', JSON.stringify(loginData.user));
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('token', loginData.token); // ← сохраняем токен!

    return loginData.user;
  } catch (error: unknown) {
    return rejectWithValue({
      message: error instanceof Error ? error.message : 'Ошибка регистрации',
    });
  }
});

//
export const restoreAuth = createAsyncThunk('auth/restore', () => {
  const userStr = localStorage.getItem('user');
  const isAuth = localStorage.getItem('isAuth') === 'true';

  if (userStr && isAuth) {
    return { user: JSON.parse(userStr), isAuth };
  }
  throw new Error('No auth data');
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  localStorage.clear();
  dispatch(clearCart());
  dispatch(clearFavorites());
  dispatch(reset());
  dispatch(favoritesApi.util.resetApiState());
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(userRegistration.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.role = action.payload.role || 'user';
        state.error = null;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.role = action.payload.role || 'user';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : null;
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = action.payload.isAuth;
        state.role = action.payload.user.role || 'user';
      })
      .addCase(logout.fulfilled, state => {
        Object.assign(state, initialState);
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
