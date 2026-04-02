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
    difficulty: { type: String, enum: ['easy','medium','hard'], required: true },
    category: { type: String, enum: ['data structure', 'algorithm'], required: true },
    releaseDate: { type: Date, required: true},
    released: {type: Boolean}
});

module.exports = mongoose.model('Challenge', challengeSchema);
