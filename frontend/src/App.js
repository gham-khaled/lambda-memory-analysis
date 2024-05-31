import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnalysisTable from './components/home';
import ReportDetails from './components/reportDetails';
import LaunchAnalysis from "./components/lambdaList";
// TODO: Margin/Padding fix
// TODO: Center Spinner
// TODO: Nav bar


const App = () => (
    <Router>
        <div>
            <h1>Analysis Dashboard</h1>
            <Routes>
                <Route path="/" element={<AnalysisTable/>}/>
                <Route path="/report/:reportID" element={<ReportDetails/>}/>
                <Route path="/lambda" element={<LaunchAnalysis/>}/>
            </Routes>
        </div>
    </Router>
);

export default App;
