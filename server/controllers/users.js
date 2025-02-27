const { v4: uuidv4 } = require('uuid');
const User = require('../models/User.js');

module.exports = {
  get: async (req, res) => {
    const sessionId = req.cookies.session_id;

    if(!sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findOne({ sessionId });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  },
  create: async (req, res) => {
    const { firstName } = req.body;
    const sessionId = uuidv4();

    try {
      const newUser = await User.create({
        firstName,
        sessionId
      });

      res.cookie('session_id', sessionId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  addExcerpt: async (req, res) => {
    console.log('test')
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, {
          $push: {
            excerpts: { title, content }
          }
        }, { new: true });
        res.status(201).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  addWordToDictionary: async (req, res) => {
    try {
      const { id } = req.params;
      const { word, translation, excerptId } = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, {
        $push: {
          words: { word, translation, excerptId }
        }
      }, { new: true });
      res.status(201).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};