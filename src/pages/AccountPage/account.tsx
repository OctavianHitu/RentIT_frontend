import "./account.scss";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect, useState } from "react";
import CompleteForm from "../../components/completeForm/completeForm";
import UpdateForm from "../../components/updateForm/updateForm";
import PasswordForm from "../../components/rdForm/passForm";
import Footer from "../../components/footer/footer";
import ReservationsTableForm from "../../components/resHistory/reservationsTable";
const AccountPage: React.FC = (): JSX.Element => {



  const [completeForm, setCompleteForm]=useState(false);
  const [updateForm, setUpdateForm]=useState(false);
  const [passFormd, setPassForm]=useState(false);
  const [resHis, setResHis]=useState(false);

  const complete= document.getElementById("line-part1")
  const update= document.getElementById("line-part2")
  const pass= document.getElementById("line-part3")
  const res= document.getElementById("line-part4")


  useEffect(()=>{
    if(completeForm===true){
      if(complete){
        complete.style.borderBottom="0.3rem solid #21A0A0";     
      }
    }else{
      if(complete){
        complete.style.borderBottom="0.3rem solid #FFFFFF";     
      }
    }
      
  },[completeForm])


  useEffect(()=>{
    if(updateForm===true){
      if(update){
        update.style.borderBottom="0.3rem solid #21A0A0";     
      }
    }else{
      if(update){
        update.style.borderBottom="0.3rem solid #FFFFFF";     
      }
    }
      
  },[updateForm])


  useEffect(()=>{
    if(passFormd===true){
      if(pass){
        pass.style.borderBottom="0.3rem solid #21A0A0";     
      }
    }else{
      if(pass){
        pass.style.borderBottom="0.3rem solid #FFFFFF";     
      }
    }
      
  },[passFormd])


  useEffect(()=>{
    if(resHis===true){
      if(res){
        res.style.borderBottom="0.3rem solid #21A0A0";     
      }
    }else{
      if(res){
        res.style.borderBottom="0.3rem solid #FFFFFF";     
      }
    }
      
  },[resHis])



  return (
    <div className="all-acc">
    <div className="accoutPage">
      <div className="miniHeader">ALWAYS HERE FOR YOU!</div>
      <div className="page-zone">
        <div className="chooser">
          <button id="line-part1" className="line-part1"
          onClick={()=>{
            setCompleteForm(true);
            setUpdateForm(false);
            setPassForm(false)
            setResHis(false);
          }}
          >
            <HowToRegOutlinedIcon />
            Complete account
          </button>
          <button id="line-part2" className="line-part2"
          onClick={()=>{
            setCompleteForm(false);
            setUpdateForm(true);
            setPassForm(false);
            setResHis(false);

          }}
          >
            <ManageAccountsOutlinedIcon />
            Profile
          </button>
          <button id="line-part3" className="line-part3"
          onClick={()=>{
            setCompleteForm(false);
            setUpdateForm(false);
            setPassForm(true);
            setResHis(false);

          }}
          >
            <PasswordOutlinedIcon />
            Change password
          </button>
          <button id="line-part4" className="line-part4"
          onClick={()=>{
            setCompleteForm(false);
            setUpdateForm(false);
            setPassForm(false);
            setResHis(true);

          }}>
            <MenuOutlinedIcon />
            Reservations
          </button>
        </div>
        <div className="info">
            {completeForm?(<CompleteForm/>):null}
            {updateForm?(<UpdateForm/>):null}
            {passFormd?(<PasswordForm/>):null}
            {resHis?(<ReservationsTableForm/>):null}

        </div>
      </div>

    </div>
    <div className="foot">
    <Footer/>

    </div>
    </div>
  );
};

export default AccountPage;
