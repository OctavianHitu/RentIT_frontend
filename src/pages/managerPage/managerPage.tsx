import { useContext, useState } from 'react';
import './managerPage.scss'
import { User, UserContext } from '../../context/userContext';
import TableComponent from '../../components/table/tableComponent';
import { UserType } from '../../assets/sass/global/Usertype';

const ManagerPage: React.FC=():JSX.Element =>{


    const {users,setUsers,getUsers}=useContext(UserContext);

    const regularUsers= users.filter((e:User)=>{
        return e.userType===UserType.REGULAR;
    })
    const dealerUsers= users.filter((e:User)=>{
        return e.userType===UserType.DEALERSHIP;
    })
    const [userTable,setUsertable]=useState(true);
    const [dealerTable,setDealerTable]=useState(false);



    return(
        <div className='managerPage'>
            <div className='selections-for-manager'>
                <button className='btn-for-manager-sel' onClick={()=>{setUsertable(true)
                setDealerTable(false)}}>
        USERS
                </button>
                <button className='btn-for-manager-sel' onClick={()=>{setDealerTable(true)
                setUsertable(false)
                }}>
        DEALERS
                </button>
                <button className='btn-for-manager-sel'>
        CARS
                </button>
            </div>
            <div className='tableMan'>

            {userTable?(
                <TableComponent
            userList={regularUsers}
            isUserNormal={true}
            />
            ):null}

            {dealerTable?(
                <TableComponent
                userList={dealerUsers}
                isUserNormal={false}
                />
            ):null}
            
            </div>
            
        </div>
    )
}

export default ManagerPage;