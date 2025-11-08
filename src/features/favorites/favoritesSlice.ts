import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { URL } from '@/shared/API/api';
import { Product } from '@/shared/types/interface';

interface FavoritesState {
  favorites: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/favorites`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Не удалось загрузить избранное');
      return (await response.json()) as Product[];
    } catch (error) {
      return rejectWithValue('Ошибка загрузки избранного');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
