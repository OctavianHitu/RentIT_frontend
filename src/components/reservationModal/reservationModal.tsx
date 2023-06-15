import './reservationModal.scss'
import { Car } from "../../context/carContext";
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { LoginContext } from '../../context/loginContext';
import { useContext, useState } from 'react';
import { Reservation, ReservationContext } from '../../context/reservationContext';
import {DateRangePicker, SingleInputDateRangeField} from '@mui/x-date-pickers-pro'
import getAxiosInstance from '../../axios-service';
// import DatePicker from 'react-datepicker'
interface ReservationModalComponent{
    car:Car;
    onClose:any;
}

const ReservationModal: React.FC<ReservationModalComponent>=(props):JSX.Element=>{
    const {user}=useContext(LoginContext);
    const {reservations,getReservations}=useContext(ReservationContext);

    const [error,setError]=useState(true);

    const [res,setRes]=useState({

        userId:user?.id,
        ownerOfcar: props.car.owner,
        carId: props.car._id,
        startDate: new Date(),
        endDate: new Date(),
    })

    function handleReservation(){
        getAxiosInstance().post("/reservation",res).then(props.onClose());
        
    }



    return(
        <div className="full-res-modal">
            <div className="res-modal-container">
                <div className='top-modal-reservation'>
                    Reserve {props.car.brand} {props.car.model}
                </div>
                <div className='bottom-modal-reservation'>
                    <div className='date-modal-pickers'>
                        <div>
                            Pick interval for your reservation.
                        </div>
                        <div className='pickers-for-res'>
                        
                        <DateRangePicker disablePast   onChange={(newValue:any) =>
                            
                            {
                                if(reservations.length===0){
                                            setError(false);
                                            setRes({...res,startDate:new Date(newValue[0]),endDate:new Date(newValue[1])})                    
                                }
                                let helper:boolean=false;

                                reservations.forEach((e:Reservation)=>{
                                    console.log(e);

                                    if(e.carId=== props.car._id){
                                        
                                        if(new Date(e.startDate)<=new Date(newValue[0])&&new Date(newValue[0])<=new Date(e.endDate)){
                                            setError(true)
                                            console.log("NU")
                                            helper=true
                                        }else
                                        if(new Date(e.startDate)<=new Date(newValue[1])&&new Date(newValue[1])<=new Date(e.endDate)){
                                            setError(true)
                                            console.log("NU")
                                            helper=true

                                        } else
                                        if(new Date(e.startDate)>=new Date(newValue[0])&&new Date(newValue[1])>=new Date(e.endDate)){
                                            setError(true)
                                            console.log("NU")
                                            helper=true

                                        }
                                            
                                            
                                    }
                                    
                                    
                                    
                                })
                                console.log(helper)
                                if(!helper){
                                    setError(false);
                                    setRes({...res,startDate:new Date(newValue[0]),endDate:new Date(newValue[1])})
                                    
                                }

                            }
                            
                            }/>
                        </div>
                        {error?(
                            <div>NU ESTE OK</div>
                        ):null}
                        <button disabled={error} className='modal-reserve-button' onClick={handleReservation}>Reserve</button>
                        
                    
                    </div>
                    <div className='modal-res-calendar'>
                        <DateCalendar disabled/>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ReservationModal;