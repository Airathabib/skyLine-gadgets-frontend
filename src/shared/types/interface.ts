export interface CardContextType {
  openNav: boolean;
  handleOpenNav: () => void;
  handleCloseNav: () => void;
  category: string;
  resetCategory: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  cardsPerPage: number;
  lastCardIndex: number;
  firstCardIndex: number;
  paginate: (pageNumber: React.SetStateAction<number>) => void;
  searchParams: URLSearchParams;
  handleChangeFilters: (key: string, value: string | null) => void;
  formatDate: (dateString: string | number | Date) => string;
  isFormValid: boolean;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  isTouched: boolean;
  setIsTouched: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormInteraction: () => void;
  validateNumberInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openRegistration: boolean;
  setOpenRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}

// Базовый товар (без количества)
export type ProductBase = {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  photo: string;
  rating: number;
  memory: string;
  accum: string;
};

// Товар в каталоге → остаток на складе
export type Product = ProductBase & {
  quantity: number;
};

// Товар в корзине → два количества
export type CartItem = ProductBase & {
  stock_quantity: number;
  cart_quantity: number;
};

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userComment: string;
  date: string;
  productId: string;
  parentId: number | null;
  replies?: Comment[];
}

export interface CreateCommentDto {
  userName: string;
  userComment: string;
  date: string;
  productId: string;
  userId: number;
  parentId?: number;
}

export interface UpdateCommentDto {
  userComment: string;
}

export type CreateCommentData = Omit<Comment, 'id'>;

export type UserRole = 'user' | 'admin';

export interface UserType {
  id: number;
  login: string;
  password: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface AuthState {
  user: UserType | null;
  isAuth: boolean;
  role: 'user' | 'admin' | null;
  loading: boolean;
  error: string | null;
}

export type IconName =
  | 'heart'
  | 'cart'
  | 'user'
  | 'burger'
  | 'leftBtn'
  | 'rightBtn'
  | 'arrowUp'
  | 'arrowDown'
  | 'cardHeart'
  | 'arrowBack'
  | 'cardCart';

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

export interface ErrorType {
  message: string;
}
