import './App.css';
import InsertPumpPage from './pages/InsertPumpPage';
import WarningPage from './pages/WarningPage';
import IssuesPage from './pages/IssuesPage';
import ChargingPage from './pages/ChargingPage';
import "@fontsource/inter"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GastronomyPage from './pages/GastronomyPage';
import ShopsPage from './pages/ShopsPage';
import DiscoverPage from './pages/DiscoverPage';
import ActivitiesPage from './pages/ActivitiesPage';


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InsertPumpPage />} />
                <Route path="/warning" element={<WarningPage />} />
                <Route path="/help" element={<IssuesPage />} />
                <Route path="/charging" element={<ChargingPage />} />
                <Route path="*" element={<IssuesPage />} />
                <Route path="/gastronomy" element={<GastronomyPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/shops" element={<ShopsPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
            </Routes>
        </Router>
    );
}


export default AppRouter;
