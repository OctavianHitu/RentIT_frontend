import { useContext, useEffect, useMemo, useState } from "react";
import {  CarContext } from "../../context/carContext";
import "./FullCarModal.scss";
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UserContext } from "../../context/userContext";
import { Avatar, Rating } from "@mui/material";
import { User } from "../../context/userContext";
import MapPicker from "react-google-map-picker";
import { LoginContext } from "../../context/loginContext";
import { UserType } from "../../assets/sass/global/Usertype";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import ReservationModal from "../reservationModal/reservationModal";
import { ReservationContext } from "../../context/reservationContext";


const FullModalCar: React.FC = (): JSX.Element => {
  var id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [idState,setIdState]=useState(id)

  const { cars } = useContext(CarContext);
  const car = cars.find((elem:any) => {
    return elem._id === idState;
  });

  const {users,setUsers}=useContext(UserContext);

  const userOfCar:User= users.find((elem:User)=>{
    return elem._id===car?.owner
  })
  const {user}=useContext(LoginContext)

  const navigate = useNavigate();

  function goToSeller(){
    navigate(`/sellerPage/${userOfCar._id}`)
  }

  console.log(car)
  console.log(userOfCar)
 


  const {getReservations}=useContext(ReservationContext);
  
  const [resModal, setresModal] = useState(false);


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
            <Avatar className="avatar-user-1" src={userOfCar?.avatar}/>
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
            
              {user?.id != "" &&user?.userType==UserType.REGULAR?(
                
                    <button onClick={() => {
                  setresModal(true);
                }} 
                className="btn-offer-reserve">RESERVE</button>
                
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
                    {car?.carDetails.carType.toUpperCase()}
                </div>
                <div className="modal-details-line">
                <span>Fabrication:</span>
                {car?.carDetails.fabricationYear.toString()?(

                new Date(car?.carDetails.fabricationYear).toLocaleDateString().toString()
                ):null}
                  
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
                {car?.carDetails.fuel.toUpperCase()}

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
                {car?.carDetails.traction.toUpperCase()}
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
                    {car?.carFeatures.connectivity.toUpperCase()}
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
                {car?.carFeatures.headlights.toUpperCase()}
                </div>
                


                </div>


            </div>
      </div>
      </div>

      <div className="car-modal-row-3">
      <div className="car-modal-row-3-container" onClick={goToSeller}>

        <div className="car-modal-user-name3">
        <Avatar  src={userOfCar?.avatar}/>
              {userOfCar?.userType===UserType.DEALERSHIP?(
                <div>
                   {userOfCar?.companyName}
                </div>
              ):null}
        </div>
        <div className="car-modal-user-infos4">
          <div className="row-car-modal-infos">
          <div>
            Adress:
          </div>
          <div>
            {userOfCar?.country}, {userOfCar?.city}, {userOfCar?.address}
          </div>
          </div>
          <div className="row-car-modal-infos">
            <div>
              Email:
            </div>
            <div>
              {userOfCar?.email}
            </div>
          </div>
          <div className="row-car-modal-infos">
            <div>
              Phone:
            </div>
            <div>
              {userOfCar?.phoneNumber}
            </div>
          </div>
          <div className="row-car-modal-infos">
            <div>
              Car description:
            </div>
            <div>
              {car?.description}
            </div>
          </div>

            
        </div>
        </div>

      </div>
      {resModal ? (
        <ReservationModal
          car={car}
          onClose={() => {
            setresModal(false);
            getReservations();
          }}
        />
      ) : null}
    </div>
  );
};

export default FullModalCar;
