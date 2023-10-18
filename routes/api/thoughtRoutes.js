const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtid/reactions
router.route("/:thoughtId/reactions").put(addReaction);

module.exports = router;
