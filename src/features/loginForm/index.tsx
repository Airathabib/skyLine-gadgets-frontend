import { Button, Form, Input, Spin, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { CardContext } from '@/context/Context';
import { userRegistration, login, logout } from '@/features/loginForm/usersSlise';
import { fetchCart } from '@/features/cart/cartSlice';
import { CardContextType, UserType } from '@/shared/types/interface';

import styles from './index.module.scss';

const LoginForm: React.FC = () => {
  const { isAuth, user, loading, error } = useAppSelector(state => state.users);
  const { openRegistration, setOpenRegistration } = useContext(CardContext) as CardContextType;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [openRegistration]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      try {
        dispatch({
          type: 'auth/login/fulfilled',
          payload: JSON.parse(savedUser),
        });
      } catch (e) {
        console.warn('Ошибка восстановления из localStorage');
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (error === 'Пользователь с таким логином или email уже существует') {
      setOpenRegistration(false);
    }
  }, [error, setOpenRegistration, form]);

  const handleSubmit = async (values: UserType) => {
    if (values.email) {
      const result = await dispatch(userRegistration(values));
      if (userRegistration.fulfilled.match(result)) {
        dispatch(fetchCart());

        localStorage.setItem('user', JSON.stringify(result.payload));
        localStorage.setItem('role', result.payload.role || 'user');
        localStorage.setItem('isAuth', 'true');
        setOpenRegistration(false);
      }
    } else {
      const result = await dispatch(login(values));
      if (login.fulfilled.match(result)) {
        localStorage.setItem('user', JSON.stringify(result.payload));
        localStorage.setItem('role', result.payload.role || 'user');
        localStorage.setItem('isAuth', 'true');
        setOpenRegistration(false);
        dispatch(fetchCart());
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  };

  const validateEmail = (_: any, value: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || emailRegex.test(value)) return Promise.resolve();
    return Promise.reject('Неверный формат email');
  };

  if (isAuth) {
    return (
      <div className={styles.UserWrapper}>
        <h3 className={styles.success}>Привет, {user?.login}! Вы вошли в аккаунт</h3>
        <Button type="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.LoginForm}>
      <Spin spinning={loading} tip="Загрузка...">
        <Typography.Text className={styles.error}>{error}</Typography.Text>
        <Form form={form} onFinish={handleSubmit}>
          <h2>{openRegistration ? 'Регистрация' : 'Вход'}</h2>

          <Form.Item
            name="login"
            rules={[{ required: true, min: 3, message: 'Логин не менее 3 символов' }]}
          >
            <Input placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, min: 6, message: 'Пароль не менее 6 символов' }]}
          >
            <Input.Password placeholder="Пароль" autoComplete="off" />
          </Form.Item>

          {openRegistration && (
            <>
              <Form.Item
                name="email"
                rules={[
                  { required: true, type: 'email', message: '' },
                  { validator: validateEmail },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item name="phone">
                <Input placeholder="Телефон" />
              </Form.Item>
            </>
          )}

          <div className={styles.ButtonContainer}>
            <Button type="primary" htmlType="submit">
              {openRegistration ? 'Зарегистрироваться' : 'Войти'}
            </Button>

            {openRegistration ? (
              <Button
                onClick={() => {
                  setOpenRegistration(false);
                  form.resetFields();
                }}
              >
                Войти
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpenRegistration(true);
                  form.resetFields();
                }}
              >
                Создать аккаунт
              </Button>
            )}
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default LoginForm;
