import "./login-register.scss";
import LoginForm from "../../components/login/login-form";
import RegisterForm from "../../components/register/register-form";
import { useState } from "react";
import '../../assets/sass/global/variables.scss'

const LoginRegister: React.FC = (): JSX.Element => {

  const [showLoginOrRegister,setShowLoginOrRegister] = useState(false)

  const changeToLogin=()=>{
    setShowLoginOrRegister(true);
  }
  const changeToRegister=()=>{
    setShowLoginOrRegister(false);
  }

  return (
    <div className="login-register-page">
      <div className="login-register">
        <div className="logo-zone">
          <span>
            RENT<span className="it-part">IT</span>
          </span>
          <div className="rde">
            <div>RESERVE from anywhere.</div>
            <div>DRIVE when you arrive.</div>
            <div>ENJOY everytime.</div>
          </div>
        </div>
        <div className="log-reg-form-zone">
          <div className="forms">
            {showLoginOrRegister?(
              <LoginForm/>
            ):(
              <RegisterForm/>
            )}
          
          </div>
          <div className="navbar-log">
            <button className="navbar-btn" style={{ backgroundColor: showLoginOrRegister ? "white" : "#21A0A0" }} onClick={changeToRegister}>SIGN UP</button>
            <button className="navbar-btn" style={{ backgroundColor: showLoginOrRegister ? "#21A0A0" : "white" }} onClick={changeToLogin}>LOGIN</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
