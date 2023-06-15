import { useContext, useState } from "react";
import "./register-form.scss";
import { UserType } from "../../assets/sass/global/Usertype";
import { Alert } from "@mui/material";
import getAxiosInstance from "../../axios-service";
import Snackbar from "@mui/material/Snackbar";
import { UserContext } from "../../context/userContext";
const RegisterForm: React.FC = (): JSX.Element => {
  const [userRegister, setUserRegister] = useState({
    fisrtName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: UserType.REGULAR,
    address: "",
    companyName: "",
    description: "",
    nrSellingCars: 0,
    country: "",
    city: "",
    zipcode: "",
    avatar: "",
    lang: 0,
    lat: 0,
    isVerified: false,
  });

  const { users } = useContext(UserContext);
  const [showUserOrDealer, setShowUserOrDealer] = useState(true);

  const changeToUser = () => {
    userRegister.userType = UserType.REGULAR;
    userRegister.companyName = "";
    userRegister.email = "";
    userRegister.password = "";
    setUserRegister(userRegister);
    setShowUserOrDealer(true);
  };
  const changeToDealer = () => {
    userRegister.userType = UserType.DEALERSHIP;
    userRegister.firstName = "";
    userRegister.lastName = "";
    userRegister.email = "";
    userRegister.password = "";
    setUserRegister(userRegister);
    setShowUserOrDealer(false);
  };

  const emailregex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const nameRegex = RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);
  const passwordRegex = RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const [showFNameAlter, setShowFNameAlter] = useState(false);
  const [showLNameAlter, setShowLNameAlter] = useState(false);
  const [showPassAlert, setShowPassAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [notOk, setNotOk] = useState(false);
  const [found, setFound] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setConfirm(false);
  };
  const handleClose1 = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotOk(false);
  };
  const handleClose2 = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setFound(false);
  };

  async function handleSignUp(event: any) {
    if (
      showFNameAlter === false &&
      showLNameAlter === false &&
      showPassAlert === false &&
      showEmailAlert === false &&
      showPasswordAlert === false
    ) {
      event.preventDefault();

      if (users.find((elem:any) => elem.email === userRegister.email)) {
        setFound(true);
      } else {
        getAxiosInstance()
          .post("user", JSON.stringify(userRegister))
          .then(() => {
            setConfirm(true);
          });
      }
    } else {
      setNotOk(true);
    }
  }

  return (
    <div className="regform">
      <div className="register-form">
        <div className="register-wr">SIGN UP</div>
        <div className="register-wr-s">
          Please select account type then enter your info!
        </div>
        <div className="selector-role">
          <button
            style={{ backgroundColor: showUserOrDealer ? "#21A0A0" : "white" }}
            onClick={changeToUser}
            className="selection-buttons"
          >
            user
          </button>
          <button
            style={{ backgroundColor: showUserOrDealer ? "white" : "#21A0A0" }}
            onClick={changeToDealer}
            className="selection-buttons"
          >
            dealer
          </button>
        </div>
        {showUserOrDealer ? (
          <div className="inputs">
            <input
              className="part"
              placeholder="FIRST NAME"
              onChange={(event: any) => {
                if (nameRegex.test(event.target.value)) {
                  userRegister.firstName = event.target.value;
                  setUserRegister(userRegister);
                  setShowFNameAlter(false);
                } else {
                  setShowFNameAlter(true);
                }
              }}
            />
            <input
              className="part"
              placeholder="LAST NAME"
              onChange={(event: any) => {
                if (nameRegex.test(event.target.value)) {
                  userRegister.lastName = event.target.value;
                  setUserRegister(userRegister);
                  setShowLNameAlter(false);
                } else {
                  setShowLNameAlter(true);
                }
              }}
            />
            <input
              className="part"
              type={"email"}
              placeholder="EMAIL"
              onChange={(event: any) => {
                if (emailregex.test(event.target.value)) {
                  userRegister.email = event.target.value;
                  setUserRegister(userRegister);
                  setShowEmailAlert(false);
                } else {
                  setShowEmailAlert(true);
                }
              }}
            />
            <input
              className="part"
              type={"password"}
              placeholder="PASSWORD"
              onChange={(event: any) => {
                if (passwordRegex.test(event.target.value)) {
                  userRegister.password = event.target.value;
                  setUserRegister(userRegister);
                  setShowPasswordAlert(false);
                } else {
                  setShowPasswordAlert(true);
                }
              }}
            />
            <input
              className="part"
              type={"password"}
              placeholder="CONFIRM PASSWORD"
              onChange={(event: any) => {
                if (userRegister.password === event.target.value) {
                  setShowPassAlert(false);
                } else {
                  setShowPassAlert(true);
                }
              }}
            />
            <button onClick={handleSignUp}>Register</button>
          </div>
        ) : (
          <div className="inputs">
            <input className="part" placeholder="COMPANY NAME"
            onChange={(event: any) => {
                userRegister.companyName = event.target.value;
                setUserRegister(userRegister);

            }} />
            <input
              className="part"
              type={"email"}
              placeholder="EMAIL"
              onChange={(event: any) => {
                if (emailregex.test(event.target.value)) {
                  userRegister.email = event.target.value;
                  setUserRegister(userRegister);
                  setShowEmailAlert(false);
                } else {
                  setShowEmailAlert(true);
                }
              }}
            />
            <input className="part" type={"password"} placeholder="PASSWORD" 
            onChange={(event: any) => {
              if (passwordRegex.test(event.target.value)) {
                userRegister.password = event.target.value;
                setUserRegister(userRegister);
                setShowPasswordAlert(false);
              } else {
                setShowPasswordAlert(true);
              }
            }}/>
            <input
              className="part"
              type={"password"}
              placeholder="CONFIRM PASSWORD"
              onChange={(event: any) => {
                if (userRegister.password === event.target.value) {
                  setShowPassAlert(false);
                } else {
                  setShowPassAlert(true);
                }
              }}
            />
            <button onClick={handleSignUp}>REGISTER</button>
          </div>
        )}
      </div>
      <div className="alerts">
        {showEmailAlert ? (
          <Alert severity="error">Email incorect!</Alert>
        ) : null}
        {showFNameAlter ? (
          <Alert severity="error">First name alert!</Alert>
        ) : null}
        {showLNameAlter ? (
          <Alert severity="error">Last name alert!</Alert>
        ) : null}
        {showPasswordAlert ? (
          <Alert severity="error">
            Password must contain 1 capital letter, 1 special letter , 1 number
            and at least 8 character!
          </Alert>
        ) : null}
        {showPassAlert ? (
          <Alert severity="error">Password don't match!</Alert>
        ) : null}
        <Snackbar open={confirm} autoHideDuration={2500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account created succesfully!
          </Alert>
        </Snackbar>
        <Snackbar open={notOk} autoHideDuration={2500} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="error" sx={{ width: "100%" }}>
            Fix field error before create an account!
          </Alert>
        </Snackbar>
        <Snackbar open={found} autoHideDuration={2500} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
            Email already used!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default RegisterForm;
