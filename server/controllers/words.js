const User = require('../models/User.js');

module.exports = {
  updateProgress: async (req, res) => {
    try {
      const { id: wordId } = req.params;
      const { direction } = req.body;

      const updateField = direction === 'sourceToTarget' ? 'words.$.sourceToTargetProgress' : 'words.$.targetToSourceProgress';

      const updatedUser = await User.findOneAndUpdate(
        { 'words._id': wordId },
        {
          $set: {
            [updateField]: 100
          }
        },
        { new: true }
      );
      const updatedWord = updatedUser.words.find(word => word._id.toString() === wordId);
      res.json(updatedWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
};