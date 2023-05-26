import Header from "../../components/header/header"
import Rentit from "../../components/rentit/rentit";
import './first-page.scss'

import sign from '../../assets/images/sign.svg'

const FirstPage: React.FC =(): JSX.Element =>{

    return(
        <div className="entry-page">
            <div className="row1">
            <div className="welcome">
                <Rentit fontSize={140}/>
            </div>
            <div className="welcome-1">
                <div className="w-best">Your best choice for car rental!</div>
            </div>
        
            </div>
            <div className="row2">

                 <div className="quote q1">

                    Choose wisely for your trip.
                 </div>
                 <div className="sign">
                    <img style={{height:"150px"}} src={sign}/>
                 </div>
                 <div className="quote q2">
                    Find the best deal.
                 </div>

            </div>

            <div className="row3">
                <div>About us</div>
                
            </div>
            <div className="aboutUs">
                
                    <Rentit fontSize={30}/>
                
                <div className="contact">
                    <div>Ajutor</div>
                    
                    <div>Politica</div>
                    <div>Instructiuni</div>

                </div>
                

            </div>
        </div>
    )
}

export default FirstPage;