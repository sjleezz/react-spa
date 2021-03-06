import React from 'react';
import {Routes, Route} from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';

import './App.css';
import MainPage from "./Components/main";
import InsertDataPage from "./Components/insertData";
import ShowDetailPage from "./Components/showDetail";

const App = function() {
  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log(res.data.test)});
  };

  useEffect(()=>{
    callApi();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/main" element={<MainPage/>}></Route>
      <Route exact path="/insertData" element={<InsertDataPage/>}></Route>
      {/* {<Route exact path="/showDetail" element={<ShowDetailPage/>}></Route>} */}
    </Routes>
    
    
  );
}

export default App;
