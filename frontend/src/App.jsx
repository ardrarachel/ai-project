import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from './components/Grid';
import Controls from './components/Controls';
import StatsPanel from './components/StatsPanel';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
    const [grid, setGrid] = useState(null);
    const [carPos, setCarPos] = useState(null);
    const [path, setPath] = useState([]);
    const [stats, setStats] = useState({});

    // Fetch the initial grid layout when the app loads
    useEffect(() => {
        axios.get(`${API_URL}/grid`).then(response => {
            const { layout, startPos } = response.data;
            setGrid(layout);
            setCarPos(startPos);
        });
    }, []);

    const handleRunAlgorithm = async (algorithm) => {
        try {
            // Tell the backend to calculate the path
            const response = await axios.post(`${API_URL}/calculate-path`, { algorithm });
            const { path, stats } = response.data;
            
            setPath(path || []);
            setStats(stats || {});
            // Reset car to start and then trigger animation if path is found
            if (path) {
                // Animation logic would go here, maybe using setInterval or requestAnimationFrame
            }
        } catch (error) {
            console.error("Error calculating path:", error);
        }
    };

    if (!grid) return <div>Loading...</div>;

    return (
        <div className="app">
            <h1>AI Autonomous Car Simulation</h1>
            <div className="main-content">
                <Grid grid={grid} carPos={carPos} path={path} />
                <div className="sidebar">
                    <Controls onRun={handleRunAlgorithm} />
                    <StatsPanel stats={stats} />
                </div>
            </div>
        </div>
    );
}

export default App;