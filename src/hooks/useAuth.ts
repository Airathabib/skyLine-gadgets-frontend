import { useAppSelector } from './reduxHooks';

const useAuth = () => {
  const { isAuth, role } = useAppSelector(state => state.users);
  return { isAuth, isAdmin: role === 'admin' };
};
export default useAuth;
