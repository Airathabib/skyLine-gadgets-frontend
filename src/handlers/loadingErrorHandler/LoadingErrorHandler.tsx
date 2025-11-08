import styles from './LoadingErrorHandler.module.scss';

const LoadingErrorHandler: React.FC<{
  loading: boolean;
  error: string | null;
}> = ({ loading, error }) => {
  if (loading) return <h3 className={styles.loading}>Загрузка...</h3>;
  if (error)
    return (
      <h3 className={styles.error}>
        Произошла ошибка при ответе от сервера: {error}
      </h3>
    );
  return null;
};

export default LoadingErrorHandler;
