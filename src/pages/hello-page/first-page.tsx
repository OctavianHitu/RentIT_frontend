
import Rentit from "../../components/rentit/rentit";
import './first-page.scss'
import { useContext, useState } from "react";
import sign from '../../assets/images/sign.svg'
import { Car, CarContext } from "../../context/carContext";
import Footer from "../../components/footer/footer";
import { FormControl, MenuItem, Select } from "@mui/material";
import { citiesRomania } from "../../assets/sass/global/enums/orase";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

const FirstPage: React.FC =(): JSX.Element =>{
    const [city,setCity]=useState("");

    const {cars}=useContext(CarContext)
    const lastOffers:Car[]=cars.slice(-4);
    console.log(lastOffers)
    return(
        <div className="entry-page">
            <div className="row1">
            <div className="welcome">
                <Rentit fontSize={140}/>
            </div>
            <div className="find-a-car-hello">
                <div className="find-car-text">
                    Search,Compare,Reserve
                </div>
                <div className="find-car-little">
                    <div className="little-seacrh">
                        <div className="romania-txt">
                            Romania :   
                        </div>

<div className="select-city-little">



                    <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  onChange={(elem: any) => {
                    setCity(elem.target.value );
                  }}
                >
                  {citiesRomania.map((e: any) => {
                    return (
                      <MenuItem value={e.county} key={e.county}>
                        {e.county}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>


              </div>
              <div className="liitle-range-picker">
              <DateRangePicker disablePast/>
              </div>
              <div className="btn-little-search">
                <button className="btn-l-s">Search</button>

              </div>









                    </div>
                </div>

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
            <div className="desc-row3">
                 With a seamless interface and efficient verification process, RentIT ensures a hassle-free experience. From regular users who can explore and reserve from a diverse selection of cars to dealers who can showcase unlimited offers, our website caters to various needs. Experience convenience, reliability, and a vast choice of quality cars through our exceptional car rental website.
                </div>
                
                

                
            </div>
            <div className="row4">
                <div className="row-last-off">
                    <div className="hello-card-car">
                        {/* <CarCard car={lastOffers[0]}/> */}
                    </div>
                    <div  className="hello-card-car">
                    {/* <CarCard car={lastOffers[1]}/> */}

                    </div>
                </div>
                <div className="row-last-off">
                    <div  className="hello-card-car">
                    {/* <CarCard car={lastOffers[2]}/> */}

                    </div>
                    <div  className="hello-card-car">
                    {/* <CarCard car={lastOffers[3]}/> */}

                    </div>
                </div>

            </div>
            <div className="aboutUs">
                
                    {/* <Rentit fontSize={30}/>
                
                <div className="contact">
                    <div>Ajutor</div>
                    
                    <div>Politica</div>
                    <div>Instructiuni</div>

                </div> */}
                <Footer/>
                

            </div>
        </div>
    )
}

export default FirstPage;