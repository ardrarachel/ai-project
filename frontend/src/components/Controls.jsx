import React from 'react';
import './Controls.css';

const Controls = ({ onRun, onReset, isAnimating }) => (
    <div className="controls-panel">
        <h3>Algorithms</h3>
        <p>Select an algorithm to trace the path.</p>
        <div className="button-group">
            <button onClick={() => onRun('bfs')} disabled={isAnimating}>Run BFS</button>
            <button onClick={() => onRun('ucs')} disabled={isAnimating}>Run UCS</button>
            <button onClick={() => onRun('astar')} disabled={isAnimating}>Run A*</button>
        </div>
        <hr />
        <button className="reset-button" onClick={onReset} disabled={isAnimating}>
            Reset Grid
        </button>
    </div>
);

export default Controls;