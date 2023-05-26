
import { useContext } from 'react';
import CarCard from '../../components/carCard/carCard';
import './offers.scss'
import { CarContext } from '../../context/carContext';

const OffersPage:React.FC = ():JSX.Element =>{

    const {cars,setCars}=useContext(CarContext);



    return(
        <div className='offers-page'>
            {cars.map((e)=>{
               return  <CarCard key={e.serialNumber} car={e}/>
            })}
          

        </div>
    )
}
export default OffersPage;