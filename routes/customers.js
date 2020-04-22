import express from "express";
import models from "../models";

const router = express.Router();

// Get customers
router.get("/customers", (req, res) => {
  models.customer
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

// Create customer
router.post("/customer/create", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var company = req.body.company;
  var notebookList = req.body.notebookList;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  var content = ` Name: ${name}\n Email ID: ${email}\n Company: ${company}\n Notebook List: ${notebookList}\n Start Date: ${startDate}\n  End Date: ${endDate}`;

  var mail = {
    from: fromEmailAddress,
    to: toEmailAddress, // Change to email address that you want to receive messages on
    subject: `New notebooks booking request from ${name}`,
    text: content
  };
  console.log("customer req", req.body);
  models.customer
    .create({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      workshopList: req.body.workshopList.toString(),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(({ req }) => {
      res.status(200).send({});
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Edit customer
router.post("/customer/edit/:id", (req, res) => {
  models.customer
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

// Delete customer
router.post("/customer/delete/:id", (req, res) => {
  models.customer
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
