const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_lenght: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
