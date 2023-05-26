import "./account.scss";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import CompleteForm from "../../components/completeForm/completeForm";
import Rentit from "../../components/rentit/rentit";
import UpdateForm from "../../components/updateForm/updateForm";
import PasswordForm from "../../components/rdForm/passForm";
import Footer from "../../components/footer/footer";
const AccountPage: React.FC = (): JSX.Element => {

  const btn = document.getElementById("line-part");
  btn?.addEventListener("after", function onClick() {
    btn.style.borderBottomColor = "$green-l";
  });

  const [completeForm, setCompleteForm]=useState(false);
  const [updateForm, setUpdateForm]=useState(false);
  const [passFormd, setPassForm]=useState(false);

  return (
    <div className="all-acc">
    <div className="accoutPage">
      <div className="miniHeader">ALWAYS HERE FOR YOU!</div>
      <div className="page-zone">
        <div className="chooser">
          <button className="line-part"
          onClick={()=>{
            setCompleteForm(true);
            setUpdateForm(false);
            setPassForm(false)
          }}
          >
            <HowToRegOutlinedIcon />
            Complete account
          </button>
          <button className="line-part"
          onClick={()=>{
            setCompleteForm(false);
            setUpdateForm(true);
            setPassForm(false)
          }}
          >
            <ManageAccountsOutlinedIcon />
            Profile
          </button>
          <button className="line-part"
          onClick={()=>{
            setCompleteForm(false);
            setUpdateForm(false);
            setPassForm(true)
          }}
          >
            <PasswordOutlinedIcon />
            Change password
          </button>
          <button className="line-part">
            <MenuOutlinedIcon />
            History
          </button>
        </div>
        <div className="info">
            {completeForm?(<CompleteForm/>):null}
            {updateForm?(<UpdateForm/>):null}
            {passFormd?(<PasswordForm/>):null}

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
