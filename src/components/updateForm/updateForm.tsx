import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import './updateForm.scss'
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";
import { UserType } from "../../assets/sass/global/Usertype";
import { User, UserContext } from "../../context/userContext";

const UpdateForm: React.FC=(): JSX.Element =>{

    const phoneRegex=RegExp(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/) 
    const emailregex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const {user}= useContext(LoginContext);
    const {users,getUsers}=useContext(UserContext);
    const usr:User= users.find((e:User)=>{
        return e._id===user?.id
    })
    const [all,setAll]=useState({
        phoneNumber:usr.phoneNumber,
        avatar:usr.avatar,
        email:usr.email,
        description:usr.description
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
        


        if(alertPh===true){
            if(user?.phoneNumber){
            setAll({...all,phoneNumber:user.phoneNumber})
            }
        }

        if(all.avatar===""&&user?.avatar){
            setAll({...all,avatar:user.avatar})

        }
        if(emailAlert===true){
            if(user?.email){
                setAll({...all,email:user.email})

            }
            
        }
        if(all.description===""&&user?.description){
            setAll({...all,description:user.description})

        }


        getAxiosInstance()
        .put("/user/" + user?.id, JSON.stringify(all)).then(()=>{getUsers()})
        console.log(all);

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
                <TextField placeholder={usr.phoneNumber} id="outlined-basic" onChange={(e:any)=>{
                if(phoneRegex.test(e.target.value)===true)
                {
                    setAll({...all,phoneNumber:e.target.value});
                    setAlertPh(false);
                    if(e.target.value===""){
                        setAlertPh(false);
                    }
                }else{
                    if(e.target.value===""){
                        setAlertPh(false);
                    }
                    setAlertPh(true);
                }
                
            }}/>
            </div>
            <div className="line">
                <div>
                Email:
                {emailAlert?(<div className='inc'>Incorrect!</div>):null}
               
                </div>
                 <TextField placeholder={usr.email}  variant="outlined"onChange={(e:any)=>{
                    if(emailregex.test(e.target.value)===true){
                        setAll({...all,email:e.target.value});
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
            setAll({...all,description:e.target.value});
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