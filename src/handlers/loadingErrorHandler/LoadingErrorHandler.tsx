import { formatErrorMessage } from '@/shared/utils/formatError';
import styles from './LoadingErrorHandler.module.scss';

const LoadingErrorHandler: React.FC<{
  loading: boolean;
  error: string | null;
}> = ({ loading, error }) => {
  if (loading) return <h3 className={styles.loading}>Загрузка...</h3>;

  if (error) {
    const userMessage = formatErrorMessage(error);
    return <h3 className={styles.error}>{userMessage}</h3>;
  }

  return null;
};

export default LoadingErrorHandler;
