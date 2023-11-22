import { Car, CarContext } from "../../context/carContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User, UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getAxiosInstance from "../../axios-service";


export interface TableCars{
    cars:Car[];
    getCars:any;
}

const TableCarsComponent=(props:TableCars):JSX.Element=>{
    const {users}=useContext(UserContext);
    const navigate=useNavigate();
  

    return(

        <div>

<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="headerTable">
           
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell align="center">WIN</TableCell>  
            <TableCell align="center"></TableCell>  


          </TableRow>
        </TableHead>
        <TableBody>
          {props.cars.map((row:Car) => {

            const user1:User=users.find((u:User)=> u._id===row.owner)




            return(
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="center">{row.brand}</TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{user1.email}</TableCell>
              <TableCell align="center">{row.serialNumber}</TableCell>
              <TableCell align="center">
                {row.isVerified?(
                    <Button
                onClick={()=>{
                    getAxiosInstance()
                    .put("/car/" + row._id, {"isVerified":false}).then(()=>{props.getCars()});
                }}
                >Decline!</Button>
                ):(
                    <Button
                onClick={()=>{
                    getAxiosInstance()
                    .put("/car/" + row._id, {"isVerified":true}).then(()=>{props.getCars()});
                }}
                >Confirm!</Button>
                )}
                
                </TableCell>

             
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    )
}

export default TableCarsComponent;