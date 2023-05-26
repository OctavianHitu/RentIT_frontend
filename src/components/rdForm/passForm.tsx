import { Alert, Button, Dialog, DialogActions, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import './passForm.scss'
import { UserContext } from "../../context/userContext";
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";

const PasswordForm: React.FC=():JSX.Element =>{

    const passwordRegex = RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      );
      const {user}= useContext(LoginContext);
      const [showPasswordAlert, setShowPasswordAlert] = useState(false);

    const [pass,setPass]=useState(
        {
            password:""
        }
    )
    const [confirmPass,setConfirmPass]=useState(
        {
            ConfirmPassword:""
        }
    )
    async function submit(){
        setDialog(false);

        if(pass.password===confirmPass.ConfirmPassword){
             getAxiosInstance()
             .put("/user/" + user?.id, JSON.stringify(pass)).then(()=>{setSucces(true)})

        }else
        {
            setSubmit1(true);
        }
    }

    const [dialog,setDialog]=useState(false);

    const handleCloseDialog = () => {
        setDialog(false);
      };

      const openDial = () => {
        setDialog(true);
      };

      const [submit1,setSubmit1]=useState(false)
      const [succes,setSucces]=useState(false)

      const handleClose=(e:any,reason?:string)=>{
        if(reason==='clickaway'){
            return
        }
        setSubmit1(false)
        setSucces(false);
    }
    return(
        <div className="passwordForm">
            <div className="form-name">
                Change password
            </div>
            <div className="formP">
                
                <div className="line">
                    <div>
                    New password:

                    </div>
                <TextField type="password"   variant="outlined"
                onChange={(e)=>{
                    if (passwordRegex.test(e.target.value)) {
                    pass.password=e.target.value;
                    setPass(pass);
                    setShowPasswordAlert(false);
                }else{
                    setShowPasswordAlert(true);
                    }

                }}/>

                </div>
                <div className="line">
                    <div>
                    Confirm new password:
                    </div>
                <TextField type="password"  variant="outlined"
                
                onChange={(e)=>{
                    confirmPass.ConfirmPassword=e.target.value;
                    setConfirmPass(confirmPass);
                }}/>

                </div>

            </div>
        <div>
        <button onClick={openDial} className="confirm-c">Submit Changes!</button>
        </div>
        <Dialog
            open={dialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to chaneg password?"}
            </DialogTitle>
            <DialogActions>
          <Button onClick={submit} variant="contained">Yes</Button>
          <Button onClick={handleCloseDialog}  variant="contained">
            No
          </Button>
        </DialogActions>
            </Dialog>
            <div className="alert-pass">
            {showPasswordAlert ? (
          <Alert severity="error">
            Password must contain 1 capital letter, 1 special letter , 1 number
            and at least 8 character!
          </Alert>
        ) : null}
            </div>
            {submit1?(
    <Snackbar
            anchorOrigin={ {vertical:'top', horizontal:'center' }}
            open={submit1}
            onClose={handleClose}
            autoHideDuration={6000}
          >
             <Alert onClose={handleClose} severity="error" sx={{ width: '500px' }}>
    Password don't match!
  </Alert>
            </Snackbar>
):null}
{succes?(
    <Snackbar
            anchorOrigin={ {vertical:'top', horizontal:'center' }}
            open={succes}
            onClose={handleClose}
            autoHideDuration={6000}
          >
             <Alert onClose={handleClose} severity="success" sx={{ width: '500px' }}>
    Password chanegs succesfully!
  </Alert>
            </Snackbar>
):null}
        </div>
    )
}

export default PasswordForm;