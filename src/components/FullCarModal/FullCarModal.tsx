import { useContext, useMemo, useState } from "react";
import { Car, CarContext } from "../../context/carContext";
import "./FullCarModal.scss";
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UserContext } from "../../context/userContext";
import { Avatar, Button, Rating } from "@mui/material";
import { User } from "../../context/userContext";
import MapPicker from "react-google-map-picker";
import { LoginContext } from "../../context/loginContext";
import { UserType } from "../../assets/sass/global/Usertype";
import { useNavigate } from "react-router-dom";
// interface FullCarModalComponent{
//     car:Car;
// }

const FullModalCar: React.FC = (): JSX.Element => {
  var id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const { cars } = useContext(CarContext);
  const car = cars.find((elem) => {
    return elem._id === id;
  });

  const {users,setUsers}=useContext(UserContext);

  const userOfCar= users.find((elem:User)=>{
    return elem._id===car?.owner
  })
  const {user}=useContext(LoginContext)
  console.log(user)

  const navigate = useNavigate();

  function goToSeller(){
    navigate(`/sellerPage/${userOfCar._id}`)
  }

  return (
    <div className="modal-fullcar">

    <div className="modal-car-row-1">
      <div className="modal-full-title-img">
        <div className="modal-full-car-header">
          <span>
            {car?.brand} {car?.model}
          </span>
          <span>{car?.price} $ / day</span>
        </div>


        <div className="modal-fullcar-image">
          <div className="image-div-modal-car">
            <img className="full-modal-car-img" src={car?.images} />
          </div>


          <div className="important-infos">

            <div className="important-infos-line-user" onClick={goToSeller}>
            <Avatar src={userOfCar?.avatar}/>
              {userOfCar?.userType===UserType.DEALERSHIP?(
                <div>
                   {userOfCar.companyName}
                </div>
              ):null}
            </div>

            <div className="important-infos-line">
              <span>Brand:</span>
              {car?.brand}
            </div>

            <div className="important-infos-line">
              <span>Model:</span>
              {car?.model}
            </div>
            <div className="important-infos-line">
              <span>Price:</span>
              {car?.price} $ / day
            </div>

            <div className="important-infos-line">
              <span>Serial number:</span>
              {car?.serialNumber}
            </div>
            <div className="important-infos-line-user">
            
              {user?.id!=""?(
                
                    <button className="btn-offer-reserve">RESERVE</button>
                
              ):null}
            </div>


          </div>
        </div>


      </div>
      </div>
      <div className="modal-car-row-2">
      <div className="modal-full-car-infos">



            <div className="car-modal-info-details" >
                <div className="moda-features-title">
                    <span>Car Details</span>
                </div>
                <div className="moda-details-list">
                <div className="modal-details-line">
                    <span>Car type:</span>
                    {car?.carDetails.carType}
                </div>
                <div className="modal-details-line">
                <span>Fabrication:</span>

                </div>
                <div className="modal-details-line">
                <span>Doors:</span>
                {car?.carDetails.doorNumber}

                </div>
                <div className="modal-details-line">
                <span>Consumption:</span>
                {car?.carDetails.consumption} l/100km

                </div>
                <div className="modal-details-line">
                <span>Fuel:</span>
                {car?.carDetails.fuel}

                </div>
                <div className="modal-details-line">
                <span>Milage on electric:</span>
                {car?.carDetails.milageOnElectric} Km
                </div>
                <div className="modal-details-line">
                <span>Color:</span>
                <span style={{background:`${car?.carDetails.color}`,width:'20%',borderRadius:'20px'}} >

                </span>
                </div>
                <div className="modal-details-line">
                <span>Seats:</span>
                {car?.carDetails.numberOfSeats}
                </div>
                <div className="modal-details-line">
                <span>Trunk capacity:</span>
                {car?.carDetails.trunkCapacity} L
                </div>
                <div className="modal-details-line">
                <span>Traction:</span>
                {car?.carDetails.traction}
                </div>
                <div className="modal-details-line">
                <span>Power:</span>
                {car?.carDetails.power} HP
                </div>
                <div className="modal-details-line">
                <span>Engine Capacity:</span>
                {car?.carDetails.engineCapacity} cm3
                </div>


                </div>


            </div>
            <div className="car-modal-info-features">



            <div className="moda-features-title">
                    <span>Car Features</span>
                </div>
                <div className="moda-details-list">
                <div className="modal-details-line">
                    <span>Connectivity:</span>
                    {car?.carFeatures.connectivity}
                </div>
                <div className="modal-details-line">
                <span>Heated seats:</span>
                {car?.carFeatures.heatedSeats?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}

                </div>
                <div className="modal-details-line">
                <span>Gearbox:</span>
                {car?.carFeatures.gearboxIsManual?(
                    <span>Manual</span>
                ):(
                    <span>Automatic</span>

                )}

                </div>
                <div className="modal-details-line">
                <span>Disability car::</span>
                {car?.carFeatures.disabilityCar?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}

                </div>
                <div className="modal-details-line">
                <span>AC:</span>
                {car?.carFeatures.ac?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}

                </div>
                <div className="modal-details-line">
                <span>Airbags:</span>
                {car?.carFeatures.hasAirbags?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}
                </div>
                <div className="modal-details-line">
                <span>Safety rating:</span>
                <Rating name="read-only" value={car?.carFeatures.safetyrating} readOnly />
                </div>
                <div className="modal-details-line">
                <span>Smoking vehicle:</span>
                {car?.carFeatures.smokingVehicle?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}
                </div>
                <div className="modal-details-line">
                <span>Baby isofix:</span>
                {car?.carFeatures.isofixForBaby?(
                    <DoneIcon/>
                ):(
                    <HighlightOffIcon/>
                )}
                </div>
                <div className="modal-details-line">
                <span>Headlights:</span>
                {car?.carFeatures.headlights}
                </div>
                


                </div>


            </div>
      </div>
      </div>

      <div className="car-modal-row-3">
        <div className="car-modal-map">
        <MapPicker
        defaultLocation={{lat:userOfCar.lat,lng:userOfCar.lang}}
        apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
        zoom={18}/>

        </div>

      </div>
      
    </div>
  );
};

export default FullModalCar;
