
import Header from "../components/header/header";
import FirstPage from "../pages/hello-page/first-page";
import { Route, Routes } from "react-router-dom";
import "./main.scss"
import LoginRegister from "../pages/login-register-page/login-register";
import AccountPage from "../pages/AccountPage/account";
import { UserProvider } from "../context/userContext";
import { CarProvider } from "../context/carContext";
import { LoginProvider } from "../context/loginContext";
import ManagerPage from "../pages/managerPage/managerPage";
import CarPage from "../pages/CarInsertestPage/CarPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from "../components/footer/footer";
import OffersPage from "../pages/Offers/offers";
import FullModalCar from "../components/FullCarModal/FullCarModal";
import SellerPage from "../pages/SellerPage/sellerPage";
const Main =()=>{
    return(
        <div className="main">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LoginProvider>
            <CarProvider>
            <UserProvider>
            <Header/>
            <Routes>
            
                <Route 
                path="/loginRegister"
                element={<LoginRegister/>}
                />
                <Route 
                path="/"
                element={<FirstPage/>}
                />
                <Route 
                path="/welcome"
                element={<FirstPage/>}
                />
                <Route
                path="/account"
                element={<AccountPage/>}
                />
                <Route
                path="/manager"
                element={<ManagerPage/>}
                />
                <Route
                path="/carPage"
                element={<CarPage />}/>
                <Route
                path="/offers"
                element={<OffersPage/>}
                />
                <Route
                path="/fullModalCar/:id"
                element={<FullModalCar/>}
                />
                <Route
                path="/sellerPage/:id"
                element={<SellerPage/>}
                />
            </Routes>
            </UserProvider>
            </CarProvider>
            </LoginProvider>
            </LocalizationProvider>
        </div>
    )

}

export default Main;