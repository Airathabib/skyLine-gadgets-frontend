import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';

const AppInfo = () => {
  const navigate = useNavigate();
  const returnToCard = () => navigate(-1);
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <header className={styles.Header}>
          <button className={styles.ContentInfoBack} onClick={returnToCard}>
            <Icon name="arrowBack" size={24} />
            <span>Назад </span>
          </button>
          <h1 className={styles.Title}>Магазин Электроники</h1>
          <p className={styles.Subtitle}>Современный интернет-магазин с полной функциональностью</p>
        </header>

        <section className={styles.Section}>
          <h2 className={styles.SectionTitle}>О проекте</h2>
          <p>
            Это учебный проект, реализующий полный стек веб-приложения:
            <strong> фронтенд на React + Redux Toolkit</strong> и
            <strong> бэкенд на Node.js + Express + SQLite</strong>.
          </p>
          <p>
            Приложение включает каталог товаров, корзину, избранное, систему комментариев, рейтинг,
            авторизацию (пользователь/админ) и панель администратора.
          </p>
        </section>

        <section className={styles.Section}>
          <h2 className={styles.SectionTitle}>Основные возможности</h2>
          <ul className={styles.FeaturesList}>
            <li>📋 Просмотр и фильтрация товаров по категориям, бренду и цене</li>
            <li>❤️ Добавление в избранное</li>
            <li>🛒 Управление корзиной (добавление, изменение количества, удаление)</li>
            <li>⭐ Оценка товаров и просмотр среднего рейтинга</li>
            <li>💬 Комментарии и ответы на комментарии</li>
            <li>🔐 Авторизация и регистрация</li>
            <li>🛠️ Панель администратора (управление товарами, пользователями, брендами)</li>
          </ul>
        </section>

        <section className={styles.Section}>
          <h2 className={styles.SectionTitle}>Технологии</h2>
          <div className={styles.TechGrid}>
            <div className={styles.TechCard}>
              <h3>Фронтенд</h3>
              <ul>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Vite</li>
                <li>Redux Toolkit (RTK Query)</li>
                <li>Ant Design</li>
                <li>React Router v7</li>
              </ul>
            </div>
            <div className={styles.TechCard}>
              <h3>Бэкенд</h3>
              <ul>
                <li>Node.js</li>
                <li>Express 5</li>
                <li>TypeScript</li>
                <li>SQLite (better-sqlite3)</li>
                <li>Zod (валидация)</li>
                <li>bcrypt, jsonwebtoken</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.Section}>
          <h2 className={styles.SectionTitle}>Автор</h2>
          <p>Разработано как учебный проект для демонстрации навыков fullstack-разработки.</p>
        </section>

        <footer className={styles.Footer}>
          <p>© {new Date().getFullYear()} Магазин Электроники. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
};

export default AppInfo;
