import { useContext } from 'react';
import './sellerPage.scss'
import { UserContext } from '../../context/userContext';
import { Car, CarContext } from '../../context/carContext';
import CarPagins from '../../components/pagionationComponent/carPagins';
import { Avatar } from '@mui/material';
import { UserType } from '../../assets/sass/global/Usertype';

const SellerPage: React.FC =():JSX.Element=>{

  const {users,setUsers}=useContext(UserContext);
  const {cars}=useContext(CarContext);

  var id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const currentUser = users.find((elem:any) => {
    return elem._id === id;
  });



  const carsOfUser= cars.filter((elem:Car)=>{
    return elem.owner===id

  })
  console.log(carsOfUser);
    return(
        <div className='seller-page'>
            <div className='seller-info-page'>
                <div className='seller-info-fromPage'>
                    <div className='title-seller-page'>
                        <Avatar sx={{ height: '70px !important',width:'70px !important'}} src={currentUser.avatar}/>
                        {currentUser.userType===UserType.DEALERSHIP?(
                            <div>{currentUser.companyName}</div>
                        ):(
                            <div>{currentUser.firstName} {currentUser.lastName}</div>
                        )}
                    </div>
                    <div className='info-seller-page'>
                        <div>
                            {currentUser.userType===UserType.DEALERSHIP?(
                            <div>The current account is owned by a dealership!</div>
                        ):(
                            <div>The current account is owned by a person!</div>
                        )}
                        </div>
                        <div className='seller-line-page'>
                            <div>
                        Email:

                            </div>
                        {currentUser.email}
                        </div>
                        <div className='seller-line-page'>
                            <div>
                            Phone number: 
                                
                            </div>
                        {currentUser.phoneNumber}
                        </div>
                        <div className='seller-line-page'>
                            <div>
                            Country: 
                                
                            </div>
                            {currentUser.country}
                        </div>
                        <div className='seller-line-page'>
                            <div>
                            Adress: 
                                
                            </div>
                             {currentUser.city} {currentUser.address}
                        </div>
                        {currentUser.userType===UserType.DEALERSHIP?(
                        <div className='seller-line-page-deal'>
                            <div>
                            Description: 
                            </div>
                             {currentUser.description} 
                        </div>

                        ):null}
                        
                        

                    </div>

                </div>
            </div>
            <div className='seller-offers-page'>
                <CarPagins cars={carsOfUser} postsPage={3} />
            </div>

        </div>
    )
}

export default SellerPage;