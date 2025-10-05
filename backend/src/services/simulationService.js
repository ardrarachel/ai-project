// src/services/simulationService.js

// We'll import the actual algorithm functions here
import { bfs, ucs, aStar } from '../algorithms/pathfinding.js';

// --- The Single Source of Truth for the Simulation State ---
const MAP_LAYOUT = [
    [2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 4, 1, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 4, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 3],
];

// Helper to find a value in the grid
const findPosition = (value) => {
    for (let r = 0; r < MAP_LAYOUT.length; r++) {
        for (let c = 0; c < MAP_LAYOUT[r].length; c++) {
            if (MAP_LAYOUT[r][c] === value) {
                return { row: r, col: c };
            }
        }
    }
    return null;
};

const START_POS = findPosition(2);
const GOAL_POS = findPosition(3);
const INITIAL_FUEL = 50;

/**
 * Provides the initial data needed by the frontend to render the grid.
 * @returns {object} The initial grid state.
 */
export const getInitialGrid = () => {
    return {
        layout: MAP_LAYOUT,
        startPos: START_POS,
        goalPos: GOAL_POS,
        initialFuel: INITIAL_FUEL,
    };
};

/**
 * Selects and runs the specified pathfinding algorithm.
 * @param {string} algorithm - The name of the algorithm to run ('bfs', 'ucs', 'astar').
 * @returns {object} An object containing the calculated path and statistics.
 */
export const calculatePath = (algorithm) => {
    let result = { path: null, stats: {} };

    // This acts as a controller to select the correct algorithm
    switch (algorithm.toLowerCase()) {
        case 'bfs':
            // Note: The actual algorithm functions would be in pathfinding.js
            // result = bfs(MAP_LAYOUT, START_POS, GOAL_POS);
            // For now, we'll return mock data
            result = {
                path: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}], // Mock path
                stats: { name: 'BFS', cost: 25, explored: 150 }
            };
            break;
        case 'ucs':
            // result = ucs(MAP_LAYOUT, START_POS, GOAL_POS, INITIAL_FUEL);
             result = {
                path: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}], // Mock path
                stats: { name: 'UCS', cost: 22, explored: 95 }
            };
            break;
        case 'astar':
            // result = aStar(MAP_LAYOUT, START_POS, GOAL_POS, INITIAL_FUEL);
             result = {
                path: [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}], // Mock path
                stats: { name: 'A*', cost: 22, explored: 78 }
            };
            break;
        default:
            throw new Error('Invalid algorithm specified.');
    }

    return result;
};