import { useContext, useMemo, useState } from "react";
import "./completeForm.scss";
import { LoginContext } from "../../context/loginContext";
import countryList from "react-select-country-list";
import { Alert, FormControl, MenuItem,Select, Snackbar, TextField } from "@mui/material";
import MapPicker from "react-google-map-picker";

import getAxiosInstance from "../../axios-service";
import { UserType } from "../../assets/sass/global/Usertype";
import { citiesRomania } from "../../assets/sass/global/enums/orase";
import { carList } from "../../assets/sass/global/enums/Cars";
import { UserContext } from "../../context/userContext";

const CompleteForm: React.FC = (): JSX.Element => {
  const { user } = useContext(LoginContext);
  const {getUsers}=useContext(UserContext);


  const phoneRegex = RegExp(
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
  );
  const zipRegex = RegExp(/^[0-9]*$/);
  const [alertPh, setAlertPh] = useState(false);
  const [zipAlert, setZipAlert] = useState(false);

  const [all, setAll] = useState({
    country: "Romania",
    phoneNumber: "",
    address: "",
    city: "",
    zipcode: "",
    license: "",
    lang: 0,
    lat: 0,
  });




  const [submit, setSubmit] = useState(false);
  const [succes, setSucces] = useState(false);

  function Submit() {
    console.log(all);
    if(user?.userType===UserType.REGULAR){
      if (
        all.address !== "" &&
        all.phoneNumber !== "" &&
        all.city !== "" &&
        all.zipcode !== "" &&
        all.license !== "" 
      ) {
        getAxiosInstance()
          .put("/user/" + user?.id, JSON.stringify(all))
          .then(() => {
            getUsers();
            setSucces(true);
          });
      } else {
        setSubmit(true);
      }
    }
    if(user?.userType===UserType.DEALERSHIP){
      if (
        all.address !== "" &&
        all.phoneNumber !== "" &&
        all.city !== "" &&
        all.zipcode !== "" 
      ) {
        getAxiosInstance()
          .put("/user/" + user?.id, JSON.stringify(all))
          .then(() => {
            setSucces(true);
          });
      } else {
        setSubmit(true);
      }
    }

    
  }

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

  const handleClose = (e: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmit(false);
    setSucces(false);
  };

  return (
    <div className="completeForm">
        <div className="complete-form2">
            <div className="all-name-welcome-formC">
      <div className="form-name">Complete Account</div>
      {user?.isVerified ? (
        <Alert severity="success" sx={{ width: "500px" }}>
          Your account si completed and confirmed !
        </Alert>
      ) : (
        <div className="welcome">
          {" "}
          Welcome! Insert correct info because after verification they can't be
          changed!
        </div>
      )}
      <div className="formC">
        
        <div className="line">
          <div>
            Telephone:
            {alertPh ? <div className="inc">Incorrect!</div> : null}
          </div>
          <TextField
            id="outlined-basic"
            placeholder={user?.phoneNumber}
            onChange={(e: any) => {
              if (phoneRegex.test(e.target.value)) {
                all.phoneNumber = e.target.value;
                setAll(all);
                setAlertPh(false);
              } else {
                setAlertPh(true);
              }
            }}
          />
        </div>
        <div className="line">
          Country:
          {user?.userType===UserType.DEALERSHIP?(
            <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Romania"
            disabled
          />
          ):(

            <TextField
            id="outlined-basic"
            variant="outlined"
            value={all.country}
                  onChange={(elem: any) => {
                    setAll({ ...all, country: elem.target.value });
                  }}
          />
          )}
          
        </div>
        <div className="line">
          City:
          {user?.userType===UserType.DEALERSHIP?(

          <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={all.city}
                  onChange={(elem: any) => {
                    setAll({ ...all, city: elem.target.value });
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
              </FormControl>):
              (
                <TextField
            id="outlined-basic"
            variant="outlined"
            value={all.city}
                  onChange={(elem: any) => {
                    setAll({ ...all, city: elem.target.value });
                  }}
          />
              )}
        </div>
        <div className="line">
          Address:
          <TextField
            variant="outlined"
            placeholder={user?.address}

            onChange={(e: any) => {
              setAll({...all,address:e.target.value});
            }}
          />
        </div>
        <div className="line">
          <div>
            ZipCode:
            {zipAlert ? <div className="inc">Incorrect!</div> : null}
          </div>
          <TextField
            id="outlined-basic"
            placeholder={user?.zipcode}

            onChange={(e: any) => {
              if (zipRegex.test(e.target.value)) {
                all.zipcode = e.target.value;
                setAll(all);
                setZipAlert(false);
              } else {
                setZipAlert(true);
              }
            }}
          />
        </div>
        {user?.userType === UserType.REGULAR ? (
          <div className="line">
            Upload driver license:
            <input
              className="fileInput"
              id="fileInput"
              type="file"
              onChange={async (event: any) => {
                const base64 = await convertBase64(event.target.files[0]);
                all.license = String(base64);
                setAll(all);
              }}
            />
          </div>
        ) : null}
      </div>
      </div>




      {user?.userType === UserType.DEALERSHIP ? (
        <div className="map-pick">
          
        </div>
      ) : null}
</div>
{user?.userType===UserType.DEALERSHIP&&!user?.isVerified?(
<div className="warn-verif">
    After submiting your account completion, please send your all your documents that need to be provided at <span style={{color:'blue'}}>rentit.web.conmpany@gmail.com</span> .
    Your info will be verified and if it's all good your account will be set as verfiied.
    </div>
):null}

      <div>
        {user?.isVerified ? null : (
          <div>
            {user?.isVerified ? null : (
              <button onClick={Submit} className="confirm-c">
                Confirm account!
              </button>
            )}
          </div>
        )}
      </div>
      {submit ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={submit}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "500px" }}>
            You need to fill all fields!
          </Alert>
        </Snackbar>
      ) : null}
      {succes ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={succes}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "500px" }}
          >
            Accout complete! Wait for manager approval to rent cars!
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default CompleteForm;
