import { useContext } from 'react';
import { Alert, Spin } from 'antd';
import { CardContext } from '@/context/Context';
import useFilteredList from '@/hooks/useFilteredList';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFavoritesQuery } from '@/store/favoritesApi';
import { CardContextType } from '@/shared/types/interface';
import Sort from '@/components/ui/sort';
import LoadingErrorHandler from '@/handlers/loadingErrorHandler/LoadingErrorHandler';
import CategoryTitle from '@/components/categoryTitle';
import CardListRenderer from '@/handlers/cardListRender/CardListRender';
import LeftBtn from '@/components/ui/buttons/LeftBtn';
import RightBtn from '@/components/ui/buttons/RightBtn';
import Pagination from '@/components/ui/pagination';

import styles from './index.module.scss';

const Favorites: React.FC = () => {
  const { category, currentPage, firstCardIndex, lastCardIndex, paginate, cardsPerPage } =
    useContext(CardContext) as CardContextType;

  const { isAuth } = useAppSelector(state => state.users);

  const { data: favorites = [], isLoading, error } = useGetFavoritesQuery();
  const cart = useAppSelector(state => state.cart.cart);

 
  const getErrorMessage = (err: any): string | null => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    if ('status' in err) return `Ошибка ${err.status}`;
    if ('data' in err && typeof err.data === 'string') return err.data;
    if ('message' in err) return err.message;
    return 'Неизвестная ошибка';
  };

  const errorMessage = getErrorMessage(error);

  const { data: filteredArr } = useFilteredList(favorites);
  const currentCards = filteredArr.slice(firstCardIndex, lastCardIndex);
  const totalPages = Math.ceil(favorites.length / cardsPerPage);
  if (isLoading) {
    return <Spin tip="Загрузка избранного..." fullscreen />;
  }

  if (!isAuth) {
    return (
      <div className={styles.Favorites}>
        <h2 className={styles.FavoritesTitle}>Избранное</h2>
        <Alert message="Войдите в аккаунт, чтобы видеть избранное" type="info" showIcon />
      </div>
    );
  }

  return (
    <div className={styles.Favorites}>
      {filteredArr.length > 0 && <Sort />}
      <LoadingErrorHandler loading={isLoading} error={errorMessage} />
      {!isLoading && !error && currentCards.length > 0 && (
        <CategoryTitle category={category} filteredArr={filteredArr} />
      )}
      {!isLoading && !error && Array.isArray(filteredArr) && filteredArr.length === 0 && (
        <div className={styles.NotFavorites}>Нет избранных товаров для отображения</div>
      )}

      <Spin spinning={isLoading} tip="Загрузка...">
        <div className={styles.FavoritesListWrapper}>
          {!isLoading && !error && <CardListRenderer products={currentCards} cart={cart} />}
        </div>
      </Spin>
      {totalPages > 1 && (
        <div className={styles.PaginationWrapper}>
          <button
            className={styles.PaginationBtn}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <LeftBtn />
          </button>
          <Pagination totalCards={filteredArr.length} />
          <button
            className={styles.PaginationBtn}
            disabled={filteredArr.length <= lastCardIndex}
            onClick={() => paginate(currentPage + 1)}
          >
            <RightBtn />
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
