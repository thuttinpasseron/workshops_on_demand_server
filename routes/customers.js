import express from "express";
import models from "../models";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// end customer workshop trail in process.env.WORKSHOP_DURATION hours
const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(
    parseFloat(endDate.getHours()) + parseFloat(process.env.WORKSHOP_DURATION)
  );
  return { startDate, endDate };
};

// Get customers
router.get("/customers", (req, res) => {
  models.customer
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

// Get customer by ID
router.get("/customer/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Customer Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Create customer
router.post("/customer/create", async (req, res) => {
  try {
    // check whether customer is already registered for another workshop
    const count = await models.customer.count({
      where: {
        email: req.body.email
      }
    });
    console.log("count", count);
    if (count >= 2) {
      res
        .status(202)
        .send(
          "You can only register for two workshops at a time, please finish the current workshop and try again!"
        );
      return;
    }
    // fetch the customer requested workshop from workshops table
    const workshop = await models.workshop.findOne({
      where: { name: req.body.workshop }
    });

    // fetch the unassigned student account to assign to the requested customer
    const student = await models.student.findOne({
      where: {
        assigned: {
          [op.eq]: false
        }
      }
    });
    // return error if student account is not available else assign it to the customer
    if (student === null) {
      console.log("Student Account Not Available!");
      res.status(202).send("Registration full, try again tomorrow");
      return;
    } else {
      console.log("customer req", req.body);
      const dataValues = await models.customer.create({
        ...req.body,
        hours: 4,
        ...getDates(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      if (dataValues) {
        await student.update({
          assigned: true
        });
        await dataValues.update({
          studentId: student.id
          // workshopId: workshop.id
        });
        await workshop.decrement("capacity");
        //await dataValues.save();
        res.status(200).send({});
      }
    }
    // }
  } catch (error) {
    console.log("error in catch!", error);
    res.status(400).send({ error });
  }
});

// Edit customer
router.put("/customer/edit/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      console.log("req.body", req.body);
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Delete customer
router.delete("/customer/delete/:id", (req, res) => {
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
