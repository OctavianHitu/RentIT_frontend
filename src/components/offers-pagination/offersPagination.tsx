import { Car } from "../../context/carContext";
import CarCard from "../carCard/carCard";
import './offersPagination.scss'

export interface OffersPaginationComponent{
    posts:Car[];
}
const OffersPagination=(props:OffersPaginationComponent):JSX.Element=>{
return(
    <div className="offers-pagination">
        {props.posts.map((e)=>{
               return  <CarCard key={e.serialNumber} car={e}/>
            })}
    </div>
)

}
export default OffersPagination;