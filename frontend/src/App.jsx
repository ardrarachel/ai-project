import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from './components/Grid';
import Controls from './components/Controls';
import StatsPanel from './components/StatsPanel';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
    const [grid, setGrid] = useState(null);
    const [startPos, setStartPos] = useState(null);
    const [carPos, setCarPos] = useState(null);
    const [path, setPath] = useState([]);
    const [stats, setStats] = useState({});

    // Fetch the initial grid layout when the app loads
    useEffect(() => {
        axios.get(`${API_URL}/grid`).then(response => {
            const { layout, startPos } = response.data;
            setGrid(layout);
            setStartPos(startPos);
            setCarPos(startPos);
        });
    }, []);

    // --- THIS IS THE NEW ANIMATION LOGIC ---
    // This effect runs whenever the 'path' state changes
    useEffect(() => {
        if (!path || path.length === 0) return;

        // Reset car to the start of the new path
        setCarPos(path[0]); 

        let step = 1;
        const intervalId = setInterval(() => {
            if (step < path.length) {
                setCarPos(path[step]); // Move car to the next step
                step++;
            } else {
                clearInterval(intervalId); // Stop the animation when the path is done
            }
        }, 200); // Animation speed: 200ms per step

        // Cleanup function to stop the animation if the component unmounts
        return () => clearInterval(intervalId);
    }, [path]); // Dependency array: this code re-runs only when 'path' changes

    const handleRunAlgorithm = async (algorithm) => {
        // --- THIS IS THE FIX ---
        // 1. Clear the previous path from the screen.
        setPath([]); 
        // 2. Instantly move the car back to the start position.
        setCarPos(startPos); 

        try {
            // This part stays the same
            const response = await axios.post(`${API_URL}/calculate-path`, { algorithm });
            const { path: newPath, stats: newStats } = response.data;
            
            setStats(newStats || {});
            setPath(newPath || []); // This will now reliably trigger the animation
        } catch (error) {
            console.error("Error calculating path:", error);
            setPath([]);
            setStats({ name: algorithm, error: 'Path not found' });
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