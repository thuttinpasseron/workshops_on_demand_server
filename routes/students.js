import express from "express";
import models from "../models";

const router = express.Router();

// Get students
router.get("/students", (req, res) => {
  models.student
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

// Get student by ID
router.get("/student/:id", (req, res) => {
  models.student
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Student Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Edit student
router.put("/student/edit/:id", (req, res) => {
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
router.delete("/student/delete/:id", (req, res) => {
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
