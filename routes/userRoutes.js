import express from 'express';
import multer from 'multer';
import storage from '../middleware/imgUpload.js';

import {signup, login, fblogin, activateAccount, submitPetition, getPetitionRecipients, getPetitionCategories, getStartedPetitions, getSignedPetitions } from '../controllers/userController.js';

const upload = multer({storage: storage});

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate', activateAccount);
router.post('/fblogin', fblogin);
router.post('/submit-petition', upload.single("petitionMedia"), submitPetition);
router.get('/petition-recipients', getPetitionRecipients);
router.get('/petition-categories', getPetitionCategories);
router.get('/:id/started-petitions', getStartedPetitions);
router.get('/:id/signed-petitions', getSignedPetitions);

export default router