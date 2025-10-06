import { aStar } from '../algorithms/pathfinding.js';

const GRID_SIZE = 15;
const OBSTACLE_DENSITY = 0.3; // 30% obstacles

// This function creates a new, random, and solvable grid
export function generateRandomGrid() {
    let grid, path, startPos, goalPos;
    do {
        // Create an empty grid
        grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
        
        // Place Start and Goal
        startPos = { row: 1, col: 1 };
        goalPos = { row: GRID_SIZE - 2, col: GRID_SIZE - 2 };
        grid[startPos.row][startPos.col] = 2;
        grid[goalPos.row][goalPos.col] = 3;

        // Place obstacles and traffic lights
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] === 0) { // If the cell is empty
                    if (Math.random() < OBSTACLE_DENSITY) {
                        grid[r][c] = 1; // Obstacle
                    } else if (Math.random() < 0.05) {
                        grid[r][c] = 4; // Traffic Light
                    }
                }
            }
        }
        
        // Ensure a path exists. If not, this loop repeats.
        path = aStar(grid, startPos, goalPos).path;
    } while (!path);

    return { layout: grid, startPos, goalPos };
}