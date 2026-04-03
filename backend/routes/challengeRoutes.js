const express = require('express');
const { getChallenges, addChallenge, updateChallenge, deleteChallenge , hideChallenge, getChallengeById} = require('../controllers/challengeController');
const { protect , admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getChallenges).post(protect, admin, addChallenge);
router.route('/:id').get(protect, getChallengeById).put(protect, admin, updateChallenge).delete(protect, admin, deleteChallenge);
router.route('/:id/hide').put(protect, admin, hideChallenge);

module.exports = router;
