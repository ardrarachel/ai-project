import { Router } from 'express';
import { generateRandomGrid } from '../services/gridGenerator.js';
import { bfs, ucs, aStar } from '../algorithms/pathfinding.js';

const router = Router();

// Endpoint to get a new random grid
router.get('/new-grid', (req, res) => {
    const gridData = generateRandomGrid();
    res.json(gridData);
});

// Endpoint to calculate a path for a given grid and algorithm
router.post('/calculate-path', (req, res) => {
    const { grid, algorithm, startPos, goalPos } = req.body;
    let result;
    switch (algorithm) {
        case 'bfs':
            result = bfs(grid, startPos, goalPos);
            break;
        case 'ucs':
            result = ucs(grid, startPos, goalPos);
            break;
        case 'astar':
            result = aStar(grid, startPos, goalPos);
            break;
        default:
            return res.status(400).json({ error: 'Invalid algorithm' });
    }
    res.json(result);
});

export default router;