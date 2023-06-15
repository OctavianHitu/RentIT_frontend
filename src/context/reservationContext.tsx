import { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../axios-service";


export interface ReservationType{
    reservations:Reservation[];
    setReservations:React.Dispatch<React.SetStateAction<Reservation[]>>;
}

export interface Reservation{
    userId:string;
    ownerOfcar: string;
    carId: string;
    startDate: Date;
    endDate: Date;
    _id:string;
}

export const ReservationContext=createContext<any>({
    reservations:[],
    setReservations:()=>{},
})

export const ReservationProvideer =(props:any)=>{
    const [reservations,setReservations]=useState<Reservation[]>([]);

    async function getReservations(){
        const {data}= await getAxiosInstance().get("reservation");
        const reservationList =data;
        setReservations(reservationList);
    }
    useEffect(()=>{
        getReservations();
    },[])

    return (
        <ReservationContext.Provider value={{reservations,setReservations,getReservations}}>
            {props.children}
        </ReservationContext.Provider>
    )
}