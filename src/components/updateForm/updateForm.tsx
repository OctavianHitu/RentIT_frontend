import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import './updateForm.scss'
import { UserContext } from "../../context/userContext";
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";
import { UserType } from "../../assets/sass/global/Usertype";

const UpdateForm: React.FC=(): JSX.Element =>{

    const phoneRegex=RegExp(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/) 
    const emailregex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const {user}= useContext(LoginContext);

    const [all,setAll]=useState({
        phoneNumber:'',
        avatar:"",
        email:"",
        description:""
    })
    const [alertPh,setAlertPh] =useState(false);
    const [emailAlert,setEmailAlert] =useState(false);

     const convertBase64 = (file:File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        
    }; 

    function Submit(){


        if(all.phoneNumber===''&&user?.phoneNumber){
            all.phoneNumber=user?.phoneNumber;
            setAll(all);
        }

        if(all.avatar===""&&user?.avatar){
            all.avatar=user?.avatar;
            setAll(all);
        }
        if(all.email===""&&user?.email){
            all.email=user?.email;
            setAll(all);
        }
        if(all.description===""&&user?.description){
            all.description=user?.description;
            setAll(all);
        }


        getAxiosInstance()
        .put("/user/" + user?.id, JSON.stringify(all))


        setDialog(false);

    }

    const [dialog,setDialog]=useState(false);

    const handleCloseDialog = () => {
        setDialog(false);
      };

      const openDial = () => {
        setDialog(true);
      };
    return(
        <div className="updateForm">
            <div className="form-name">
            Update Account
            </div>
            <div className="formU">
            <div className="line">
                <div>
                    Telephone:
                {alertPh?(<div className='inc'>Incorrect!</div>):null}
                </div>
                <TextField id="outlined-basic" onChange={(e:any)=>{
                if(phoneRegex.test(e.target.value))
                {
                    all.phoneNumber=e.target.value;
                    setAll(all);
                    setAlertPh(false);
                }else{
                    setAlertPh(true);
                }
                
            }}/>
            </div>
            <div className="line">
                <div>
                Email:
                {emailAlert?(<div className='inc'>Incorrect!</div>):null}
               
                </div>
                 <TextField   variant="outlined"onChange={(e:any)=>{
                    if(emailregex.test(e.target.value)){
                        all.email=e.target.value;
                        setAll(all);
                        setEmailAlert(false);
                        if(e.target.value===""){
                            setEmailAlert(false);
                        }
                        
                    }else{
                        if(e.target.value===""){
                            setEmailAlert(false);
                        }
                        setEmailAlert(true);
                    }
                all.email=e.target.value;
                setAll(all);
            }} />
            </div>
            {user?.userType===UserType.DEALERSHIP?(
        <div className="line">
            <div>Description:
            </div>
            <div>
            <TextField
          id="outlined-multiline-static"
          multiline
          rows={6}
          onChange={(e)=>{
            all.description=e.target.value;
            setAll(all);
          }}
          
        />
                
                
                </div>
            

        </div>

        ):null}
            <div className='line'>
                Avatar photo:
            <input className='fileInput' id='fileInput'  type='file' onChange={
            async (event:any)=>{const base64 = await convertBase64(event.target.files[0]);
            all.avatar=String(base64);
            setAll(all);}}/>
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
          {"Are you sure you want to update info?"}
            </DialogTitle>
            <DialogActions>
          <Button onClick={Submit} variant="contained">Yes</Button>
          <Button onClick={handleCloseDialog}  variant="contained">
            No
          </Button>
        </DialogActions>
            </Dialog>

        </div>
    )
}

export default UpdateForm; 