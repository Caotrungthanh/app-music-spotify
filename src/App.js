import React from "react";
import '../src/styles/css/style.css'
import Login from "./components/Login/Login";
import Home from "./components/Home";
import {Switch, Route} from "react-router-dom";

const App = () => {
    return (
      <div>
        <Login/>
        <Switch>
          <Route path="/home" exact component={Home}></Route>
        </Switch>
      </div>
    );
  }
export default App;