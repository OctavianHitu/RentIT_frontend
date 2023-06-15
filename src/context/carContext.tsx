import { createContext, useEffect, useState } from "react";
import { Connections } from "../assets/sass/global/enums/Connect";
import { Fuel } from "../assets/sass/global/enums/Fuel";
import { Headlights } from "../assets/sass/global/enums/Headlights";
import { TractionType } from "../assets/sass/global/enums/Traction";
import getAxiosInstance from "../axios-service";
import { CarBody } from "../assets/sass/global/enums/Cartype";


export interface CarType{
    cars:Car[];
    setCars:React.Dispatch<React.SetStateAction<Car[]>>;
}

export interface Car{
    serialNumber:string;
    brand:string;
    price:number;
    model:string;
    images:string;
    description:string;
    carDetails:CarDetails;
    carFeatures:CarFeatures;
    owner:string;
    _id:string;
    city:string,
    country:string,
    address:string
}
export interface CarDetails{
    carType:CarBody;
    fabricationYear:Date;
    doorNumber:number;
    consumption:number;
    fuel:Fuel;
    milageOnElectric:number;
    color:string;
    numberOfSeats:number;
    trunkCapacity:number;
    traction:TractionType;
    power:number;
    engineCapacity:number;
}
export interface CarFeatures{
    connectivity:Connections;
    heatedSeats:boolean;
    gearboxIsManual:boolean;
    disabilityCar:boolean;
    ac: boolean;
    hasAirbags:boolean;
    safetyrating:number;
    smokingVehicle:boolean;
    isofixForBaby:boolean;
    headlights:Headlights;
}

export const CarContext= createContext<any>({
    cars:[],
    setCars:()=>{},
});

export const CarProvider =(props:any)=>{
    const [cars,setCars]=useState<Car[]>([]);
    
    async function getCars() {
        const { data } = await getAxiosInstance().get("/car");
        const carList = data;
        setCars(carList);
      }
    useEffect(() => {
        getCars();
      }, []);

      return(
        <CarContext.Provider value={{cars,setCars,getCars}}>
            {props.children}
        </CarContext.Provider>
      )


}