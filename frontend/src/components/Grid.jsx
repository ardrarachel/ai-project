import React from 'react';
import './Grid.css'; // For styling

// Helper to determine the class for a cell
const getCellClass = (cellValue) => {
    switch (cellValue) {
        case 1: return 'obstacle';
        case 2: return 'start';
        case 3: return 'goal';
        case 4: return 'traffic-light';
        default: return 'road';
    }
};

const Grid = ({ grid, carPos, path }) => {
    // Create a set of path coordinates for quick lookup
    const pathCoords = new Set(path.map(p => `${p.row},${p.col}`));

    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) => (
                <div className="grid-row" key={rowIndex}>
                    {row.map((cell, colIndex) => {
                        const isCarHere = carPos.row === rowIndex && carPos.col === colIndex;
                        const isPath = pathCoords.has(`${rowIndex},${colIndex}`);
                        
                        return (
                            <div
                                key={colIndex}
                                className={`grid-cell ${getCellClass(cell)}`}
                            >
                                {isPath && <div className="path-marker"></div>}
                                {isCarHere && <div className="car"></div>}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;