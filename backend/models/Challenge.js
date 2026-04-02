const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    description: { type: String, required: true },
    example: { type: String, required: true },
    sampleInputSet: { type: String, required: true },
    sampleOutputSet: { type: String, required: true },
    constraints: {type: String},
    sampleSolution: { type: String},
    unitTestSet: { type: String, required: true },
    difficulty: { type: String, enum: ['easy','medium','hard'], required: true },
    category: { type: String, required: true },
    releaseTime: { type: Date, required: true},
    released: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Challenge', challengeSchema);
