// src/components/StatsPanel.jsx
import React from 'react';
import './StatsPanel.css';

const StatsPanel = ({ stats }) => {
    return (
        <div className="stats-panel">
            <h3>Statistics</h3>
            <div className="stats-grid">
                <span>Algorithm:</span>
                <span>{stats.name || 'N/A'}</span>

                <span>Path Cost:</span>
                <span>{stats.cost || 'N/A'}</span>

                <span>Nodes Explored:</span>
                <span>{stats.explored || 'N/A'}</span>
            </div>
        </div>
    );
};

export default StatsPanel;