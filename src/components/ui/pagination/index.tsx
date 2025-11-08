import React, { useContext } from 'react';
import { CardContext } from '@/context/Context';
import { CardContextType } from '@/shared/types/interface';
import styles from './index.module.scss';

interface PaginationProps {
  totalCards: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCards }) => {
  const { currentPage, cardsPerPage, paginate } = useContext(CardContext) as CardContextType;

  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const visiblePages = 2;
  const maxButtons = 6;

  const generatePages = () => {
    const pages: (number | '...')[] = [];

    pages.push(1);

    if (currentPage > visiblePages + 2) {
      pages.push('...');
    }

    const start = Math.max(1, currentPage - visiblePages);
    const end = Math.min(totalPages, currentPage + visiblePages);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (pages.length > maxButtons) {
      const optimizedPages: (number | '...')[] = [];

      optimizedPages.push(1);

      if (currentPage > 2) {
        optimizedPages.push('...');
      }

      optimizedPages.push(currentPage - 1);
      optimizedPages.push(currentPage);
      optimizedPages.push(currentPage + 1);

      if (currentPage < totalPages - 1) {
        optimizedPages.push('...');
      }

      optimizedPages.push(totalPages);

      return [...new Set(optimizedPages)].slice(0, maxButtons);
    }

    if (totalPages !== 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className={styles.Pagination}>
      <ul className={styles.PaginationList}>
        {pages.map((item, index) => {
          const key = typeof item === 'number' ? item : `ellipsis-${index}`;

          if (typeof item === 'number') {
            return (
              <li key={key} className={styles.PaginationItem}>
                <button
                  disabled={currentPage === item}
                  className={
                    currentPage === item ? styles.PaginationLinkActive : styles.PaginationLink
                  }
                  onClick={() => paginate(item)}
                >
                  {item}
                </button>
              </li>
            );
          } else {
            return (
              <li key={key} className={`${styles.PaginationItem} ${styles.disabled}`}>
                <span className={styles.Ellipsis}>...</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Pagination;
