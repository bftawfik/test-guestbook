const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  }
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;