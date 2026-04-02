const Challenge = require('../models/Challenge');

const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({ released: true });
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addChallenge = async (req, res) => {
    const { title, description, deadline } = req.body;
    try {
        const challenge = await Challenge.create({ userId: req.user.id, title, description, deadline });
        res.status(201).json(challenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateChallenge = async (req, res) => {
    const { title, description, completed, deadline } = req.body;
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        challenge.title = title || challenge.title;
        challenge.description = description || challenge.description;
        challenge.completed = completed ?? challenge.completed;
        challenge.deadline = deadline || challenge.deadline;

        const updatedChallenge = await challenge.save();
        res.json(updatedChallenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        await challenge.remove();
        res.json({ message: 'Challenge deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getChallenges, addChallenge, updateChallenge, deleteChallenge };