import express from 'express';
import request from 'request';

const router = express.Router();
const apiKey = process.env.SENDGRID_API_KEY;

const addUserToList = (userId, listId) =>
  new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${userId}`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        debug('Email error:', error);
        debug('Email error body:', body);
        return reject(error);
      }
      return resolve(body);
    });
  });

router.post('/emails', (req, res) => {
  const { email, listId } = req.body;

  if (!apiKey) {
    debug('Email capture:', 'No sendgrid API key found.');
    return res.status(400).send('No sendgrid API key found.');
  }
  if (!email) {
    debug('Email capture:', 'No email.');
    return res.status(400).send('An email is required.');
  }

  const options = {
    method: 'POST',
    url: 'https://api.sendgrid.com/v3/contactdb/recipients',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: [
      {
        email,
      },
    ],
    json: true,
  };

  return request(options, (error, response, body) => {
    if (error) {
      debug('Email error:', error);
      debug('Email error body:', body);
      return res.status(400).send();
    }
    if (listId && body && body.persisted_recipients) {
      return addUserToList(body.persisted_recipients[0], listId)
        .then(() => res.status(200).send(body))
        .catch(() => res.status(400).send);
    }

    return res.status(200).send(body);
  });
});

router.get('/email/random/:listId', (req, res) => {
  const { listId } = req.params;
  const options = {
    method: 'GET',
    url: `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
  };

  return request(options, (error, response, body) => {
    if (error) {
      debug('Email error:', error);
      debug('Email error body:', body);
      return res.status(400).send();
    }

    const responseBody = JSON.parse(response.body);
    if (responseBody && responseBody.recipients) {
      const { recipients } = responseBody;
      if (!recipients || !Array.isArray(recipients) || recipients.length < 1) {
        return res.status(400).send();
      }

      const recipientsLength = recipients.length;
      const randomIndex = Math.floor(Math.random() * recipientsLength) + 0;
      return res.status(200).send(recipients[randomIndex]);
    }

    return res.status(400).send();
  });
});

export default router;
