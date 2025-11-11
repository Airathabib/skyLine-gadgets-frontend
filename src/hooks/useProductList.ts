import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CardContext } from '@/context/Context';
import { CardContextType, Product } from '@/shared/types/interface';
import { useGetProductsQuery } from '@/store/productApi';

const useProductList = (): {
  error: string | null;
  isLoading: boolean;
  products: Product[];
} => {
  const { searchParams } = useContext(CardContext) as CardContextType;

  const {
    isLoading,
    isError,
    error,
    data: products = [],
  } = useGetProductsQuery(searchParams.toString(), {
    skip: !searchParams,
    refetchOnMountOrArgChange: true,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isError && error) {
      if ('message' in error && error.message) {
        setErrorMessage(error.message);
      } else if ('error' in error && error.error) {
        setErrorMessage(error.error);
      } else if ('data' in error && error.data) {
        setErrorMessage(String(error.data));
      } else {
        setErrorMessage('Не удалось загрузить информацию, попробуйте обновить страницу');
      }
    } else {
      setErrorMessage(null);
    }
  }, [isError, error]);

  return {
    error: errorMessage,
    isLoading,
    products: products || [],
  };
};

export default useProductList;
