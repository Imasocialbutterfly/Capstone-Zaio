import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import HostDashboard from "./pages/admin/dashboard/HostDashboard";
import EditListing from "./pages/admin/EditListing";
import LocationsPage from "./pages/admin/LocationsPage";
import ReservationPage from "./pages/admin/ReservationPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-listings" element={<HostDashboard />}/>
          <Route path="/edit-listing/:id" element={<EditListing />}/>
          <Route path="/locations" element={<LocationsPage />}/>
          <Route path="/listing/:id" element={<ReservationPage />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
