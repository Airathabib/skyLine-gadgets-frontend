const extractMessage = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return value.message;
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, any>;
    // Проверяем частые поля с сообщением об ошибке
    return (
      obj.message ||
      obj.error ||
      obj.errorMessage ||
      obj.detail ||
      obj.statusText ||
      obj.data?.error ||
      obj.data?.message ||
      JSON.stringify(obj)
    );
  }
  return String(value);
};

export const formatErrorMessage = (error: unknown): string => {
  if (!error) return '';

  // 1. Извлекаем "сырое" сообщение из любого формата
  const rawMessage = extractMessage(error).toLowerCase();

  // 2. Сетевые проблемы
  if (
    rawMessage.includes('network') ||
    rawMessage.includes('failed to fetch') ||
    rawMessage.includes('connection') ||
    rawMessage.includes('cors') ||
    rawMessage.includes('load failed')
  ) {
    return 'Нет подключения к серверу. Проверьте интернет и попробуйте снова.';
  }

  // 3. Таймауты
  if (
    rawMessage.includes('timeout') ||
    rawMessage.includes('abort') ||
    rawMessage.includes('deadline')
  ) {
    return 'Сервер не отвечает. Попробуйте обновить страницу.';
  }

  // 4. Авторизация
  if (
    rawMessage.includes('401') ||
    rawMessage.includes('unauthorized') ||
    rawMessage.includes('token')
  ) {
    return 'Требуется авторизация. Войдите в аккаунт.';
  }

  // 5. Доступ запрещён
  if (rawMessage.includes('403') || rawMessage.includes('forbidden')) {
    return 'Доступ запрещён.';
  }

  // 6. Не найдено
  if (rawMessage.includes('404') || rawMessage.includes('not found')) {
    return 'Товары не найдены. Попробуйте изменить фильтры или категорию.';
  }

  // 7. Слишком много запросов
  if (
    rawMessage.includes('429') ||
    rawMessage.includes('rate limit') ||
    rawMessage.includes('too many requests')
  ) {
    return 'Слишком много запросов. Подождите немного и попробуйте снова.';
  }

  // 8. Ошибка сервера
  if (
    rawMessage.includes('500') ||
    rawMessage.includes('internal') ||
    rawMessage.includes('server error')
  ) {
    return 'Временные проблемы на сервере. Мы уже работаем над этим.';
  }

  // 9. Ошибка валидации
  if (
    rawMessage.includes('validation') ||
    rawMessage.includes('bad request') ||
    rawMessage.includes('400')
  ) {
    return 'Некорректные параметры запроса. Попробуйте позже.';
  }

  // 10. Если сообщение слишком длинное или техническое — возвращаем общий текст
  const original = extractMessage(error);
  if (original.length > 120 || original.includes('{') || original.includes('[object')) {
    return 'Произошла ошибка при загрузке данных. Попробуйте обновить страницу.';
  }

  // 11. Фолбэк: возвращаем оригинальное сообщение, если оно короткое и понятное
  return original;
};
