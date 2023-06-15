import { useContext } from "react";
import { Favourites, FavouritesContext } from '../../context/favouriteContext';
import './favPage.scss'
import Footer from "../../components/footer/footer";
import { LoginContext } from "../../context/loginContext";
import { Car, CarContext } from "../../context/carContext";
import CarCard from "../../components/carCard/carCard";

const FavouritePage:React.FC=():JSX.Element =>{

  const {favourites,getFavourites}=useContext(FavouritesContext);
  const { user } = useContext(LoginContext);
  const {cars}=useContext(CarContext)

  const listFav:Favourites[]|undefined=favourites.filter((elem:Favourites)=>{
    return elem.favOwner===user?.id
  })

  const carsFav:Car[]=cars.filter((elem:Car)=>{

    return listFav?.find(e => e.carId===elem._id)

  })
  console.log(carsFav)

    return(
        <div className="fav-Page">
            <div className="fav-page-cont">
                <div className="fav-badge">
                    FAVOURITES
                </div>
                {carsFav?.map((e:Car)=>{
               return  <CarCard key={e.serialNumber} car={e}/>
            })}

            </div>
            <div className="fav-footer-pg">
                <Footer/>
            </div>
        </div>
    )
}
export default FavouritePage;