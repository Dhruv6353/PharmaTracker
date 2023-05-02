import { BrowserRouter, Switch, Route } from "react-router-dom";

//components
import {} from 'react-bootstrap'
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import Signup from "./components/Signup";
import Login from './components/Login';
import Update from "./components/Update";
import Upload from "./components/Upload";
import LoginState from './controller/loginstate'

function App() {
  return (
    <LoginState>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={Search} />
          <Route exact path='/Signup' component={Signup} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Update' component={Update} />
          <Route exact path='/Upload' component={Upload} />
        </Switch>
      </BrowserRouter>
    </LoginState>
  )
}

export default App;

