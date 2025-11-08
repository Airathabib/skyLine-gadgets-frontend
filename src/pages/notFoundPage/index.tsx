import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.NotFound}>
      <h2 className={styles.NotFoundTitle}> Страница не найдена</h2>
      <Link className={styles.NotFoundLink} to="/">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
