import { useContext } from 'react';
import { Spin } from 'antd';
import useProductList from '@/hooks/useProductList';
import useFilteredList from '@/hooks/useFilteredList';
import { CardContext } from '@/context/Context';
import { useAppSelector } from '@/hooks/reduxHooks';
import { CardContextType } from '@/shared/types/interface';
import Sort from '@/components/ui/sort';
import LoadingErrorHandler from '@/handlers/loadingErrorHandler/LoadingErrorHandler';
import CategoryTitle from '@/components/categoryTitle';
import CardListRenderer from '@/handlers/cardListRender/CardListRender';
import LeftBtn from '@/components/ui/buttons/LeftBtn';
import Pagination from '@/components/ui/pagination';
import RightBtn from '@/components/ui/buttons/RightBtn';

import styles from './index.module.scss';

const CardList: React.FC = () => {
  const { category, currentPage, firstCardIndex, lastCardIndex, paginate } = useContext(
    CardContext
  ) as CardContextType;

  const { error, isLoading, products } = useProductList();
  const cart = useAppSelector(state => state.cart.cart);

  const { data: filteredArr } = useFilteredList(products || []);

  const currentCards = filteredArr?.slice(firstCardIndex, lastCardIndex) || [];

  if (isLoading) return <Spin tip="Загрузка..." fullscreen />;

  return (
    <div className={styles.CardList}>
      {filteredArr.length > 0 && <Sort />}
      <LoadingErrorHandler loading={isLoading} error={error} />
      {!isLoading && !error && (
        <>
          {filteredArr.length > 0 && (
            <CategoryTitle category={category} filteredArr={filteredArr} />
          )}
          {filteredArr.length === 0 && (
            <div className={styles.error}>
              Нет товаров для отображения{' '}
              {category ? `категории ${category}` : 'выбранной категории'}
            </div>
          )}

          <div className={styles.CardListWrapper}>
            {filteredArr.length > 0 && <CardListRenderer products={currentCards} cart={cart} />}
          </div>
          {filteredArr.length > 0 && (
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
        </>
      )}
    </div>
  );
};

export default CardList;
