const { User, Thought } = require("../models");

module.exports = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single thought by ID
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create new thought and push thought id to user thoughts
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
      //ensure that the thought id is pushed!!!!!!!!!!!
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
