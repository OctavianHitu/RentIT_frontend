import { useContext, useMemo, useState } from 'react';
import './completeForm.scss'
import { LoginContext } from '../../context/loginContext';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { MuiTelInput  } from 'mui-tel-input'
import { Alert, Snackbar, TextField } from '@mui/material';
import MapPicker from 'react-google-map-picker'
import { MuiFileInput } from 'mui-file-input'
import { readFile } from 'fs';
import { stringify } from 'querystring';
import PhoneInput from 'react-phone-input-2'
import getAxiosInstance from '../../axios-service';

const CompleteForm: React.FC=(): JSX.Element =>{

    const {user}= useContext(LoginContext);

    const [country, setCountry] = useState({value:"",label:""})

    const phoneRegex=RegExp(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/) 
    const zipRegex=RegExp(/^[0-9]*$/);
    const [alertPh,setAlertPh] =useState(false);
    const [zipAlert,setZipAlert] =useState(false);

    const [all,setAll]=useState({
        country:"",
        phoneNumber:'',
        address:"",
        city:"",
        zipcode:"",
        license:"",
        lang:"",
        lat:""
    })
   


    const options = useMemo(() => countryList().getData(), [])
    function inputCountry(e:any){ 
        setCountry(e) 
    }

    function handleChangeLocation (lat:any, lng:any){
        all.lang=lng;
        all.lat=lat;
        setAll(all);
    }
   
    const [submit,setSubmit]=useState(false)
    const [succes,setSucces]=useState(false)


    function Submit(){

        all.country=country.label;
  
        if(all.address!==""&&all.country!==""&&all.phoneNumber!==""&&
        all.city!==""&&all.zipcode!==""&&all.license!==""&&
        all.lang!==""&&all.lat!==""){
            console.log(all);
            getAxiosInstance()
            .put("/user/" + user?.id, JSON.stringify(all)).then(()=>{setSucces(true)})
            
        }else{
            setSubmit(true);

        }


    }
        

    const convertBase64 = (file:File) => {
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
    
    const handleClose=(e:any,reason?:string)=>{
        if(reason==='clickaway'){
            return
        }
        setSubmit(false)
        setSucces(false);
    }
    
    
return(
    <div className="completeForm">
        <div className='form-name'>Complete Account</div>
        {user?.isVerified?(

    <Alert severity="success"  sx={{ width: '700px' }}>
    Your account si completed and confirmed !
    </Alert>
            
        ):(

<div className='welcome'> Welcome! Insert  correct info because after verification they can't be changed!</div>

        )}
        <div className='formC'>
            <div className='line'>
            Country:
             <Select  options={options} value={country} onChange={e=>{inputCountry(e)}
              } />
            </div>
            <div className='line'>
                <div>
                Telephone:
                {alertPh?(<div className='inc'>Incorrect!</div>):null}
                </div>
            <TextField id="outlined-basic" onChange={(e:any)=>{
                if(phoneRegex.test(e.target.value))
                {
                    all.phoneNumber=e.target.value;
                setAll(all);
                setAlertPh(false);
                }else{
                    setAlertPh(true);
                }
                
            }}/>
             
            </div>
            <div className='line'>
            City:
            <TextField id="outlined-basic"  variant="outlined" onChange={(e:any)=>{
                all.city=e.target.value;
                setAll(all);
            }} />
            </div>
            <div className='line'>
            Address:
            <TextField   variant="outlined"onChange={(e:any)=>{
                all.address=e.target.value;
                setAll(all);
            }} />
            </div>
            <div className='line'>
                <div>
                ZipCode:
                {zipAlert?(<div className='inc'>Incorrect!</div>):null}

                </div>
            <TextField id="outlined-basic" onChange={(e:any)=>{
                if(zipRegex.test(e.target.value)){
                    all.zipcode=e.target.value;
                    setAll(all);
                    setZipAlert(false)
                }else{
                    setZipAlert(true)
                }

            }}/>

            </div>
            <div className='line'>
                Upload license:
            <input className='fileInput' id='fileInput'  type='file' onChange={
            async (event:any)=>{const base64 = await convertBase64(event.target.files[0]);
            all.license=String(base64);
        setAll(all);}}/>
        </div>


        </div>
        
        <div className='map-pick'>
            <div >
                Pick your location on map to be more accurate for the client!
            </div>
        <MapPicker defaultLocation={{ lat: 46, lng: 23}}
          zoom={5}
          style={{height:'500px',width:'800px'}}
          onChangeLocation={handleChangeLocation} 
          
          apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
        </div>
<div>
    {user?.isVerified?null:(
        <div>
            {user?.isVerified?null:(<button onClick={Submit} className='confirm-c'>Confirm account!</button>)}
        

            </div>
    )}

</div>
{submit?(
    <Snackbar
            anchorOrigin={ {vertical:'top', horizontal:'center' }}
            open={submit}
            onClose={handleClose}
            autoHideDuration={6000}
          >
             <Alert onClose={handleClose} severity="error" sx={{ width: '500px' }}>
    You need to fill all fields!
  </Alert>
            </Snackbar>
):null}
{succes?(
    <Snackbar
            anchorOrigin={ {vertical:'top', horizontal:'center' }}
            open={succes}
            onClose={handleClose}
            autoHideDuration={6000}
          >
             <Alert onClose={handleClose} severity="success" sx={{ width: '500px' }}>
    Accout complete! Wait for manager approval to rent cars!
  </Alert>
            </Snackbar>
):null}

    </div>
)

}

export default CompleteForm; 

