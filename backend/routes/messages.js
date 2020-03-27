const router = require("express").Router();

const Message = require("../models/message.model");

router.route("/add").post((req, res) => {
  const { body, userId, parentId } = req.body;
  if (!body || !userId) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  const newMessage = new Message({ body, userId, parentId });
  newMessage
    .save()
    .then(message => {
      res.json({
        id: message._id,
        body: message.body,
        userId: message.userId,
        date: message.updatedAt
      });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/').get((req, res) => {
  Message.find()
    .then(messages => {
      res.json(
        messages.map(message => ({
          id: message._id,
          body: message.body,
          userId: message.userId,
          parentId: message.parentId,
          date: message.updatedAt
        }))
      )
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  const id = req.params.id;
  Message.findOneAndDelete({ _id: id })
    .then(message => {
      findChildren(message._id)
        
      res.json(message ? message : "Message not found")
    })
    

})

const deleteOne = function (id) {
  Message.findOneAndDelete({ _id: id })
    .then(message => {
      findChildren(message._id)
    })
}

const findChildren = function (id) {
  Message.find({ parentId: id })
    .then(messages => {
      messages.map(message => deleteOne(message._id))
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = router;
