import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import HostDashboard from "./pages/admin/dashboard/HostDashboard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-listings" element={<HostDashboard />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
