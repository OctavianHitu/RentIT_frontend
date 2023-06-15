import { useContext, useState } from "react";
import "./CarPage.scss";
import {
    Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { carList } from "../../assets/sass/global/enums/Cars";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { LoginContext } from "../../context/loginContext";
import { CarBody } from "../../assets/sass/global/enums/Cartype";
import { DatePicker } from "@mui/x-date-pickers";
import { Fuel } from "../../assets/sass/global/enums/Fuel";
import { MuiColorInput, MuiColorInputFormat } from "mui-color-input";
import { TractionType } from "../../assets/sass/global/enums/Traction";
import { Connections } from "../../assets/sass/global/enums/Connect";
import { Headlights } from "../../assets/sass/global/enums/Headlights";
import getAxiosInstance from "../../axios-service";
import Footer from "../../components/footer/footer";
import { Car, CarContext } from "../../context/carContext";
const CarPage: React.FC = (): JSX.Element => {
  const priceRegex = RegExp(/^[0-9]*$/);

  const consReg = RegExp(/^[0-9]{1,2}([,.][0-9]{1,2})?$/);

  const [price, setPrice] = useState(false);
  const [cons, setCons] = useState(false);
  const [milage, setMilage] = useState(false);
  const [trunk, setTrunk] = useState(false);
  const [hp, setHp] = useState(false);
  const [engine, setEngine] = useState(false);

  const { user } = useContext(LoginContext);
  const {cars}=useContext(CarContext)

  const [exists,setExists]=useState(false);

  const [car, setCar] = useState({
    serialNumber: "",
    brand: "",
    price: 0,
    model: "",
    images: "",
    description: "",
    carDetails: {
      carType: "",
      fabricationYear: "",
      doorNumber: 0,
      consumption: 0,
      fuel: "",
      milageOnElectric: 0,
      color: "",
      numberOfSeats: 0,
      trunkCapacity: 0,
      traction: "",
      power: 0,
      engineCapacity: 0,
    },
    carFeatures: {
      connectivity: "",
      heatedSeats: false,
      gearboxIsManual: false,
      disabilityCar: false,
      ac: false,
      hasAirbags: false,
      safetyrating: 0,
      smokingVehicle: false,
      isofixForBaby: false,
      headlights: "",
    },
    owner: user?.id,
    city:user?.city,
    country:user?.country,
    address:user?.address
  });

  const carsL = carList.sort(function (a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  });
  console.log(car)

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function showPreview1(event: any) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file1-p");
      //@ts-ignore
      preview.src = src;
      //@ts-ignore
      preview.style.display = "block";
      const base64 = await convertBase64(event.target.files[0]);
      car.images = String(base64);
      setCar(car);
    }
  }

  const format: MuiColorInputFormat = "hex";

  const [succes,setSucces]=useState(false);

 async function handlesubmitCar(){

  
  const isFound = cars.some((element:Car) => {
    
    if (element.serialNumber === car.serialNumber) {
      return true;
    
    }
  });
    if(isFound){
      setExists(true);
    }else{
      getAxiosInstance()
      .post("car", JSON.stringify(car))
      .then(() => {
        setSucces(true);
      });
    }
    
    

}
const handleClose=(e:any,reason?:string)=>{
    if(reason==='clickaway'){
        return
    }
    setSucces(false);
}

