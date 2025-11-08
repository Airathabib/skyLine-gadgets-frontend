import { Product } from '@/shared/types/interface';
import styles from './index.module.scss';

type CategoryTitleProps = { category: string; filteredArr: Product[] };

const CategoryTitle: React.FC<CategoryTitleProps> = ({
  category,
  filteredArr,
}: {
  category: string;
  filteredArr: Product[];
}) => {
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'phone':
        return `Смартфоны, количество: ${filteredArr.length}`;
      case 'smartwatch':
        return `Смартчасы, количество: ${filteredArr.length}`;
      case 'airpod':
        return `Наушники, количество: ${filteredArr.length}`;
      default:
        return '';
    }
  };

  return <h3 className={styles.ProductTitle}>{getCategoryTitle(category)}</h3>;
};

export default CategoryTitle;
