// This helper function reconstructs the path by tracing back from the goal
function reconstructPath(cameFrom, start, goal) {
    let current = goal;
    const path = [];
    while (current.row !== start.row || current.col !== start.col) {
        path.push(current);
        current = cameFrom[`${current.row},${current.col}`];
    }
    path.push(start);
    return path.reverse(); // Reverse to get path from start to goal
}

/**
 * A complete Breadth-First Search (BFS) implementation.
 * It explores the grid layer by layer to find the shortest path in terms of steps.
 */
export function bfs(grid, start, goal) {
    const queue = [start]; // A queue of nodes to visit
    const cameFrom = { [`${start.row},${start.col}`]: null }; // To track the path
    let nodesExplored = 0;

    while (queue.length > 0) {
        const current = queue.shift(); // Get the first node in the queue
        nodesExplored++;

        if (current.row === goal.row && current.col === goal.col) {
            // Goal reached! Reconstruct and return the path.
            const path = reconstructPath(cameFrom, start, goal);
            const stats = { name: 'BFS', cost: path.length - 1, explored: nodesExplored };
            return { path, stats };
        }

        // Check all neighbors (up, down, left, right)
        const neighbors = [
            { row: current.row - 1, col: current.col },
            { row: current.row + 1, col: current.col },
            { row: current.row, col: current.col - 1 },
            { row: current.row, col: current.col + 1 },
        ];

        for (const neighbor of neighbors) {
            const neighborId = `${neighbor.row},${neighbor.col}`;

            // Check if the neighbor is valid and has not been visited
            if (
                neighbor.row >= 0 && neighbor.row < grid.length && // Inside grid vertically
                neighbor.col >= 0 && neighbor.col < grid[0].length && // Inside grid horizontally
                grid[neighbor.row][neighbor.col] !== 1 && // Not an obstacle
                !cameFrom[neighborId] // Not already visited
            ) {
                cameFrom[neighborId] = current; // Remember the path
                queue.push(neighbor); // Add neighbor to the queue to visit later
            }
        }
    }

    // If the queue becomes empty and goal was not found
    return { path: null, stats: { name: 'BFS', explored: nodesExplored, cost: -1 } };
}

// --- Stubs for other algorithms (we can implement these next) ---
export function ucs(grid, start, goal) {
    console.log("UCS algorithm called (not implemented yet).");
    return { path: [start, goal], stats: { name: 'UCS', cost: 1, explored: 2 } };
}

export function aStar(grid, start, goal) {
    console.log("A* algorithm called (not implemented yet).");
    return { path: [start, goal], stats: { name: 'A*', cost: 1, explored: 2 } };
}