import { Router } from 'express';
import { getInitialGrid, calculatePath } from '../services/simulationService.js';

const router = Router();

// Endpoint to get the initial state of the map
// GET http://localhost:5001/api/grid
router.get('/grid', (req, res) => {
    const gridData = getInitialGrid();
    res.json(gridData);
});

// Endpoint to run a pathfinding algorithm
// POST http://localhost:5001/api/calculate-path
router.post('/calculate-path', (req, res) => {
    const { algorithm } = req.body; // e.g., 'bfs', 'astar'
    if (!algorithm) {
        return res.status(400).json({ error: 'Algorithm not specified' });
    }
    
    const result = calculatePath(algorithm);
    res.json(result);
});

export default router;