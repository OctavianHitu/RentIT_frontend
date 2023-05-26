import { Car } from "../../context/carContext";
import './carCard.scss'
import carpng from '../../assets/images/cr.jpg'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import FullModalCar from "../FullCarModal/FullCarModal";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";

interface CarCardComponent{
    car:Car;
}

const CarCard: React.FC<CarCardComponent> = (props): JSX.Element => {

    const navigate = useNavigate();
    const {user}=useContext(LoginContext)

    return(
    <div className="carCard">
        <div className="carPhoto">
            {props.car.images?(<img className="carph" src={props.car.images}/>)
            :(
                <img className="carph" src={carpng}/>
            )}
            
        </div>
        <div className="car-info-card">
            <div className="car-info-brand-model-price">
                <div>
                    {props.car.brand} {props.car.model} 
                </div>
                <div>
                    {props.car.price} $ 
                </div>
            </div>
            <div className="car-infos">
                <div className="little-info">
                    <div className="little-info-line">
                        <CalendarTodayIcon/>
                          {new Date(props.car.carDetails.fabricationYear).toLocaleDateString()}
                    </div>
                    <div className="little-info-line">
                       <DirectionsCarIcon/>
                       {props.car.carDetails.power }  HP
                    </div>
                    <div className="little-info-line">
                       <LocalGasStationIcon/>
                       <span>{props.car.carDetails.fuel}</span>
                       <span>{props.car.carDetails.consumption} l/100km</span>
                    </div>
                    <div className="little-info-line">
                        <SettingsIcon/>
                        {props.car.carFeatures.gearboxIsManual?(
                            <div>Manual gearbox</div>
                        ):(
                            <div>Automatic gearbox</div>
                        )}
                       
                    </div>

                </div>
                <div className="info-btns">
                    <button className="btn-offer-full" onClick={()=>{
                        
                        navigate(`/fullModalCar/${props.car._id}`)
                        }} >FULL OFFER</button>
                         {user?.id!=""?(
                    <button className="btn-offer-reserve">RESERVE</button>):null}
                    
                </div>
                
            </div>

        </div>
   
    </div>
    )
}

export default CarCard;