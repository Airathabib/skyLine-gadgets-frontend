import { Tooltip } from 'antd';
import styles from './index.module.scss';

interface QuantityControllersProps {
  quantity: number;
  stockQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
  disableIncrease?: boolean;
}

const QuantityControllers: React.FC<QuantityControllersProps> = ({
  quantity,
  stockQuantity,
  onIncrease,
  onDecrease,
  onDelete,
  disableIncrease = false,
}) => {
  return (
    <div className={styles.CardCounter}>
      <button className={styles.CardCounterBtn} onClick={onDecrease}>
        -
      </button>
      <span className={styles.CardCounterCount}>{quantity}</span>
      <button
        className={styles.CardCounterBtn}
        onClick={onIncrease}
        disabled={disableIncrease || quantity >= stockQuantity}
      >
        +
      </button>
      <Tooltip title="Удалить из корзины">
        <button className={styles.CardBtnDelete} onClick={onDelete}>
          🗑️
        </button>
      </Tooltip>
    </div>
  );
};

export default QuantityControllers;
