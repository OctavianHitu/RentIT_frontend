import { useContext, useState } from 'react';
import './managerPage.scss'
import { User, UserContext } from '../../context/userContext';
import TableComponent from '../../components/table/tableComponent';
import { UserType } from '../../assets/sass/global/Usertype';
import TableReservationsComponent from '../../components/tableReservations/tableReservations';
import { ReservationContext } from '../../context/reservationContext';
import TableCarsComponent from '../../components/tableCars/tableCars';
import { Car, CarContext } from '../../context/carContext';
import getAxiosInstance from '../../axios-service';

const ManagerPage: React.FC=():JSX.Element =>{


    const {users,setUsers,getUsers}=useContext(UserContext);
    const {reservations}=useContext(ReservationContext)
    // const {cars}=useContext(CarContext)
    console.log(reservations)

    const regularUsers= users.filter((e:User)=>{
        return e.userType===UserType.REGULAR;
    })
    const dealerUsers= users.filter((e:User)=>{
        return e.userType===UserType.DEALERSHIP;
    })
    const [userTable,setUsertable]=useState(true);
    const [dealerTable,setDealerTable]=useState(false);
    const [resTable,setResTable]=useState(false);
    const [carsTable,setCarsTable]=useState(false);


    const [cars,setCars]=useState<Car[]>([])
    async function getAllCars() {
        const { data } = await getAxiosInstance().get("/car");
        const carList = data;
        setCars(carList);
      }

    return(
        <div className='managerPage'>
            <div className='selections-for-manager'>
                <button className='btn-for-manager-sel' onClick={()=>{setUsertable(true)
                setResTable(false)
                setCarsTable(false)
                setDealerTable(false)}}>
        USERS
                </button>
                <button className='btn-for-manager-sel' onClick={()=>{setDealerTable(true)
                setResTable(false)
                setCarsTable(false)
                setUsertable(false)
                }}>
        DEALERS
                </button>
                <button className='btn-for-manager-sel' onClick={()=>{setResTable(true)
                setDealerTable(false)
                setCarsTable(false)
                setUsertable(false)
                }}>
        RESERVATIONS
                </button>
                <button className='btn-for-manager-sel' onClick={()=>{setCarsTable(true)
                    setResTable(false)
                setDealerTable(false)
                setUsertable(false)
                getAllCars();
                }}>
        CARS
                </button>
            </div>
            <div className='tableMan'>

            {userTable?(
                <TableComponent
            userList={regularUsers}
            isUserNormal={true}
            />
            ):null}

            {dealerTable?(
                <TableComponent
                userList={dealerUsers}
                isUserNormal={false}
                />
            ):null}
            {resTable?(
                <TableReservationsComponent
                res={reservations}
                />
            ):null}
            {carsTable?(<TableCarsComponent getCars={()=>{getAllCars()}} cars={cars}/>):null}
            
            </div>
            
        </div>
    )
}

export default ManagerPage;