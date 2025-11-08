import styles from './index.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <span>@2025</span>
      </div>
    </footer>
  );
};

export default Footer;
