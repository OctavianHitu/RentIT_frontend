import './reservationModal.scss'
import { Car } from "../../context/carContext";
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { LoginContext } from '../../context/loginContext';
import { useContext, useEffect, useState } from 'react';
import { Reservation, ReservationContext } from '../../context/reservationContext';
import {DateRangePicker, SingleInputDateRangeField} from '@mui/x-date-pickers-pro'
import getAxiosInstance from '../../axios-service';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
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
        getAxiosInstance().post("/reservation",res).then(props.onClose() ,getReservations());
        
    }


    function getAllReservedDates(){
        const specifiedDates:Date[] = [];
        let carRes:Reservation[]=reservations.filter((e:Reservation)=>{
            return e.carId===props.car._id;
        })
        carRes.forEach((e:Reservation)=>{ 
            const currentDate = new Date(e.startDate);
            while (currentDate <= new Date(e.endDate)) {
                specifiedDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        })
        return specifiedDates;
    }


    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const handleDateChange = (date:any) => {
      setSelectedDate(date);
    };
  
    //@ts-ignore
    const tileContent = ({ date }) => {
      if (getAllReservedDates().some((specifiedDate) => date.toDateString() === specifiedDate.toDateString())) {
        return <div className="red-dot" />;
      }
      return null;
    };

    
    console.log(getAllReservedDates())

    return(
        <div className="full-res-modal" >
            <div className="res-modal-container">
                <div className='top-modal-reservation'>
                    Reserve {props.car.brand} {props.car.model}
                    <button className='btn-away-res-modal' onClick={()=>{props.onClose()}}><CloseIcon fontSize='large'/></button>
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

                                    if(e.carId=== props.car._id){
                                        
                                        if(new Date(e.startDate)<=new Date(newValue[0])&&new Date(newValue[0])<=new Date(e.endDate)){
                                            setError(true)
                                            helper=true
                                        }else
                                        if(new Date(e.startDate)<=new Date(newValue[1])&&new Date(newValue[1])<=new Date(e.endDate)){
                                            setError(true)
                                            helper=true

                                        } else
                                        if(new Date(e.startDate)>=new Date(newValue[0])&&new Date(newValue[1])>=new Date(e.endDate)){
                                            setError(true)
                                            helper=true

                                        }
                                            
                                            
                                    }
                                    
                                    
                                    
                                })
                                if(!helper){
                                    setError(false);
                                    setRes({...res,startDate:new Date(newValue[0]),endDate:new Date(newValue[1])})
                                    
                                }

                            }
                            
                            }/>
                        </div>
                        {error?(
                            <Alert severity="error" >Look at the calendar and see the free dates!</Alert>
                        ):(
                            <Alert severity="success">Your dates are good!</Alert>
                        )}
                        <button disabled={error} className='modal-reserve-button' onClick={handleReservation}>Reserve</button>
                        
                    
                    </div>
                    <div className='modal-res-calendar'>
                        {/* <DateCalendar disabled/> */}
                        <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
        tileDisabled={()=>true}
      />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ReservationModal;