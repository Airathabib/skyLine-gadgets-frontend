import { useEffect } from 'react';
import { useGetFavoritesQuery } from '@/store/favoritesApi';

const useFavoritesList = () => {
  const { data: favorites = [], error, isLoading, refetch } = useGetFavoritesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    favorites,
    error: error ? 'Ошибка загрузки' : null,
    loading: isLoading,
  };
};

export default useFavoritesList;
