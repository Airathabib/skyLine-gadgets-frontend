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

export type FilterableProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  memory: string;
  accum: string;
  photo: string;
  rating: number;
};

export type Product = FilterableProduct & {
  stockQuantity: number;
  quantity: number;
  addedToCart: boolean;
};

export type Cart = Product & {
  cartQuantity: number;
};

export type Comments = {
  id: number;
  userName: string;
  userComment: string;
  date: string;
  productId: string;
  user_id: number | string;
  parent_id?: number;
  replies?: Comments[];
};

export type CreateCommentData = Omit<Comments, 'id'>;

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
