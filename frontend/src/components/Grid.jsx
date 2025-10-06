import React from 'react';
import './Grid.css';

const getCellClass = (cellValue) => {
    switch (cellValue) {
        case 1: return 'obstacle';
        case 2: return 'start';
        case 3: return 'goal';
        case 4: return 'traffic-light';
        default: return 'road';
    }
};

// --- UPDATED: Grid no longer manages its own traffic light state ---
const Grid = ({ grid, carPos, path, trafficLightState }) => {
    if (!grid || !carPos) {
        return <div>Loading Grid...</div>;
    }

    const pathCoords = new Set(path.map(p => `${p.row},${p.col}`));

    return (
        <div className="grid-container" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 30px)` }}>
            {grid.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((cell, colIndex) => {
                        const isCarHere = carPos.row === rowIndex && carPos.col === colIndex;
                        const isPath = pathCoords.has(`${rowIndex},${colIndex}`);
                        
                        let cellClassName = `grid-cell ${getCellClass(cell)}`;
                        // Use the prop to set the color
                        if (cell === 4) {
                            cellClassName += ` ${trafficLightState}`;
                        }

                        return (
                            <div key={colIndex} className={cellClassName}>
                                {isPath && <div className="path-marker"></div>}
                                {isCarHere && <div className="car">🚗</div>}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Grid;