import express from 'express';
import models from '../models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user == null) {
      return res.status(404).send('Cannot find a user');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      jwt.sign(
        { user },
        'secretkey',
        // {
        //   expiresIn: 900, // expires in 15 minutes
        // },
        (err, token) => {
          res.status(200).send({
            token,
          });
        }
      );
    } else {
      res.status(401).send('Not Allowed');
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

export default router;
