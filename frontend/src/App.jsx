import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Grid from './components/Grid';
import Controls from './components/Controls';
import StatsPanel from './components/StatsPanel';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
    // --- STATE MANAGEMENT ---
    const [gameState, setGameState] = useState('menu');
    const [gridData, setGridData] = useState(null);
    const [path, setPath] = useState([]);
    const [carPos, setCarPos] = useState(null);
    const [stats, setStats] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [trafficLightState, setTrafficLightState] = useState('red');

    // Refs for stable animation state
    const animationIntervalRef = useRef(null);
    const stepRef = useRef(0);
    const trafficLightStateRef = useRef(trafficLightState);

    // Keep the traffic light ref updated
    useEffect(() => {
        trafficLightStateRef.current = trafficLightState;
    }, [trafficLightState]);

    // --- CORE FUNCTIONS ---
    const loadNewGrid = async () => {
        setGameState('loading');
        try {
            const response = await axios.get(`${API_URL}/new-grid`);
            setGridData(response.data);
            setCarPos(response.data.startPos);
            setPath([]);
            setStats({});
            setGameState('simulation');
        } catch (error) { console.error("Failed to load new grid:", error); setGameState('menu'); }
    };

    const handleRunAlgorithm = async (algorithm) => {
        if (isAnimating) return;
        setCarPos(gridData.startPos);
        try {
            const response = await axios.post(`${API_URL}/calculate-path`, {
                grid: gridData.layout, algorithm, startPos: gridData.startPos, goalPos: gridData.goalPos
            });
            setStats(response.data.stats || {});
            setPath(response.data.path || []); // Setting the path triggers the animation useEffect
        } catch (error) { console.error("Error calculating path:", error); }
    };

    // --- TRAFFIC LIGHT TIMER ---
    useEffect(() => {
        const timer = setInterval(() => {
            setTrafficLightState(prevState => (prevState === 'red' ? 'green' : 'red'));
        }, 2000); // 2 second cycle
        return () => clearInterval(timer);
    }, []);

    // --- FINAL AND CORRECTED ANIMATION LOGIC ---
    useEffect(() => {
        // Always stop any previous animation when this effect runs
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
        }

        if (!path || path.length === 0) {
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        stepRef.current = 0;
        setCarPos(path[0]);

        animationIntervalRef.current = setInterval(() => {
            const currentStep = stepRef.current;
            
            if (currentStep + 1 >= path.length) {
                clearInterval(animationIntervalRef.current);
                setIsAnimating(false);
                return;
            }
            
            const nextPos = path[currentStep + 1];
            const nextCellType = gridData.layout[nextPos.row][nextPos.col];

            // Check the current light color using the ref
            if (nextCellType === 4 && trafficLightStateRef.current === 'red') {
                return; // PAUSE if the next step is a red light
            }
            
            // If the light is green or it's not a light, proceed
            stepRef.current += 1;
            setCarPos(path[stepRef.current]);

        }, 200); // Animation speed

        // Cleanup function
        return () => {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
            }
        };
    }, [path]); // This effect now ONLY runs when a new path is set

    // --- RENDER LOGIC (No changes below) ---
    if (gameState === 'menu') {
        return (
            <div className="app">
                <div className="menu">
                    <h1>AI Pathfinding Simulation</h1>
                    <button className="game-button start-button" onClick={loadNewGrid}>Start Simulation</button>
                </div>
            </div>
        );
    }
    if (gameState === 'loading' || !gridData) {
        return <div className="app"><div className="game-status">Generating New Level...</div></div>;
    }
    return (
        <div className="app">
            <div className="main-content">
                <Grid grid={gridData.layout} carPos={carPos} path={path} trafficLightState={trafficLightState} />
                <div className="sidebar">
                    <Controls onRun={handleRunAlgorithm} onReset={loadNewGrid} isAnimating={isAnimating} />
                    <StatsPanel stats={stats} />
                </div>
            </div>
        </div>
    );
}

export default App;