import create from 'zustand';
import { persist } from 'zustand/middleware';
import { u } from '@trpc/react-query';

interface userInfoInterface {
  username: string | null;
  email: string | null;
  password: string | null;
}

interface UserInfoStoreInterface extends userInfoInterface {
  changeUserInfo: (props: userInfoInterface) => void;
}

export const useUserInfo = create<UserInfoStoreInterface>()(
  persist(
    (set) => ({
      username: null,
      email: null,
      password: null,
      changeUserInfo: (params: userInfoInterface) => {
        set(( state ) => ({ 
          username: params.username ? params.username : state.username,
          email: params.email ? params.email : state.email,
          password: params.password ? params.password : state.password,
        }))
      }
    }),
  )
)