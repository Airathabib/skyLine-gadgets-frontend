import { UserType } from '@/shared/types/interface';

const getUsers = async (url: string): Promise<UserType[]> => {
  const usersResult = await fetch(url);
  const users: UserType[] = await usersResult.json();
  return users;
};
export default getUsers;
