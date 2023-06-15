import { useContext, useState } from "react";
import "./login-form.scss" 
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";
import { decodeUserJwt } from "../../assets/sass/global/user_decoded";
import { UserType } from "../../assets/sass/global/Usertype";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar, TextField } from "@mui/material";
import { User, UserContext } from "../../context/userContext";

const LoginForm:React.FC=():JSX.Element=>{

    const [data,setData]=useState({
        email:"",
        password:"",
    })
    const navigate=useNavigate();
    const {  setUser } = useContext(LoginContext);
    const {users}=useContext(UserContext)

    const [loginNotOk,setLoginNotok]=useState(false);
    const [forgotPass,setForgotPass]=useState(false);
    const [emailRecovery,setEmailRecovery]=useState("");

    async function handleLogin(event:any){
        console.log(data)
        event.preventDefault();
        const jwtData = await getAxiosInstance().post(
      "/authentification/auth/login",
      JSON.stringify(data)
    ).catch(
      function(error){
        if(error.response){
          setLoginNotok(true)
        }
      }
    )
    if (jwtData) {
        sessionStorage.setItem("jwtData", JSON.stringify(jwtData));
        const decodedUser = decodeUserJwt("jwtData");
        setUser(decodedUser);
        if(decodedUser?.userType===UserType.MANAGER){
          navigate("/manager")
        }else
        if(decodedUser?.userType===UserType.REGULAR){
          navigate("/welcome");
        }else
        {
          navigate("/offers");

        }
      }
    }

    function passRecovery(){

      const aa= users.find((e:User)=>{if(e.email===emailRecovery){return e}})

      const pass="X"+Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)+"&";
      console.log(pass)
      console.log(aa);
      // getAxiosInstance().put("/user/" + aa._id, `{"password":"${pass}"}`).then(()=>{   } )
      
    }

    return(
        <div className="login-form">
                <div className="login-wr">LOGIN</div>
                <div className="">Please enter your email and password!</div>
                <input className="part" 
                type={"email"} 
                placeholder="EMAIL"
                onChange={(event: any) => {
                    data.email = event.target.value;
                    setData(data);
                  }}
                />
                <input className="part" 
                type={"password"} 
                placeholder="PASSWORD"
                onChange={(event: any) => {
                    data.password = event.target.value;
                    setData(data);
                  }}
                />
                <Button onClick={()=>{setForgotPass(true)}}>Forgot password?</Button>
                {loginNotOk?
                (
                  <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={loginNotOk} autoHideDuration={6000} onClose={()=>{setLoginNotok(false)}}>
                    <Alert onClose={()=>{setLoginNotok(false)}} severity="error" sx={{ width: '400px' }}>
                      Email or password incorrect!
                    </Alert>
                  </Snackbar>
                ):null}
                <button className="part"
                onClick={handleLogin}
                >LOGIN</button>
                {forgotPass?(
                  <Dialog open={forgotPass} onClose={()=>{setForgotPass(false)}}>
                  <DialogContent>
                    <DialogContentText>
                      If you forgot your password type your email here and we will contact you!
                    </DialogContentText>
                    <form>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={(e:any)=>{
                        setEmailRecovery(e.target.value);
                      }}
                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button  className="buton-recoevry" onClick={passRecovery}>Send Email</Button>
                  </DialogActions>
                </Dialog>
                ):null}
                

        </div>
    )
}

export default LoginForm;