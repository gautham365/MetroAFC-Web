
// eslint-disable-next-line
import { BrowserRouter, Switch, Route } from "react-router-dom";
import  { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Components/Home";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Updatedetails from "./Components/Updatedetails";
import "./App.css";
import Travelledger from "./Components/Travelledger";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_HOST}/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.username, response.data.name);
        setAuthLoading(false);
        setAuth(true);
        // socket.emit("test","hi");
        // setTimeout(()=>{socket.emit("test","1");setTimeout(()=>{socket.emit("test","2");setTimeout(()=>{socket.emit("test","3");setTimeout(()=>{socket.emit("test","4");setTimeout(()=>{socket.emit("test","5");},500);},500);},500);},500);},500);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
        setAuth(false);
      });
      return () => {
        // socket.disconnect({token: getToken()});
      }
  }, []);

  if (authLoading && getToken()) {
    return <div className="loadclass"><span className="loader-11"></span></div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar  auth={auth} 
          setAuth={setAuth}
          setAuthLoading={setAuthLoading}
          
          //  soc={socket}
           />
          {/* <Footer /> */}
          <div className="content">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <PrivateRoute
                exact
                path="/"
                component={Home}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              {/* <Route path="/home" component={Home} /> */}
         
              <PublicRoute
                path="/home"
                component={Login}
              />
              <PublicRoute
                path="/login"
                component={Login}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />

              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              <PrivateRoute
                path="/travel-ledger"
                component={Travelledger}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              <PrivateRoute
                path="/updatedetails"
                component={Updatedetails}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
