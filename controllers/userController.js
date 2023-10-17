const { User, Thought } = require("../models");

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single user and populate thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate(
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //post a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID found" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.json(500).json(err);
    }
  },
};
