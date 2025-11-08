import { useMemo } from 'react';
import Card from '@/features/card';
import { Cart, Product } from '@/shared/types/interface';

interface CardListRendererProps {
  products: Product[];
  cart: Cart[];
}

const CardListRenderer: React.FC<CardListRendererProps> = ({ products, cart = [] }) => {
  const renderCards = useMemo(() => {
    if (!Array.isArray(products)) return null;

    return products.map(product => {
      if (!product.id) return null;
      const cartItem = cart.find(item => item.id === product.id);
      return (
        <Card
          key={product.id}
          {...product}
          isInCart={!!cartItem}
          cartQuantity={cartItem?.cartQuantity || 0}
        />
      );
    });
  }, [products, cart]);

  return <>{renderCards}</>;
};

export default CardListRenderer;
