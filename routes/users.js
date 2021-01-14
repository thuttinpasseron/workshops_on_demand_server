import express from 'express';
import models from '../models';
const bcrypt = require('bcrypt');

const router = express.Router();

// Get users
router.get('/users', (req, res) => {
  models.user
    .findAll({
      raw: true,
      order: [['id', 'ASC']],
    })
    .then((entries) => res.send(entries));
});

// Get user by ID
router.get('/users/:id', (req, res) => {
  models.user
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send('User Not Found');
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

// Create user
router.post('/user', async (req, res) => {
  try {
    // check whether user is already registered for another workshop

    const exisitingUser = await models.user.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (exisitingUser.length > 0) {
      return res.status(202).send(`User already exist.`);
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const name = req.body.name
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    const dataValues = await models.user.create({
      ...req.body,
      name: name,
      password: hashpassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).send({
      id: dataValues.id,
      name: dataValues.name,
      email: dataValues.email,
    });
    // }
  } catch (error) {
    console.log('error in catch!', error);
    res.status(400).send({ error });
  }
});

// Edit user
router.put('/user/:id', (req, res) => {
  models.user
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

// Delete user
router.delete('/user/:id', (req, res) => {
  models.user
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      entry.destroy().then(() => res.status(200).send({}));
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

export default router;
