import { Car } from "../../context/carContext";
import "./carCard.scss";
import carpng from "../../assets/images/cr.jpg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import ReservationModal from "../reservationModal/reservationModal";
import { UserType } from "../../assets/sass/global/Usertype";
import { ReservationContext } from "../../context/reservationContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Favourites, FavouritesContext } from "../../context/favouriteContext";
import getAxiosInstance from "../../axios-service";
interface CarCardComponent {
  car: Car;
}

const CarCard: React.FC<CarCardComponent> = (props): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);

  const [resModal, setresModal] = useState(false);

  const {favourites,getFavourites}=useContext(FavouritesContext);

  const [isFav,setIsFav]=useState(false);

  const [favObj,setFavObj]=useState({
    carId:props.car._id,
    favOwner:user?.id
  })


  const foundFav:Favourites|undefined=favourites.find((elem:Favourites)=>{

    return elem.favOwner===user?.id&&elem.carId===props.car._id
    
  })


  function deleteFavourite(){
    getAxiosInstance().delete('favourite/'+foundFav?._id).then(()=>{getFavourites()})
  }

  function addFavourite(){
    getAxiosInstance().post('favourite',JSON.stringify(favObj)).then(()=>{getFavourites()})

  }
  

  return (
    <div className="carCard">
      <div className="carPhoto">
        {props.car.images ? (
          <img className="carph" src={props.car.images} />
        ) : (
          <img className="carph" src={carpng} />
        )}
      </div>
      <div className="car-info-card">
        <div className="car-info-brand-model-price">
          <div>
            {props.car.brand} {props.car.model}
          </div>
          <div>{props.car.price} $</div>
        </div>
        <div className="car-infos">
          <div className="little-info">
            <div className="little-info-line">
              <CalendarTodayIcon />
              {new Date(
                props.car.carDetails.fabricationYear
              ).toLocaleDateString()}
            </div>
            <div className="little-info-line">
              <DirectionsCarIcon />
              {props.car.carDetails.power} HP
            </div>
            <div className="little-info-line">
              <LocalGasStationIcon />
              <span>{props.car.carDetails.fuel}</span>
              <span>{props.car.carDetails.consumption} l/100km</span>
            </div>
            <div className="little-info-line">
              <SettingsIcon />
              {props.car.carFeatures.gearboxIsManual ? (
                <div>Manual gearbox</div>
              ) : (
                <div>Automatic gearbox</div>
              )}
            </div>
          </div>
          <div className="info-btns">
            {user?.userType === UserType.REGULAR&&foundFav?.favOwner!=undefined&&foundFav.carId!=undefined?(
                
                <button onClick={deleteFavourite} className="fav-btn-car-card">
                    <FavoriteIcon fontSize="large" color="error"/>
                </button>
            ):(
                <button onClick={addFavourite} className="fav-btn-car-card">
                    <FavoriteBorderIcon fontSize="large" color="error"/>
                </button>
            )}
            <button
              className="btn-offer-full"
              onClick={() => {
                navigate(`/fullModalCar/${props.car._id}`);
              }}
            >
              FULL OFFER
            </button>
            {user?.id != "" && user?.userType === UserType.REGULAR ? (
              <button
                className="btn-offer-reserve"
                onClick={() => {
                  setresModal(true);
                }}
              >
                RESERVE
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {resModal ? (
        <ReservationModal
          car={props.car}
          onClose={() => {
            setresModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default CarCard;
