import { useContext } from 'react';
import { useMemo } from 'react';
import { CardContext } from '@/context/Context';
import { CardContextType } from '@/shared/types/interface';

export const useFilteredList = <T extends Record<string, any> & { id: string }>(
  items: T[]
): { data: T[] } => {
  const { searchParams } = useContext(CardContext) as CardContextType;

  const filteredArr = useMemo(() => {
    if (!items || items.length === 0) return [];

    const inputValue = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const brandFilter = searchParams.get('brand') || '';
    const sort = searchParams.get('sort') || '';
    const priceFrom = searchParams.get('price_gte') || '';
    const priceTo = searchParams.get('price_lte') || '';

    let result = [...items];

    // Фильтрация
    if (brandFilter) {
      result = result.filter(item => item.brand === brandFilter);
    }

    if (category) {
      result = result.filter(item => item.category === category);
    }

    if (inputValue) {
      const fieldsToSearch = ['title', 'description', 'brand', 'category', 'memory'] as const;
      result = result.filter(item =>
        fieldsToSearch.some(field => item[field]?.toString().toLowerCase().includes(inputValue))
      );
    }

    if (priceFrom || priceTo) {
      result = result.filter(item => {
        const price = Number(item.price);
        const from = priceFrom ? Number(priceFrom) : -Infinity;
        const to = priceTo ? Number(priceTo) : Infinity;
        return price >= from && price <= to;
      });
    }

    // Сортировка
    if (sort) {
      result.sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        return sort === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [items, searchParams]);

  return { data: filteredArr };
};

export default useFilteredList;
