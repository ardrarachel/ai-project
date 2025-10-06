// A simple Priority Queue implementation for UCS and A*
class PriorityQueue {
    constructor() { this.elements = []; }
    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }
    dequeue() { return this.elements.shift().element; }
    isEmpty() { return this.elements.length === 0; }
}

function getNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;
    const directions = [{ r: -1, c: 0 }, { r: 1, c: 0 }, { r: 0, c: -1 }, { r: 0, c: 1 }];
    for (const dir of directions) {
        const newRow = row + dir.r;
        const newCol = col + dir.c;
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && grid[newRow][newCol] !== 1) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }
    return neighbors;
}

function reconstructPath(cameFrom, goal) {
    let current = goal;
    const path = [];
    while (current) {
        path.push(current);
        current = cameFrom[`${current.row},${current.col}`];
    }
    return path.reverse();
}

function manhattanDistance(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// --- BREADTH-FIRST SEARCH (BFS) ---
export function bfs(grid, start, goal) {
    const queue = [start];
    const cameFrom = { [`${start.row},${start.col}`]: null };
    let nodesExplored = 0;
    while (queue.length > 0) {
        const current = queue.shift();
        nodesExplored++;
        if (current.row === goal.row && current.col === goal.col) {
            const path = reconstructPath(cameFrom, goal);
            return { path, stats: { name: 'BFS', cost: path.length - 1, explored: nodesExplored } };
        }
        for (const neighbor of getNeighbors(grid, current)) {
            const neighborId = `${neighbor.row},${neighbor.col}`;
            if (cameFrom[neighborId] === undefined) {
                cameFrom[neighborId] = current;
                queue.push(neighbor);
            }
        }
    }
    return { path: null, stats: { name: 'BFS', explored: nodesExplored, cost: -1 } };
}

// --- UNIFORM COST SEARCH (UCS) ---
export function ucs(grid, start, goal) {
    const frontier = new PriorityQueue();
    frontier.enqueue(start, 0);
    const cameFrom = { [`${start.row},${start.col}`]: null };
    const costSoFar = { [`${start.row},${start.col}`]: 0 };
    let nodesExplored = 0;
    while (!frontier.isEmpty()) {
        const current = frontier.dequeue();
        nodesExplored++;
        if (current.row === goal.row && current.col === goal.col) {
            const path = reconstructPath(cameFrom, goal);
            return { path, stats: { name: 'UCS', cost: costSoFar[`${current.row},${current.col}`], explored: nodesExplored } };
        }
        for (const neighbor of getNeighbors(grid, current)) {
            const newCost = costSoFar[`${current.row},${current.col}`] + 1; // Cost of 1 per step
            const neighborId = `${neighbor.row},${neighbor.col}`;
            if (costSoFar[neighborId] === undefined || newCost < costSoFar[neighborId]) {
                costSoFar[neighborId] = newCost;
                frontier.enqueue(neighbor, newCost);
                cameFrom[neighborId] = current;
            }
        }
    }
    return { path: null, stats: { name: 'UCS', explored: nodesExplored, cost: -1 } };
}

// --- A* SEARCH ---
export function aStar(grid, start, goal) {
    const frontier = new PriorityQueue();
    frontier.enqueue(start, 0);
    const cameFrom = { [`${start.row},${start.col}`]: null };
    const costSoFar = { [`${start.row},${start.col}`]: 0 };
    let nodesExplored = 0;
    while (!frontier.isEmpty()) {
        const current = frontier.dequeue();
        nodesExplored++;
        if (current.row === goal.row && current.col === goal.col) {
            const path = reconstructPath(cameFrom, goal);
            return { path, stats: { name: 'A*', cost: costSoFar[`${current.row},${current.col}`], explored: nodesExplored } };
        }
        for (const neighbor of getNeighbors(grid, current)) {
            const newCost = costSoFar[`${current.row},${current.col}`] + 1;
            const neighborId = `${neighbor.row},${neighbor.col}`;
            if (costSoFar[neighborId] === undefined || newCost < costSoFar[neighborId]) {
                costSoFar[neighborId] = newCost;
                const priority = newCost + manhattanDistance(neighbor, goal);
                frontier.enqueue(neighbor, priority);
                cameFrom[neighborId] = current;
            }
        }
    }
    return { path: null, stats: { name: 'A*', explored: nodesExplored, cost: -1 } };
}