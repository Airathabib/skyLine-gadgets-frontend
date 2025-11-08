import { useContext } from 'react';
import { Modal } from 'antd';
import { CardContext } from '@/context/Context';
import LoginForm from '@/features/loginForm';
import { CardContextType } from '@/shared/types/interface';
import styles from './index.module.scss';

const ModalWindow: React.FC = () => {
  const { setOpenModal, openModal } = useContext(CardContext) as CardContextType;

  return (
    <div className={styles.ModalWindow}>
      <Modal onCancel={() => setOpenModal(false)} open={openModal} footer={null} destroyOnHidden>
        <LoginForm />
      </Modal>
    </div>
  );
};

export default ModalWindow;
