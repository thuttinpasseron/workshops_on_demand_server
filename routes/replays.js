import express from "express";
import models from "../models";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Replays
 *   description: Hackshack Replay management
 */

// Get replays
/**
 * @swagger
 * path:
 *  /replays:
 *    get:
 *      summary: Returns a list of replays.
 *      tags: [Replays]
 *      responses:
 *        "200":
 *          description: A JSON array of replay objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Replay'
 */
router.get("/replays", (req, res) => {
  models.replays
    .findAll({
      order: [["id", "ASC"]],
      include: {
        model: models.workshop, 
        attributes:['notebook', 'sessionType', 'location', 'capacity', 'name', 'badgeImg']
      }
    })
    .then(entries => (res.send(entries)));
});

export default router;