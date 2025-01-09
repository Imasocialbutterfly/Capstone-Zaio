import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
            path="/login" 
        />
      </Routes>
    </BrowserRouter>
  );

};

export default App;
