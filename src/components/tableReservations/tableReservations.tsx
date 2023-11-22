import { Reservation, ReservationContext } from "../../context/reservationContext";
import { FC, useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Car, CarContext } from "../../context/carContext";
import { User, UserContext } from "../../context/userContext";
import { Button } from "@mui/material";
import axios from "axios";
import getAxiosInstance from "../../axios-service";

export interface Tablereservations{
    res:Reservation[];
}

const TableReservationsComponent =(props:Tablereservations):JSX.Element=>{

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      const {cars}=useContext(CarContext);
      const {users}=useContext(UserContext);
      const {getReservations}=useContext(ReservationContext);


      function deleteRes(res:string){
        getAxiosInstance().delete("/reservation/"+res).then(()=>{getReservations()})
      }


    return(
        <div>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="headerTable">
           
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Start date</TableCell>
            <TableCell align="center">End date</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Buyer</TableCell>
            <TableCell align="center">Seller</TableCell>  
            <TableCell align="center"></TableCell>  


          </TableRow>
        </TableHead>
        <TableBody>
          {props.res.map((row:Reservation) => {

            const user1:User=users.find((u:User)=> u._id===row.userId)
            console.log(user1)
            const car1:Car=cars.find((c:Car)=> c._id===row.carId);
            console.log(car1)

            const  user2=users.find((u:User)=> u._id===car1.owner)


            return(
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="center">{car1.brand}</TableCell>
              <TableCell align="center">{car1.model}</TableCell>
              <TableCell align="center">{car1.price}</TableCell>
              <TableCell align="center">{new Date(row.startDate).toLocaleDateString()}</TableCell>
              <TableCell align="center">{new Date(row.endDate).toLocaleDateString()}</TableCell>
              
              <TableCell align="center">{car1.city}</TableCell>
              <TableCell align="center">{user1.email}</TableCell>
              <TableCell align="center">{user2.email}</TableCell>
              <TableCell align="center"><Button onClick={()=>{deleteRes(row._id)}}>Delete</Button></TableCell>
              

             
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>
            
    </div>   
    )
}

export default TableReservationsComponent;
