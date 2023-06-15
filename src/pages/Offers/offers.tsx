import { useContext, useEffect, useState } from "react";
import "./offers.scss";
import { Car, CarContext } from "../../context/carContext";
import CarPagins from "../../components/pagionationComponent/carPagins";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { ReservationContext } from "../../context/reservationContext";

const OffersPage: React.FC = (): JSX.Element => {
  function removeDuplicates(arr: any) {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  }

  const { cars } = useContext(CarContext);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(10000);

  const [filterCars, setFilterCars] = useState(cars);

  const allCarBrandDuplicate = cars.map((e: Car) => {
    return e.brand;
  });
  const brands = removeDuplicates(allCarBrandDuplicate);

 
  function handleFilter() {
    // const carsF1 = cars.filter((e: Car) => {
    //   return brand === "" ? e : e.brand === brand;
    // });
    // setFilterCars(carsF1);

    const carsF = cars.filter((e: Car) => {
        return e.price<=price;
      });

    setFilterCars(carsF);
  }

  return (
    <div className="offers-page">
      <div className="filters">
        <div className="filter-line">
          Brand:
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              onChange={(elem: any) => {
                setBrand(elem.target.value);
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
          Price maximum:
          <OutlinedInput
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            id="outlined-adornment-amount"
            type="number"
            onChange={(e:any) => {
              // price>1?setPrice(e.target.value):setPrice(10000);
              
            }}
          />
        </div>
        <div>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
      <div className="see-offers">
        <CarPagins cars={cars} postsPage={4} />
      </div>
    </div>
  );
};
export default OffersPage;
