import express from "express";
import models from "../models";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Challenges
 *   description: Hackshack Challenge management
 */

// Create a Challenge
/**
 * @swagger
 * path:
 *  /challenge:
 *    post:
 *      summary: Create a new challenge
 *      tags: [Challenges]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Challenge'
 *      responses:
 *        "200":
 *          description: A challenge schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Challenge'
 */
router.post("/challenge", (req, res) => {
  models.challenge
    .create({ ...req.body, createdAt: new Date(), updatedAt: new Date() })
    .then(({ dataValues }) => res.status(200).send(dataValues))
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Get challenges
/**
 * @swagger
 * path:
 *  /challenges:
 *    get:
 *      summary: Returns a list of challenges.
 *      tags: [Challenges]
 *      responses:
 *        "200":
 *          description: A JSON array of challenge objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Challenge'
 */
router.get("/challenges", (req, res) => {
  models.challenge
    .findAll({
      raw: true,
      order: [["name", "ASC"]]
    })
    .then(entries => res.send(entries));
});

/**
 * @swagger
 * path:
 *  /challenges/{challengeId}:
 *    get:
 *      summary: Get a challenge by ID.
 *      tags: [Challenges]
 *      parameters:
 *        - in: path
 *          name: challengeId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the challenge
 *      responses:
 *        "200":
 *          description: An challenges object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Challenge'
 */
// Get challenges by ID
router.get("/challenges/:id", (req, res) => {
  models.challenge
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Challenge Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

/**
 * @swagger
 * path:
 *  /challenge/{challengeId}:
 *    put:
 *      summary: Update a challenge by ID.
 *      tags: [Challenges]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Challenge'
 *      parameters:
 *        - in: path
 *          name: challengeId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the challenge
 *      responses:
 *        "200":
 *          description: A Challenge object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Challenge'
 */
// Edit challenge
router.put("/challenge/:id", (req, res) => {
  models.challenge
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});
/**
 * @swagger
 * path:
 *  /challenge/{challengeId}:
 *    delete:
 *      summary: Delete a challenge by ID.
 *      tags: [Challenges]
 *      parameters:
 *        - in: path
 *          name: challengeId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the challenge
 *      responses:
 *        "200":
 *          description: A Challenge object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Challenge'
 */

// Delete challenge
router.delete("/challenge/:id", (req, res) => {
  models.challenge
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      entry.destroy().then(() => res.status(200).send({}));
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

export default router;
