import './contactus.scss'
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';

const ContactUsPage:React.FC =():JSX.Element=>{

    const navigate=useNavigate();

    return(
    <div className='contactus'>
        <div className='contact-us-page'>
            
            <div className='contact-us-inner'>
            <div className='cont-title'>
                Contact us
            </div>
            <div>
            Thank you for your interest in RentIT. We value your feedback and are here to assist you. Please feel free to reach out to us using the contact information provided below:
            </div>
            <div>
            Email: rentit.web.company@gmail.com
            </div>
            <div>
Phone: 0740666777
                
            </div>
            <div>
Alternatively, you can access the <button style={{color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/supportPage')}} className='btn-suportForm'>SupportForm</button> to send us a message directly:
                
            </div>
            <div>
Please provide us with your name, email address, and a detailed description of your inquiry or feedback. Our customer support team will make every effort to respond to your message as soon as possible.
                
            </div>
            <div>
            Please note that our customer support hours are 9:00 - 18:00. We kindly request your patience during non-operating hours, as responses may be delayed.
    
            </div>
            <div>
For any urgent matters or assistance related to an ongoing reservation, we recommend contacting us by phone for a prompt response.
            </div>
            <div>
            We appreciate your understanding and look forward to assisting you.
            </div>
            <div>
            Thank you,
            The RentIT Team!
            </div>
            </div>
        </div>
        <div className='footer-contact-us'>
            <Footer/>
        </div>

    </div>)
}
export default ContactUsPage;