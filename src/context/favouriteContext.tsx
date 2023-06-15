import { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../axios-service";

export interface Favourites{
    carId:string;
    favOwner:string;
    _id:string;
}

export interface FavouritesType{
    favourites:Favourites[];
    setFavourites:React.Dispatch<React.SetStateAction<Favourites[]>>;
}

export const FavouritesContext=createContext<any>({
    favourites:[],
    setFavourites:()=>[],
})

export const FavouritesProvider=(props:any)=>{

    const [favourites,setFavourites]=useState<Favourites[]>([]);
    async function getFavourites(){
        const {data}=await getAxiosInstance().get("favourite");
        const favList=data;
        setFavourites(favList);
    }
    useEffect(()=>{
        getFavourites();
    },[])

    return(
        <FavouritesContext.Provider value={{favourites,setFavourites,getFavourites}}>
            {props.children}
        </FavouritesContext.Provider>
    )
}