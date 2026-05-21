export const formatErrorMessage = (error: string | null): string => {
  if (!error) return '';

  const lower = error.toLowerCase();

  // Сетевые проблемы
  if (
    lower.includes('network') ||
    lower.includes('fetch') ||
    lower.includes('connection') ||
    lower.includes('cors')
  ) {
    return 'Нет подключения к интернету. Проверьте сеть и попробуйте снова.';
  }

  // Таймауты и отмены
  if (lower.includes('timeout') || lower.includes('abort') || lower.includes('deadline')) {
    return 'Сервер не отвечает. Попробуйте обновить страницу.';
  }

  // HTTP-коды и типичные ответы API
  if (lower.includes('401') || lower.includes('unauthorized')) {
    return 'Требуется авторизация. Войдите в аккаунт.';
  }
  if (lower.includes('403') || lower.includes('forbidden')) {
    return 'Доступ запрещён.';
  }
  if (lower.includes('404') || lower.includes('not found')) {
    return 'Товары не найдены. Попробуйте изменить фильтры или категорию.';
  }
  if (
    lower.includes('429') ||
    lower.includes('rate limit') ||
    lower.includes('too many requests')
  ) {
    return 'Слишком много запросов. Подождите немного и попробуйте снова.';
  }
  if (lower.includes('500') || lower.includes('internal') || lower.includes('server error')) {
    return 'Временные проблемы на сервере. Мы уже работаем над этим.';
  }
  if (lower.includes('validation') || lower.includes('bad request') || lower.includes('400')) {
    return 'Некорректные параметры запроса. Попробуйте позже.';
  }

  // Если сообщение слишком длинное или содержит технический мусор
  if (error.length > 120) {
    return 'Произошла ошибка при загрузке данных. Попробуйте обновить страницу.';
  }

  // Фолбэк: возвращаем исходное сообщение, если оно уже короткое и понятное
  return error;
};
