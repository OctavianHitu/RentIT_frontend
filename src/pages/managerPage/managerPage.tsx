import { useContext } from 'react';
import Table from '../../components/table/tableComponent';
import './managerPage.scss'
import { UserContext } from '../../context/userContext';
import TableComponent from '../../components/table/tableComponent';
import { LoginContext } from '../../context/loginContext';

const ManagerPage: React.FC=():JSX.Element =>{


    const {users,setUsers}=useContext(UserContext);


    return(
        <div className='managerPage'>
            <div className='tableMan'>
            <TableComponent
            userList={users}
            />
            </div>
            
        </div>
    )
}

export default ManagerPage;