import { UserDecoded } from "../../../context/loginContext";
import { User } from "../../../context/userContext";
import { UserType } from "./Usertype";
import jwt_decode from "jwt-decode";

export function decodeUserJwt(name: string) {
    const jwt = sessionStorage.getItem(name || "");
    const json = jwt ? JSON.parse(jwt) : "";
    const { data } = json;
    let user: UserDecoded = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        userType:UserType.REGULAR,
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
        id:""
    };

    try {
      user = jwt_decode(data?.access_token);
    } catch (error) {
      console.log(error);
    }

    return user;
  }
  export function jsonFromJwt(name: string) {
    const jwt = sessionStorage.getItem(name || "");
    const json = jwt ? JSON.parse(jwt) : "";
    return json;
  }


