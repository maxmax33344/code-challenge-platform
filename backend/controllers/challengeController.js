const Challenge = require('../models/Challenge');

const getChallenges = async (req, res) => {
    try {
        let challenges;

        if(req.user.role === 'admin') {
            challenges = await Challenge.find();
        } else {
           challenges = await Challenge.find({ released: true });
        }
        
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
        res.json(challenge);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

const addChallenge = async (req, res) => {
    const { name, description, example, sampleInputSet, sampleOutputSet, constraints, unitTestSet, difficulty, category, releaseDate } = req.body;
    const today = new Date();
    const releaseDateObj = new Date(releaseDate);
    try {
        const released = releaseDateObj <= today;
        const challenge = await Challenge.create({ name, description, example, sampleInputSet, sampleOutputSet, constraints, unitTestSet, difficulty, category, releaseDate, released });
        res.status(201).json(challenge);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


const updateChallenge = async (req, res) => {
    const { name, description, example, sampleInputSet, sampleOutputSet, constraints, unitTestSet, difficulty, category, releaseDate } = req.body;
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        challenge.name = name || challenge.name;
        challenge.description = description || challenge.description;
        challenge.example = example || challenge.example;
        challenge.sampleInputSet = sampleInputSet || challenge.sampleInputSet;
        challenge.sampleOutputSet = sampleOutputSet || challenge.sampleOutputSet;
        challenge.constraints = constraints || challenge.constraints;
        challenge.unitTestSet = unitTestSet || challenge.unitTestSet;
        challenge.difficulty = difficulty || challenge.difficulty;
        challenge.category = category || challenge.category;
        challenge.releaseDate = releaseDate || challenge.releaseDate;

        const today = new Date();
        const releaseDateObj = new Date(releaseDate);
        challenge.released = releaseDateObj <= today;

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

const hideChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
        challenge.releaseDate = new Date('2999-01-30');
        challenge.released = false;

        await challenge.save();
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { getChallenges, addChallenge, updateChallenge, deleteChallenge, hideChallenge, getChallengeById};