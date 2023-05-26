import { useContext, useState } from "react";
import "./login-form.scss" 
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";
import { decodeUserJwt } from "../../assets/sass/global/user_decoded";
import { UserType } from "../../assets/sass/global/Usertype";


const LoginForm:React.FC=():JSX.Element=>{

    const [data,setData]=useState({
        email:"",
        password:"",
    })
    const navigate=useNavigate();
    const { user, setUser } = useContext(LoginContext);


    async function handleLogin(event:any){
        event.preventDefault();
        const jwtData = await getAxiosInstance().post(
      "/authentification/auth/login",
      JSON.stringify(data)
    );
    if (jwtData) {
        sessionStorage.setItem("jwtData", JSON.stringify(jwtData));
        const decodedUser = decodeUserJwt("jwtData");
        setUser(decodedUser);
        if(decodedUser?.userType===UserType.MANAGER){
          navigate("/manager")
        }else{
          navigate("/welcome");

        }
      }
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
                <a>Forgot password?</a>
                <button className="part"
                onClick={handleLogin}
                >LOGIN</button>
        </div>
    )
}

export default LoginForm;