const handleClose1=(e:any,reason?:string)=>{
  if(reason==='clickaway'){
      return
  }
  setExists(false);
}

  return (
    <div className="carPage">
      <div className="car-new">NEW CAR</div>
      <div className="car-total">
        <div className="car-i">Car info:</div>
        <div className="car-info">
          <div className="inputs-car">
            <div className="line">
              Brand:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.brand}
                  onChange={(elem: any) => {
                    setCar({ ...car, brand: elem.target.value });
                  }}
                >
                  {carsL.map((e: any) => {
                    return (
                      <MenuItem value={e.brand} key={e.brand}>
                        {e.brand}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Model:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.model}
                  onChange={(elem: any) => {
                    setCar({ ...car, model: elem.target.value });
                  }}
                >
                  {carsL.map((e: any) => {
                    if (e.brand === car.brand) {
                      return e.models.map((n: any) => {
                        return (
                          <MenuItem value={n} key={n}>
                            {n}
                          </MenuItem>
                        );
                      });
                    }
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Price:
              <FormControl fullWidth>
                <OutlinedInput
                  error={price}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  onChange={(e: any) => {
                    if (!priceRegex.test(e.target.value)) {
                      setPrice(true);
                    } else {
                      setPrice(false);
                      car.price = e.target.value;
                      setCar(car);
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="line">
              WIN:
              <FormControl fullWidth>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  onChange={(e: any) => {
                    setCar({ ...car, serialNumber: e.target.value });
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div className="car-descr">
            Car description:
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              rows={8}
              onChange={(e: any) => {
                car.description = e.target.value;
                setCar(car);
              }}
            />
          </div>
          <div className="car-photo">
            <img id="file1-p" />
            <label htmlFor="file1">
              <DriveFolderUploadIcon />
            </label>
            <input
              type="file"
              id="file1"
              accept="image/*"
              onChange={(event) => {
                showPreview1(event);
              }}
            />
          </div>
        </div>
      </div>
      <div className="car-details">
        <div className="car-d">Car details:</div>
        <div className="details">
          <div>
            <div className="line">
              Body:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carDetails.carType}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carDetails: {
                          ...elem.carDetails,
                          carType: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {Object.keys(CarBody).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line2">
              Fabrication date:
              <DatePicker
                value={car.carDetails.fabricationYear}
                onChange={(newValue) => {
                  if (newValue) {
                    car.carDetails.fabricationYear = new Date(
                      newValue
                    ).toLocaleDateString();
                    setCar(car);
                  }
                }}
              />
            </div>
            <div className="line">
              Number of doors:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carDetails.doorNumber}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carDetails: {
                          ...elem.carDetails,
                          doorNumber: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Consumption:
              <FormControl fullWidth>
                <OutlinedInput
                  error={cons}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="end">l/100km</InputAdornment>
                  }
                  onChange={(e: any) => {
                    if (!consReg.test(e.target.value)) {
                      setCons(true);
                    } else {
                      setCons(false);
                      setCar((elem) => {
                        return {
                          ...elem,
                          carDetails: {
                            ...elem.carDetails,
                            consumption: Number(e.target.value),
                          },
                        };
                      });
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="line">
              Fuel:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carDetails.fuel}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carDetails: {
                          ...elem.carDetails,
                          fuel: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {Object.keys(Fuel).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Milage on electric:
              <FormControl fullWidth>
                <OutlinedInput
                  error={milage}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="end">km</InputAdornment>
                  }
                  required
                  onChange={(e: any) => {
                    if (!priceRegex.test(e.target.value)) {
                      setMilage(true);
                    } else {
                      setMilage(false);
                      setCar((elem) => {
                        return {
                          ...elem,
                          carDetails: {
                            ...elem.carDetails,
                            milageOnElectric: Number(e.target.value),
                          },
                        };
                      });
                    }
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div>
            <div className="line2">
              Color:
              <MuiColorInput
                value={car.carDetails.color}
                format={format}
                onChange={(e) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carDetails: { ...elem.carDetails, color: e },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              Number of seats:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carDetails.numberOfSeats}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carDetails: {
                          ...elem.carDetails,
                          numberOfSeats: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Trunk capacity:
              <FormControl fullWidth>
                <OutlinedInput
                  error={trunk}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="end">l</InputAdornment>
                  }
                  onChange={(e: any) => {
                    if (!priceRegex.test(e.target.value)) {
                      setTrunk(true);
                    } else {
                      setTrunk(false);
                      setCar((elem) => {
                        return {
                          ...elem,
                          carDetails: {
                            ...elem.carDetails,
                            trunkCapacity: Number(e.target.value),
                          },
                        };
                      });
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="line">
              Traction:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carDetails.traction}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carDetails: {
                          ...elem.carDetails,
                          traction: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {Object.keys(TractionType).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Horse power:
              <FormControl fullWidth>
                <OutlinedInput
                  error={hp}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="end">l</InputAdornment>
                  }
                  onChange={(e: any) => {
                    if (!priceRegex.test(e.target.value)) {
                      setHp(true);
                    } else {
                      setHp(false);
                      setCar((elem) => {
                        return {
                          ...elem,
                          carDetails: {
                            ...elem.carDetails,
                            power: Number(e.target.value),
                          },
                        };
                      });
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="line">
              Engine capacity:
              <FormControl fullWidth>
                <OutlinedInput
                  error={engine}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="end">cm3</InputAdornment>
                  }
                  onChange={(e: any) => {
                    if (!priceRegex.test(e.target.value)) {
                      setEngine(true);
                    } else {
                      setEngine(false);
                      setCar((elem) => {
                        return {
                          ...elem,
                          carDetails: {
                            ...elem.carDetails,
                            engineCapacity: Number(e.target.value),
                          },
                        };
                      });
                    }
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="car-features">
        <div className="car-fea">
        <div className="car-f">Car features:</div>
        <div className="features">
          <div>
            <div className="line">
              Connectivity:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carFeatures.connectivity}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carFeatures: {
                          ...elem.carFeatures,
                          connectivity: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {Object.keys(Connections).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="line">
              Headlights:
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car.carFeatures.headlights}
                  onChange={(e: any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carFeatures: {
                          ...elem.carFeatures,
                          headlights: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {Object.keys(Headlights).map((e: any) => {
                    return (
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
           

          </div>
          <div className="switches">
          <div>
          <div className="line">
              Heated seats:
              <Switch
                checked={car.carFeatures.heatedSeats}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        heatedSeats: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              Disability car:
              <Switch
                checked={car.carFeatures.disabilityCar}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        disabilityCar: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              AC:
              <Switch
                checked={car.carFeatures.ac}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        ac: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              Airbags:
              <Switch
                checked={car.carFeatures.hasAirbags}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        hasAirbags: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>

          </div>
          <div>
          <div className="line">
              Manual gearbox: 
              <Switch
                checked={car.carFeatures.gearboxIsManual}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        gearboxIsManual: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              Smoking vehicle: 
              <Switch
                checked={car.carFeatures.smokingVehicle}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        smokingVehicle: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="line">
              Baby isofix: 
              <Switch
                checked={car.carFeatures.isofixForBaby}
                onChange={(e: any) => {
                  setCar((elem) => {
                    return {
                      ...elem,
                      carFeatures: {
                        ...elem.carFeatures,
                        isofixForBaby: e.target.checked,
                      },
                    };
                  });
                }}
              />
            </div>

                <div className="line3">
                Safety rating:
                <Rating
                name="simple-controlled"
                value={car.carFeatures.safetyrating}
                onChange={(e: any,value:any) => {
                    setCar((elem) => {
                      return {
                        ...elem,
                        carFeatures: {
                          ...elem.carFeatures,
                          safetyrating: value,
                        },
                      };
                    });
                  }}
                />
                </div>




          </div>
          </div>
        </div>
        </div>
        <div></div>
        <div className="submit-car">
        <Alert severity="warning">Insert valid data only ! If u do not, you can risk for a fake or incorrect product on website.</Alert>
        <div>
        <Button className="submit" variant="contained" onClick={handlesubmitCar} >ADD CAR</Button>
        </div>

        </div>
      </div>
      <div className="fil">
      <Snackbar
            anchorOrigin={ {vertical:'top', horizontal:'center' }}
            open={succes}
            onClose={handleClose}
            autoHideDuration={6000}
          >
             <Alert onClose={handleClose} severity="success" sx={{ width: '500px' }}>
    Car added succesfully!
  </Alert>
            </Snackbar>

            {exists ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={exists}
          onClose={handleClose1}
          autoHideDuration={4000}
        >
          <Alert
            onClose={handleClose1}
            severity="error"
            sx={{ width: "500px" }}
          >
            The win inserted is already in our database!
          </Alert>
        </Snackbar>
      ) : null}
      </div>
      <div className="ffot">
        <Footer/>
      </div>
      
    </div>
  );
};

export default CarPage;
