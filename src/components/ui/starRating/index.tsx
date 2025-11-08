import { Tooltip, Rate } from 'antd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetRatingQuery } from '@/store/ratingsApi';

interface StarRatingProps {
  productId: string;
  average: number;
  userRating: number | null;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ productId, onRate }) => {
  const { isAuth } = useAppSelector(state => state.users);
  const { data, isLoading } = useGetRatingQuery(productId);

  const average = data?.average || 0;

  if (isLoading) return <Rate disabled />;

  return (
    <Tooltip title={!isAuth ? 'Войдите для оценки товара' : ''}>
      <Rate allowHalf value={average} onChange={onRate} disabled={!isAuth} />
    </Tooltip>
  );
};

export default StarRating;
