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
            Это учебный fullstack-проект с использованием:
            <strong> фронтенда на React + Redux Toolkit</strong> и
            <strong> бэкенда на Node.js + Express + PostgreSQL</strong>.
          </p>
          <p>
            Приложение реализует каталог товаров, корзину с контролем остатков, избранное, систему
            комментариев с ответами, рейтинг с дробным средним, а также авторизацию
            (пользователь/админ) и панель управления.
          </p>
        </section>

        <section className={styles.Section}>
          <h2 className={styles.SectionTitle}>Основные возможности</h2>
          <ul className={styles.FeaturesList}>
            <li>📋 Просмотр и фильтрация товаров по категориям, бренду и цене</li>
            <li>❤️ Добавление в избранное</li>
            <li>🛒 Управление корзиной с учётом остатков на складе</li>
            <li>⭐ Оценка товаров (1–5) и отображение среднего рейтинга</li>
            <li>💬 Комментарии и вложенные ответы на комментарии</li>
            <li>🔐 Авторизация и регистрация</li>
            <li>🛠️ Панель администратора для управления товарами и пользователями</li>
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
                <li>PostgreSQL (pg)</li>
                <li>Zod (валидация входных данных)</li>
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
