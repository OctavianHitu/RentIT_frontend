import './support.scss'
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import Rentit from '../../components/rentit/rentit';
import { useContext, useState } from 'react';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { LoginContext } from '../../context/loginContext';
import getAxiosInstance from '../../axios-service';

const SupportPage:React.FC =():JSX.Element=>{

    const navigate=useNavigate();
    const [desc,setDesc]=useState("");

    const {user}=useContext(LoginContext)

    const [messageSent,setMEssageSent]=useState(false);
    const [errroMes,setErrMEs]=useState(false);
    const handleClose = (e: any, reason?: string) => {
        if (reason === "clickaway") {
          return;
        }
        setMEssageSent(false);
        setErrMEs(false);
      };

    function submitSupport(){

        const emailObj={
            to:"rentit.web.company@gmail.com",
            subject:`Customer Support-${user?.email?user.email:"unknown customer"}`,
            text:`${desc}`
          }
        getAxiosInstance().post("email",JSON.stringify(emailObj)).then(()=>{setMEssageSent(true);}).catch(()=>{setErrMEs(true)})
    }

    return(
    <div className='supportP'>
        <div className='supportP-page'>
            <div className='sup-title'>
                <span className='rnt-it-sup'><Rentit fontSize={40}/></span> Customer support
            </div>
            <div className='asist-text'>
            Please use the box below to describe the problem you are experiencing and submit your message to RentIT. Our dedicated support team will review your request and provide assistance as soon as possible. Thank you for reaching out to us.
            </div>
            <div className='writing-sup'>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    rows={8}
                    onChange={(e: any) => {
                        setDesc(e.target.value);
                    }}
                    />
                <div className='btn-sup-sub'>
                    <button onClick={submitSupport} className='btn-sup-sub-st'>Submit</button>
                </div>
            </div>
        </div>
        <div className='footer-supportP'>
            <Footer/>
        </div>
        {messageSent ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={messageSent}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "500px" }}>
            Your message has been sent to RentIT!
          </Alert>
        </Snackbar>
      ) : null}
      {errroMes ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={errroMes}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "500px" }}>
            Your message has been sent to RentIT!
          </Alert>
        </Snackbar>
      ) : null}
    </div>)
}
export default SupportPage;