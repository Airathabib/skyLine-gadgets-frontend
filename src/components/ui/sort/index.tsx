import React, { useContext } from 'react';
import { CardContext } from '@/context/Context';
import { CardContextType } from '@/shared/types/interface';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';

type SortProps = {};

type SortState = 'asc' | 'desc';

const Sort: React.FC<SortProps> = () => {
  const { searchParams, handleChangeFilters } = useContext(CardContext) as CardContextType;
  const currentSort: SortState = (searchParams.get('sort') as SortState) || '';

  const setSort = (newSort: string | null) => {
    handleChangeFilters('sort', newSort);
  };
  return (
    <div className={styles.Sort}>
      <div className={styles.SortContainer}>
        <span className={styles.SortTitle}>Сортировка по цене :</span>
        <div className={styles.SortOptions}>
          <button
            className={currentSort === 'asc' ? styles.SortValueActive : styles.SortValue}
            onClick={() => setSort('asc')}
            aria-pressed={currentSort === 'asc'}
          >
            По возрастанию
            <Icon name="arrowUp" color="currentColor" size={24} />{' '}
          </button>
          <button
            className={currentSort === 'desc' ? styles.SortValueActive : styles.SortValue}
            onClick={() => setSort('desc')}
            aria-pressed={currentSort === 'desc'}
          >
            По убыванию
            <Icon name="arrowDown" color="currentColor" size={24} />{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
