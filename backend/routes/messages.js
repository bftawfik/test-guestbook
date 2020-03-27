const router = require("express").Router();

const Message = require("../models/message.model");

router.route("/add").post((req, res) => {
  const { body, userId, parentId } = req.body;
  if (!body || !userId || !parentId) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  const newMessage = new Message({ body, userId, parentId });
  newMessage
    .save()
    .then(message => {
      console.log(message);
      res.json({
        id: message._id,
        body: message.body,
        userId: message.userId,
        time: message.updatedAt,
        parentId: message.parentId
      });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/').get((req, res) => {
  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  const id = req.params.id;
  Message.findOneAndDelete({ _id: id })
    .then(message => {
      res.json(message ? message : "Message not found")
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;
