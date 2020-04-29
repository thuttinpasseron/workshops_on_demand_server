import express from "express";
import models from "../models";
const Sequelize = require("sequelize");
const op = Sequelize.Op;

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
router.post("/customer/create", async (req, res) => {
  try {
    const student = await models.student.findOne({
      where: {
        assigned: {
          [op.eq]: false
        }
      }
    });
    if (student === null) {
      console.log("Student Account Not Available!");
      res.status(400).send({ error });
    } else {
      await student.update({
        assigned: true
      });
      console.log(student.id);
      console.log("customer req", req.body);
      //var content = ` Name: ${req.body.name}\n Email ID: ${req.body.email}\n Company: ${req.body.company}\n Workshop List: ${req.body.workshopList}\n Start Date: ${req.body.startDate}\n End Date: ${req.body.endDate}\n`;
      const dataValues = await models.customer.create({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await dataValues.update({
        studentId: student.id
      });
      const workshops = await models.workshop.findAll({
        //attributes: ['id'],
        where: {
          name: req.body.workshopList
        }
      });
      // const workshopIds = [];
      if (workshops.length > 0) {
        // workshops.map(workshop => {
        //   workshopIds.push(workshop.id);
        // });
        console.log("inside capacity decrement", workshops.length);
        await models.workshop.decrement("capacity", {
          where: { name: req.body.workshopList }
        });
        //await dataValues.save();
        res.status(200).send({});
      }
    }
  } catch (error) {
    res.status(400).send({ error });
  }
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
