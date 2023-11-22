
import './footer.scss'
import Rentit from '../rentit/rentit';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = (): JSX.Element => {


    const navigate=useNavigate();
return(
    <div className='footer'>
        <div className='rentit-logo-footer'>
        <Rentit fontSize={40}/>

        </div>
        <div>

        </div>
        <div className='footer-selectror'>
            <button className='btn-footer' onClick={()=>{navigate('/supportPage')}}>Support</button>
            <button className='btn-footer' onClick={()=>{navigate('/infoPage')}}>Terms and conditions</button>
            <button className='btn-footer' onClick={()=>{navigate('/contactUs')}}>Contact us</button>

        </div>
    </div>
)
}

export default Footer;