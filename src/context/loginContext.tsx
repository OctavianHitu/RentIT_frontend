import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "./userContext";
import { decodeUserJwt } from "../assets/sass/global/user_decoded";
import { UserType } from "../assets/sass/global/Usertype";

export interface UserDecoded{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: UserType;
  address: string;
  companyName: string;
  description:string;
  nrSellingCars: number;
  country:string;
  city:string;
  zipcode:string;
  avatar:string;
  lang:number;
  lat:number;
  isVerified:boolean; 
  id:string;
}

export type LoginContextType={
    user:UserDecoded|null;
    setUser: React.Dispatch<React.SetStateAction<UserDecoded | null>>;
}

export type Props = { children: ReactNode };

export const LoginContext = createContext<LoginContextType>({
    user: decodeUserJwt("jwtData"),
    setUser: () => {},
  });
  
  export const LoginProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserDecoded | null>(
      decodeUserJwt("jwtData")
    );
  
    useEffect(() => {}, [user]);
    return (
      <LoginContext.Provider value={{ user, setUser }}>
        {children}
      </LoginContext.Provider>
    );
  };