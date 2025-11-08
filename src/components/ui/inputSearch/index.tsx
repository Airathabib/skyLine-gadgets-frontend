import { useContext } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { CardContext } from '@/context/Context';
import { CardContextType } from '@/shared/types/interface';

const InputSearch: React.FC = () => {
  const { handleChangeFilters, searchParams } = useContext(CardContext) as CardContextType;
  const debouncedSearch = debounce(e => handleChangeFilters('q', e.target.value), 100);
  return (
    <Input.Search
      placeholder="Поиск"
      allowClear
      onChange={debouncedSearch}
      value={searchParams.get('q') || ''}
    />
  );
};

export default InputSearch;
