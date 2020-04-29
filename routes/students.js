import express from "express";
import models from "../models";

const router = express.Router();

// Get students
router.get("/students", (req, res) => {
  models.Workshop.findAll({
    raw: true
  }).then(entries => res.send(entries));
});

// Edit student
router.post("/student/edit/:id", (req, res) => {
  models.student
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

// Delete student
router.post("/student/delete/:id", (req, res) => {
  models.student
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
