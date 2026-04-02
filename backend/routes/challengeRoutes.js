const express = require('express');
const { getChallenges, addChallenge, updateChallenge, deleteChallenge } = require('../controllers/challengeController');
const { protect , admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getChallenges).post(protect, admin, addChallenge);
router.route('/:id').put(protect, admin, updateChallenge).delete(protect, admin, deleteChallenge);

module.exports = router;
