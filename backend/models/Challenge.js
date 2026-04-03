const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    description: { type: String, required: true },
    example: { type: String, required: true },
    sampleInputSet: { type: String, required: true },
    sampleOutputSet: { type: String, required: true },
    constraints: {type: String, default: null },
    sampleSolution: { type: String},
    unitTestSet: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy','Medium','Hard'], required: true },
    category: { type: String, enum: ['Data structure', 'Algorithm'], required: true },
    releaseDate: { type: Date, required: true},
    released: {type: Boolean}
});

module.exports = mongoose.model('Challenge', challengeSchema);
