import { useNavigate } from 'react-router-dom';
import Rentit from '../rentit/rentit';
import './header.scss'
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../context/loginContext';
import { jsonFromJwt } from '../../assets/sass/global/user_decoded';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { UserType } from '../../assets/sass/global/Usertype';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { Avatar } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import HomeIcon from '@mui/icons-material/Home';
interface HeaderComponent{}

const Header: React.FC<HeaderComponent> = (): JSX.Element => {

    const { user } = useContext(LoginContext);
    let [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        isLogged = jsonFromJwt("jwtData") || false;
        setIsLogged(isLogged);
      }, [user]);

    function handleLogin() {
        navigate("/loginRegister");
      }
      function accountButton(){
        navigate("/account")
      }
      function handleLogout(){
        sessionStorage.clear();
        setIsLogged(false);
        navigate("/welcome")
      }

      function carPageListener(){
        navigate("/carPage")
      }
    return(
    <div className="header">
        {user?.userType===UserType.MANAGER?(<div></div>):(
            <div className='btns-hd' >
            <button className='hd-btn'onClick={()=>{
                console.log(user)
        navigate("/welcome")

        }}>
            <HomeIcon/>
                Home
            </button>
            <button className='hd-btn' onClick={()=>{
            navigate("/offers")

        }} >
            <CarRentalIcon/>
            Offers

            </button>
            {user?.isVerified===true?(            
            <button className='hd-btn' onClick={carPageListener}>
                <ControlPointRoundedIcon/>
                 New car
            </button>) 
             :null}

        </div>
        )}
        
        <div className="logo">
            <Rentit fontSize={20}/>
        </div>
        {isLogged?(
            <div className='user-buttons'>
                {user?.userType===UserType.MANAGER?
                (<Avatar alt="M" />):(
                    <Avatar src={user?.avatar} /> 
                )}
                {user?.userType===UserType.MANAGER?null:(
                    <button className='icon-part' onClick={accountButton}>
                    <Person2OutlinedIcon/>
                    Account
                </button>
                )}
                {user?.userType===UserType.MANAGER?null:(
                    <button className='icon-part'>
                    <FavoriteBorderOutlinedIcon/>
                    Favourites
                </button> 
                )}
                
                <button className='icon-part' onClick={handleLogout}>
                    <LogoutOutlinedIcon/>
                    Logout
                </button>     
                
            </div>
        ):(
            <div className='user-zone'>
             <button className='toLoginOrRegister'
                onClick={handleLogin}
             >Login | Register</button>
        </div>
        )}
        

    </div>
    )
}

export default Header;