import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Main from "./Components/main";
import InsertData from "./Components/insertData";
import ShowDetail from "./Components/showDetail";

const App = function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main" Component={Main}></Route>
        <Route exact path="/insertData" Component={InsertData}></Route>
        <Route exact path="/showDetail" Component={ShowDetail}></Route>
      </Switch>
    </Router>
    
    

  );
}

export default App;
