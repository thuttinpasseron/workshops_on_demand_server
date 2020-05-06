import express from "express";
import models from "../models";

const router = express.Router();

// Get workshops
router.get("/workshops", (req, res) => {
  models.workshop
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

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
