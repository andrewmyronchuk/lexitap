const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  excerptId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sourceToTargetProgress: {
    type: Number,
    default: 0
  },
  targetToSourceProgress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const excerptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  words: [wordSchema],
  excerpts: [excerptSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;