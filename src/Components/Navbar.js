import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {  removeUserSession } from '../Utils/Common';
import './navbar.css'
export default function Navbar({setAuth: hasAuth, setAuthLoading: hasAuthLoading, soc: socket, ...props}) {
  let history = useHistory();
  //  const user = getUser();
  //  console.log(props.history)
   const isLogged = useCallback((val) => {
    hasAuth(val);
    hasAuthLoading(!val);
    // socket.emit("leave_room",getToken());
  },
  [hasAuth,hasAuthLoading],
);



// handle click event of logout button
const handleLogout = () => {
// socket.disconnect({token: getToken()});
isLogged(false);
removeUserSession();
history.push('/login');
}

    return (
        <div>
          <div id="message_list"></div>
            <div className="header"> 
              {/* <div className="shead1"></div>
              <div className="shead2"></div> */}
            {/* </div> */}
          {(props.auth)?
          <>
          <div className="shead1">
          <div><Link className="link" to='/dashboard'>
          <div className="menu">
              <b>Metro AFC</b>
            </div>
            </Link></div>
            </div>
            <div className="shead2">
            <div><Link className="link" to='/topup'>
            <div className="menu">
              TOP-UP
            </div>
             </Link></div>
            <div><Link className="link" to='/payment-ledger'>
            <div className="menu">
              PAYMENTS
            </div>
            </Link></div>
            <div><Link className="link" to='/travel-ledger'>
            <div className="menu">
              ENTRY/EXITS
            </div>
            </Link></div>
            <div className="link"  onClick={handleLogout}>
            <div className="logout">
            {"Logout"} 
            
            </div>
            </div>
            </div>
            </>
          :
            <>
            
            </>
            }
    
          </div>
        </div>
    )
}
