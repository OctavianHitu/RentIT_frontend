import { useContext, useEffect, useState } from "react";
import "./offers.scss";
import { Car, CarContext } from "../../context/carContext";
import CarPagins from "../../components/pagionationComponent/carPagins";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { ReservationContext } from "../../context/reservationContext";
import { useLocation } from "react-router-dom";
import { citiesRomania } from "../../assets/sass/global/enums/orase";
import { CarBody } from "../../assets/sass/global/enums/Cartype";
import Footer from "../../components/footer/footer";
import { Fuel } from "../../assets/sass/global/enums/Fuel";

const OffersPage: React.FC = (): JSX.Element => {
  const { cars } = useContext(CarContext);

  function removeDuplicates(arr: any) {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  }
  const allCarBrandDuplicate = cars.map((e: Car) => {
    return e.brand;
  });
  const allCarCitiesDuplicates = cars.map((e: Car) => {
    return e.city;
  });
  const brands = removeDuplicates(allCarBrandDuplicate);
  const cities = removeDuplicates(allCarCitiesDuplicates);

  const location = useLocation();
  const props = location.state && location.state.props;

  interface fieldsType{
    city:string,
    body:string,
    brand:string,
    fuel:string,
    gearbox:string,
    maxPrice:number,
    disability:string
    baby:string,
  }

  const [fields,setFields]=useState<fieldsType>({
    city:"",
    body:"",
    brand:"",
    fuel:"",
    gearbox:"",
    maxPrice:100001,
    disability:"",
    baby:""
  })

  const [showCars,setShowCars]=useState(props===null||props.length==0?cars:props)

  const [carsFiltered,setCarsFiltered]=useState<Car[]>(showCars);



  function filterCars(){

    console.log(fields)
    let filteredC= showCars;

    if(fields.city!==""){
      filteredC=filteredC.filter((e:Car)=>{
       return  e.city===fields.city;
      })
    }
    if(fields.body!==""){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.carDetails.carType===fields.body;
       })
    }
    if(fields.brand!==""){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.brand===fields.brand;
       })
    }
    if(fields.fuel!==""){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.carDetails.fuel===fields.fuel;
       })
    }
    if(fields.gearbox!==""){
      if(fields.gearbox==="manual"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.gearboxIsManual===true;
         })
      }
      if(fields.gearbox==="automatic"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.gearboxIsManual===false;
         })
      }
      
    }

    if(fields.maxPrice===100001){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=100000;
       })
    }else
    if(fields.maxPrice===10000){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=100000&&e.price>=400;
       })
    }else
    if(fields.maxPrice===400){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=400&&e.price>300;
       })
    }else
    if(fields.maxPrice===300){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=300&&e.price>200;
       })
    }else
    if(fields.maxPrice===200){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=200&&e.price>100;
       })
    }else
    if(fields.maxPrice===100){
      filteredC=filteredC.filter((e:Car)=>{
        return  e.price<=100;
       })
    }

    if(fields.disability!==""){
      if(fields.disability==="disability"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.disabilityCar===true;
         })
      }
      if(fields.disability==="notDisability"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.disabilityCar===false;
         })
      }
      
    }

    if(fields.baby!==""){
      if(fields.baby==="baby"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.isofixForBaby===true;
         })
      }
      if(fields.baby==="notbaby"){
        filteredC=filteredC.filter((e:Car)=>{
          return  e.carFeatures.isofixForBaby===false;
         })
      }
      
    }

    console.log(filteredC);
    setCarsFiltered(filteredC);

  

  }






  return (
    <div className="alloffers-Page">
    <div className="offers-page">
      <div className="filters">
        <div className="filters-container-offers">

        <div className="filter-line">
      <div>
      City:

      </div>

          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.city}
              onChange={(elem: any) => {
                setFields({...fields,city:elem.target.value});

              }}
            >
              {cities.map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>


        </div>
        <div className="filter-line">
              Body:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fields.body}
                  onChange={(elem: any) => {
                    setFields({...fields,body:elem.target.value});
    
                  }}
                >
                  {Object.keys(CarBody).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
              <MenuItem value={""}>None</MenuItem>
                  
                </Select>
              </FormControl>
            </div>

        <div className="filter-line">
      <div>
      Brand:

      </div>

          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.brand}
                  onChange={(elem: any) => {
                    setFields({...fields,brand:elem.target.value});
    
                  }}
            >
              {brands.map((e: any) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>;
              })}
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>


        </div>
        <div className="filter-line">
          <div>
            Fuel:
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.fuel}
                  onChange={(elem: any) => {
                    setFields({...fields,fuel:elem.target.value});
    
                  }}
            >
              {Object.keys(Fuel).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-line">
          <div>
            Gearbox:
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.gearbox}
                  onChange={(elem: any) => {
                    setFields({...fields,gearbox:elem.target.value});
    
                  }}
            >
              <MenuItem value={"automatic"}>Automatic</MenuItem>
              <MenuItem value={"manual"}>Manual</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-line">
          <div>
            Disability car:
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.disability}
                  onChange={(elem: any) => {
                    setFields({...fields,disability:elem.target.value});
    
                  }}
            >
              <MenuItem value={"disability"}>Disability car</MenuItem>
              <MenuItem value={"notDisability"}>Normal car</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-line">
          <div>
            Baby isofix:
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.baby}
                  onChange={(elem: any) => {
                    setFields({...fields,baby:elem.target.value});
    
                  }}
            >
              <MenuItem value={"baby"}>Isofix</MenuItem>
              <MenuItem value={"notbaby"}>Without Isofix</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-line">
          <div>
            Price:
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fields.maxPrice}
                  onChange={(elem: any) => {
                    setFields({...fields,maxPrice:elem.target.value});
    
                  }}
            >
              <MenuItem value={100}>0-100 $</MenuItem>
              <MenuItem value={200}>100-200 $</MenuItem>
              <MenuItem value={300}>200-300 $</MenuItem>
              <MenuItem value={400}>300-400 $</MenuItem>
              <MenuItem value={1000000}>400 $ +</MenuItem>
              <MenuItem value={1000001}>None</MenuItem>

            </Select>
          </FormControl>
        </div>
        
        <div className="filter-line">
          <button onClick={filterCars} className="btn-filter-offers orange1" >Filter</button>
          <button onClick={()=>{setCarsFiltered(showCars) 
          setFields({
    city:"",
    body:"",
    brand:"",
    fuel:"",
    gearbox:"",
    maxPrice:100001,
    disability:"",
    baby:""
  })}} className="btn-filter-offers green1" >Reset</button>
          <button  onClick={()=>{setCarsFiltered(cars)}} className="btn-filter-offers green3" >All Offers</button>
        
        </div>

        </div>
      </div>
      <div>

      </div>
      <div className="see-offers">
        <CarPagins cars={carsFiltered} postsPage={4} />
      </div>
    </div>
    <div className="all-offers-footerr-part">
      <Footer/>
    </div>


    </div>
  );
};
export default OffersPage;
