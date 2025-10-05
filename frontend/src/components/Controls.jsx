// src/components/Controls.jsx
import React from 'react';
import './Controls.css';

const Controls = ({ onRun }) => {
    return (
        <div className="controls-panel">
            <h3>Controls</h3>
            <p>Select an algorithm to find the path.</p>
            <div className="button-group">
                <button onClick={() => onRun('bfs')}>Run BFS</button>
                <button onClick={() => onRun('ucs')}>Run UCS</button>
                <button onClick={() => onRun('astar')}>Run A*</button>
            </div>
        </div>
    );
};

export default Controls;