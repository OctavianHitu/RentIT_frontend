import { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../axios-service";
import { UserType } from "../assets/sass/global/Usertype";


export interface UsersType{
    users:User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export interface User{
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
    license:string; 
    _id:string;
}
export const UserContext = createContext<any>({
    users: [],
    setUsers: () => {},
    
  });


export const UserProvider =(props:any)=>{
    const [users,setUsers]=useState<User[]>([]);

    async function getUsers(){
        const {data} =await getAxiosInstance().get("/user");
        const userList =data;
        
        setUsers(userList);
    }
    

    useEffect(() => {
        getUsers();
      }, []);

      return (
        <UserContext.Provider value={{ users, setUsers,getUsers }}>
          {props.children}
        </UserContext.Provider>
      );
  }
