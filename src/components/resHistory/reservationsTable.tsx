import { useContext, useState } from 'react';
import './reservationsTable.scss'
import { LoginContext } from '../../context/loginContext';
import { UserType } from '../../assets/sass/global/Usertype';
import { Reservation, ReservationContext } from '../../context/reservationContext';
import { Car, CarContext } from '../../context/carContext';
import { User, UserContext } from '../../context/userContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ReservationsTableForm:React.FC=():JSX.Element =>{

    const {user}=useContext(LoginContext);
    const {reservations}=useContext(ReservationContext);
    const {cars}=useContext(CarContext)
    const {users}=useContext(UserContext)
    const navigate=useNavigate();

    interface UserResTable{
        
        startDate:Date,
        endDate:Date,
        car:Car
    }

    interface DealerResTable{
        
        startDate:Date,
        endDate:Date,
        user:User,
        car:Car
    }

    function getRes(){
        if(user?.userType===UserType.REGULAR){
            let list:UserResTable[]=[];
            reservations.forEach((res:Reservation)=>{

                if(res.userId===user.id){

                    const car:Car = cars.find((c:Car)=>{
                        return c._id===res.carId
                    })
                    const obj:UserResTable={startDate:res.startDate,endDate:res.endDate,car:car}
                    list.push(obj);

                }
                 


            })
            return list;
        }
    }

    function getRes1(){
        if(user?.userType===UserType.DEALERSHIP){

            let list:DealerResTable[]=[];
            reservations.forEach((res:Reservation)=>{
                const car:Car = cars.find((c:Car)=>{
                    return c._id==res.carId;
                })
                const usr:User=users.find((u:User)=>{
                    return res.userId===u._id;
                })
                const obj:DealerResTable={startDate:res.startDate,endDate:res.endDate,car:car,user:usr}
                list.push(obj);

            })
            return list;
        }

    }

    return (
        <div className='res-his-table-comp'>
            {user?.userType===UserType.REGULAR?(
                <div className='table-for-page-res'>


<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow className="headerTable-reshis">
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Start</TableCell>
            <TableCell align="center">End</TableCell>
            <TableCell align="center">Car</TableCell>
            <TableCell align="center">Company</TableCell>




          </TableRow>
        </TableHead>
        <TableBody>


                {getRes()?.map((row:UserResTable) => (
          
          <TableRow key={row.car._id} className="tableRow-reshis">
      
                <TableCell align="center">{row.car.brand}</TableCell>
                <TableCell align="center">{row.car.model}</TableCell>
                <TableCell align="center">{row.car.price} $</TableCell>
                <TableCell align="center">{row.car.city}</TableCell>
                <TableCell align="center">{new Date(row.startDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{new Date(row.endDate).toLocaleDateString()}</TableCell>
                <TableCell align="center"><Button onClick={()=>{navigate(`/fullModalCar/${row.car._id}`)}}>See Car</Button></TableCell>
                <TableCell align="center"><Button onClick={()=>{navigate(`/sellerPage/${row.car.owner}`)}}>See Company</Button></TableCell>

  
  
          
  
              </TableRow>
            ))}
        

        </TableBody>
      </Table>
                </TableContainer>




                </div>
            ):(

                <div className='table-for-page-res'>


<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow className="headerTable-reshis">
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Start</TableCell>
            <TableCell align="center">End</TableCell>
            <TableCell align="center">Car</TableCell>




          </TableRow>
        </TableHead>
        <TableBody>


                {getRes1()?.map((row:DealerResTable) => (
          
          <TableRow key={row.car._id} className="tableRow-reshis">
      
                <TableCell align="center">{row.user.firstName}</TableCell>
                <TableCell align="center">{row.user.lastName}</TableCell>
                <TableCell align="center">{row.user.email} </TableCell>
                <TableCell align="center">{row.user.phoneNumber}</TableCell>
                <TableCell align="center">{new Date(row.startDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{new Date(row.endDate).toLocaleDateString()}</TableCell>
                <TableCell align="center"><Button onClick={()=>{navigate(`/fullModalCar/${row.car._id}`)}}>See Car</Button></TableCell>
                
  
  
          
  
              </TableRow>
            ))}
        

        </TableBody>
      </Table>
                </TableContainer>


                </div>
            )}

        </div>
    )
}
export default ReservationsTableForm;