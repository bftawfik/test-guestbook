const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const User = require('../models/user.model');


router.route('/add').post((req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400).json({msg: 'Please enter all fields'});
  }

  User.findOne({email})
  .then(user => {
    if(user){
      res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({ email, username, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if(err) throw err;
                res.json({
                  msg: 'User added Successfully',
                  token,
                  user: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                  }
                }) 
              })
              }
            )
          .catch(err => res.status(400).json('Error: ' + err))
      })
    })

  })
})

router.route('/login').post((req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).json({ msg: 'User does not exist' });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) res.status(400).json({ msg: 'Invalid credentials' });
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, 
            (err, token) => {
              if (err) throw err;
              res.json({
                msg: 'User logged in successfully',
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  username: user.username
                }
              })
            })
        })
    })
})

router.get('/auth', auth, (req, res) => {
  
  User.findById(req.user.id)
   .select('-password')
   .then(user => {
      const { _id: id, email, username } = user;
      res.json({ id, email, username });
    });
})

module.exports = router;