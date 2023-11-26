import './App.css'
import VehicleCharging from './pages/VehicleCharging';
import VehicleChargingCompleted from './pages/VehicleChargingCompleted';
import VehicleEntered from './pages/VehicleEntered';
import VehicleCantEnter from './pages/VehicleCantEnter';
import VehicleIsAbusive from './pages/VehicleIsAbusive';
import VehicleBlocking from './pages/VehicleBlocking';
import VehicleEntering from './pages/VehicleEntering';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import useWebSocket from 'react-use-websocket';

export default function App() {

  const navigate = useNavigate();

  useWebSocket(
    'ws://localhost:3001/update',
    { 
        share: true,
        onMessage: (event) => {
          event = JSON.parse(event.data);
          switch (event.name) {
            case "plate_detected":
              const isElectric = event.plate.toLowerCase().endsWith('e');
              if (!isElectric) {
                console.log("Plate detected: ", event.plate);
                navigate('/cant_enter');
              }
              break;
            case "light_theme":
              document.getElementById('app').classList.remove('dark', 'light');
              document.getElementById('app').classList.add('light');
              break;
            case "dark_theme":
              document.getElementById('app').classList.remove('dark', 'light');
              document.getElementById('app').classList.add('dark');
              break;
            case "charging_started":
              navigate('/charging');
              break;
            case "charging_completed":
              navigate('/completed');
              break;
            case "vehicle_abusive":
              navigate('/abusive');
              break;
            case "vehicle_entering":
              navigate('/entering');
              break;
          }
        },
        reconnectAttempts: 1000,
        reconnectInterval: 1000,
        shouldReconnect: () => true,
    }
  );

  return (
    <div className={"h-full w-full mx-auto py-2 dark"} id='app'>
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
        <Route path="/entering" element={
          <VehicleEntering />
        } />
      </Routes>
    </div>
  )
}
