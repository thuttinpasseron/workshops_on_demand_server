import express from "express";
import models from "../models";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workshops
 *   description: Workshop management
 */

// Create a Workshop
/**
 * @swagger
 * path:
 *  /workshop:
 *    post:
 *      summary: Create a new workshop
 *      tags: [Workshops]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Workshop'
 *      responses:
 *        "200":
 *          description: A workshop schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workshop'
 */
router.post("/workshop", (req, res) => {
  models.workshop
    .create({ ...req.body, createdAt: new Date(), updatedAt: new Date() })
    .then(({ dataValues }) => res.status(200).send(dataValues))
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Get workshops
/**
 * @swagger
 * path:
 *  /workshops:
 *    get:
 *      summary: Returns a list of workshops.
 *      tags: [Workshops]
 *      responses:
 *        "200":
 *          description: A JSON array of workshop objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workshop'
 */
router.get("/workshops", (req, res) => {
  models.workshop
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

/**
 * @swagger
 * path:
 *  /workshop/{workshopId}:
 *    get:
 *      summary: Get a workshop by ID.
 *      tags: [Workshops]
 *      parameters:
 *        - in: path
 *          name: workshopId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the workshop
 *      responses:
 *        "200":
 *          description: An workshops object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workshop'
 */
// Get workshop by ID
router.get("/workshop/:id", (req, res) => {
  models.workshop
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Workshop Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

/**
 * @swagger
 * path:
 *  /workshop/edit/{workshopId}:
 *    put:
 *      summary: Update a workshop by ID.
 *      tags: [Workshops]
 *      parameters:
 *        - in: path
 *          name: workshopId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the workshop
 *      responses:
 *        "200":
 *          description: A Workshop object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workshop'
 */
// Edit workshop
router.put("/workshop/edit/:id", (req, res) => {
  models.workshop
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
 *  /workshop/delete/{workshopId}:
 *    delete:
 *      summary: Delete a workshop by ID.
 *      tags: [Workshops]
 *      parameters:
 *        - in: path
 *          name: workshopId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the workshop
 *      responses:
 *        "200":
 *          description: A Workshop object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workshop'
 */

// Delete workshop
router.delete("/workshop/delete/:id", (req, res) => {
  models.workshop
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
