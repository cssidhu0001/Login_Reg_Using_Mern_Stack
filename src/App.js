import './App.css';
import Homepage from './Component/homepage/homepage';
import Register from './Component/register/register';
import Login from './Component/Login/login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react"
import VerifyEmail from './Component/Login/verifyemail';

function App() {
  const [user, setloginuser]=useState({}) 
  const [tempuser, settempuser]=useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  exact path="/"> 
            { user && user._id && user.captcha!=="" ? <Homepage user={user} /> : < Login setloginuser = {setloginuser}/>}
          </Route> 
          <Route path="/login"><Login setloginuser={setloginuser} /> </Route>
          <Route path="/register"><Register settempuser={settempuser}/> </Route>
          <Route path="/verifyemail">
            { tempuser && tempuser._id ? <VerifyEmail tempuser={tempuser} /> : <Register settempuser={settempuser}/>  }
          </Route>
        </Switch> 
      </Router>
    </div>
      );
}
      export default App;
