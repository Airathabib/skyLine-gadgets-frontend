import React, { createContext, SetStateAction, useState } from 'react';

import { CardContextType } from '@/shared/types/interface';
import { useSearchParams } from 'react-router-dom';

export const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(4);
  const [isInputActive] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const handleChangeFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(key) === value || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleFormInteraction = () => {
    setIsTouched(true);
    setOpenNav(false);
  };

  const resetCategory = () => {
    const newParams = new URLSearchParams();

    const keys = ['category', 'q', 'sort', 'brand', 'price_gte', 'price_lte'];

    keys.forEach(key => newParams.delete(key));
    setSearchParams(newParams);
    setOpenNav(false);
  };

  const handleOpenNav = () => setOpenNav(true);

  const handleCloseNav = () => {
    if (!isInputActive) {
      setOpenNav(false);
    }
  };

  const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    const key = e.key;
    const keyCode = e.keyCode || e.which;
    const inputValue = input.value;

    if (
      (key >= '0' && key <= '9') ||
      keyCode === 8 || // backspace
      keyCode === 46 || // delete
      (keyCode >= 37 && keyCode <= 40)
    ) {
      return true;
    }

    const isValid = /^\d*$/.test(inputValue);
    if (!isValid) {
      input.value = inputValue.replace(/[^\d]/g, '');
    }
    e.preventDefault();
  };

  const formatDate = (dateString?: string | number | Date): string => {
    if (dateString === undefined || dateString === null) {
      return '—';
    }

    let date;

    try {
      date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (error) {
      console.warn;
      error;
    }

    if (typeof dateString === 'string') {
      const [datePart, timePart] = dateString.split(', ');
      if (datePart && timePart) {
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        date = new Date(year, month - 1, day, hours, minutes, seconds);

        if (!isNaN(date.getTime())) {
          return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      }
    }

    console.error(`Недействительная дата: ${dateString}`);
    return 'Недоступна';
  };

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  return (
    <CardContext.Provider
      value={{
        openNav,
        handleOpenNav,
        handleCloseNav,
        category: searchParams.get('category') || '',
        resetCategory,
        currentPage,
        setCurrentPage,
        cardsPerPage,
        lastCardIndex,
        firstCardIndex,
        paginate,
        searchParams,
        handleChangeFilters,
        validateNumberInput,
        formatDate,
        isFormValid,
        setIsFormValid,
        isTouched,
        setIsTouched,
        handleFormInteraction,
        openModal,
        setOpenModal,
        openRegistration,
        setOpenRegistration,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
