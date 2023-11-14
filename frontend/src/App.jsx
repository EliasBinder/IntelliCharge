import './App.css'
import VehicleCharging from './pages/VehicleCharging';
import VehicleChargingCompleted from './pages/VehicleChargingCompleted';
import VehicleEntered from './pages/VehicleEntered';
import VehicleCantEnter from './pages/VehicleCantEnter';
import VehicleIsAbusive from './pages/VehicleIsAbusive';
import VehicleBlocking from './pages/VehicleBlocking';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

export default function App() {

  const [darkMode, setDarkMode] = React.useState(true)
  
  function toggleDarkMode() {
    console.log('toggleDarkMode');
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  return (
    <div className={`h-full w-full mx-auto py-2
      ${darkMode ? "dark" : "light"}`}
    >
      <Router>
        <Routes>
          <Route path="/" element={
            <VehicleEntered />
          } />
          <Route path="/charging" element={
            <VehicleCharging />
          } />
          <Route path="/completed" element={
            <VehicleChargingCompleted />
          } />
          <Route path="/cant_enter" element={
            <VehicleCantEnter />
          } />
          <Route path="/abusive" element={
            <VehicleIsAbusive />
          } />
          <Route path="/blocking" element={
            <VehicleBlocking />
          } />
        </Routes>
      </Router>
    </div>
  )
}
