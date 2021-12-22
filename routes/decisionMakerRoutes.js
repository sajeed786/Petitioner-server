import express from 'express'

import { registerDecisionMaker, verifyDMEmail, resendOTP } from '../controllers/decisionMakerController.js';

const router = express.Router();

router.post('/register', registerDecisionMaker);
router.post('/verify-email', verifyDMEmail);
router.get('/resend/otp', resendOTP);


export default router;