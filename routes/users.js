const express = require('express');
const bcrypt = require('bcrypt');
const { addUser, getUserByEmail, getUserById, updatePassword, updateUser, getUsers } = require('../data/users');
const jwt = require('jsonwebtoken');
const { validate } = require('../middlewares/validation');
const { NewUserValidationSchema, LogInValidationSchema, updateUserValidationSchema } = require('./usersSchemas');
const { isSameUser, auth } = require('../middlewares/auth');

const router = express.Router();


router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  if (user.role !== 'admin') {
    res.status(403).send({ message: 'Only admin can get all products' });
    return;
  }
  const users = await getUsers();
  res.send({ users });
});

router.post('/login', 
  validate(LogInValidationSchema),
  async (req, res, next) => {
    const { email, password } = req.body.data;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).send('User not found with this email');
      return;
    }
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) next(err);
      else {
        if (result) {
          const token = jwt.sign({ id: user.id }, 'lkja89jdfopaw98mudwa3');
          res.send({
            token,
            user: {
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              created_date: user.created_date,
              phoneNumber: user.phone_number,
              id: user.id,
              role: user.role
            }
          });
        } else {
          res.status(401).send('Incorrect password');
        }
      }
    });
  })

  router.post('/signup', 
  validate(NewUserValidationSchema),
  async (req, res, next) => {
    const { email, password, password2, firstName, lastName, phoneNumber } = req.body.data;
    if (password !== password2) 
        res.status(404).send('Passwords need to match');
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        next(err);
      } else {
        await addUser(email, hash, firstName, lastName, phoneNumber);
        res.send({ user: { email } });
      }
    })
  });
  
  // get user via user id
  router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if(!user) {
      res.status(404).send({ message: 'Bad user ID' });
      return;
    }
    res.send({ user });
  });

  // get user via user id including pets
  router.get('/:userId', (req, res, next) => {

  });

  // update user only via user himself
  router.put('/:userId',
  auth,
  isSameUser,
  validate(updateUserValidationSchema),
  async (req, res, next) => {
    const { email, password, password2, firstName, lastName, phoneNumber } = req.body.data; 
    if (!password) {
      await updateUser(email, firstName, lastName, phoneNumber, req.params.userId);
      res.status(201).send({message: "updated successfully"});
    } else {
      if (password !== password2) 
          res.status(404).send('Passwords need to match');
        else {
          bcrypt.hash(password, 10, async (err, hash) => {
          if (err) next(err);
          else {
            await updatePassword(hash, req.params.userId);
            await updateUser(email, firstName, lastName, phoneNumber, req.params.userId);
            res.status(201).send({message: "updated successfully"});
          }
          });
         }
        }
    });

  
module.exports = router;