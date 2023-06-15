import { FC, useContext, useEffect, useState } from 'react';
import './tableComponent.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../context/userContext';
import { Box, Button, Modal } from '@mui/material';
import getAxiosInstance from '../../axios-service';


export interface TableComponent{
    userList:any;
    isUserNormal:Boolean;

}

const TableComponent =(props:TableComponent):JSX.Element=>{
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
    console.log(props.userList);
    const{getUsers}=useContext(UserContext);

    const [license,setLicense]=useState("");
    const [modal,setModal]=useState(false);
    const handleClose = () => setModal(false);
    return(
        <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="headerTable">
            {props.isUserNormal?(
            <TableCell align="center">First Name</TableCell>
              
            ):null}
            {props.isUserNormal?(
            <TableCell align="center">Last Name</TableCell>  
              
              ):null}
              {!props.isUserNormal?(
            <TableCell align="center">Company Name</TableCell>
              
              ):null}
            <TableCell align="center">User Type</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">address</TableCell>
            <TableCell align="center">License</TableCell>  

            {props.isUserNormal?(
            <TableCell align='center'>Verified</TableCell>
              
              ):null}
            <TableCell align="center"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.userList.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.isUserNormal?(
                <TableCell component="th" scope="row" align="center">
                {row.firstName}
              </TableCell>
              ):null}
              {props.isUserNormal?(
              <TableCell align="center">{row.lastName}</TableCell>
                
                ):null}
                {!props.isUserNormal?(
              <TableCell align="center">{row.companyName}</TableCell>
                
                ):null}
              
              <TableCell align="center">{row.userType}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">{String(row.isVerified)}</TableCell>

              {props.isUserNormal?(
                <TableCell align="center">
              <Button
                onClick={()=>{
                    setLicense(row.license);
                    setModal(true);
                    }}
                >License</Button>
              </TableCell>
              ):null}
              

              <TableCell align="center">
                {row.isVerified?(
                    <Button
                onClick={()=>{
                    getAxiosInstance()
                    .put("/user/" + row._id, {"isVerified":false}).then(()=>{getUsers()});
                }}
                >Decline!</Button>
                ):(
                    <Button
                onClick={()=>{
                    getAxiosInstance()
                    .put("/user/" + row._id, {"isVerified":true}).then(()=>{getUsers()});
                }}
                >Confirm!</Button>
                )}
                
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            {modal?(
                <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box  sx={style}>

                <img style={{maxHeight:'600px',maxWidth:'600px'}} className='image-modal-verif-manager' src={license}/>

                </Box>
                </Modal>
            ):null

            }
    </div>
    )
}

export default TableComponent;