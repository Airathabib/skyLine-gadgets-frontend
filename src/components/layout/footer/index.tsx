import styles from './index.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <p>© {new Date().getFullYear()} SkyLine Gadget. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
