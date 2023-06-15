import { Car, CarContext } from "../../context/carContext";
import { useContext, useState } from 'react';
import { LoginContext } from "../../context/loginContext";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Mycars.scss'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getAxiosInstance from "../../axios-service";
import Footer from "../../components/footer/footer";

const MyCars:React.FC=():JSX.Element=>{

    const {cars,getCars}=useContext(CarContext)
    const {user}=useContext(LoginContext)
    const navigate=useNavigate();

    const HisCars= cars.filter((elem:Car)=>{
        return elem.owner===user?.id;
    })

    function handleDeleteCar(carId:string){
            getAxiosInstance().delete('/car/'+carId).then(()=>{
                getCars();
            })
    }

    return(
        <div className="Mycars-page">
            <div className="MyCars-table">
                <div className="table-mycars-comp">
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow className="headerTable-MyCars">
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Offer</TableCell>
            <TableCell align="center"></TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
        {HisCars.map((row:Car) => (
          
        <TableRow key={row._id} className="tableRow-mycars">
    
              <TableCell align="center">{row.brand}</TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.serialNumber}</TableCell>
              <TableCell align="center">{row.carDetails.carType}</TableCell>
              <TableCell align="center">{new Date(row.carDetails.fabricationYear).toLocaleDateString()}</TableCell>

              <TableCell align="center"><Button onClick={()=>{navigate(`/fullModalCar/${row._id}`)}}>Full Offer</Button></TableCell>
              <TableCell align="center"><Button onClick={()=>{handleDeleteCar(row._id)}}>Delete</Button></TableCell>


        

            </TableRow>
          ))}

        </TableBody>
      </Table>
                </TableContainer>
                </div>
            </div>
<div className="footer-mycars">
    <Footer/>
</div>

        </div>
    )
}

export default MyCars;