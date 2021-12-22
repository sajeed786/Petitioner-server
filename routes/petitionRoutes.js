import express from 'express'

import { fetchRecentPetitions, fetchTrendingPetitions, fetchVictoriedPetitions } from '../controllers/petitionController.js';

const router = express.Router();

router.get('/petition-catalog-trending', fetchTrendingPetitions);
router.get('/petition-catalog-recent', fetchRecentPetitions);
router.get('/petition-catalog-victory', fetchVictoriedPetitions);

export default router;

