import express from "express";
import models from "../models";
import sendEmail from "../modules/Email";
import createEmailBody from "../modules/Email/createEmailBody";

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
    console.log("customer req", req.body);
    //var content = ` Name: ${req.body.name}\n Email ID: ${req.body.email}\n Company: ${req.body.company}\n Workshop List: ${req.body.workshopList}\n Start Date: ${req.body.startDate}\n End Date: ${req.body.endDate}\n`;
    const dataValues = await models.customer.create({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      workshopList: req.body.workshopList.toString(),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await sendEmail({
      recipient: dataValues.email,
      subject: "Welcome to HPE Workshops On Demand",
      content: createEmailBody({
        heading: "Welcome to HPE Workshops On Demand!",
        content: `
      Hi ${dataValues.name},</br>
      Your request for the following workshop(s) has been received. We will send you the access details soon in a seperate email</br>
      Workshop List: ${dataValues.workshopList}</br>
      Start Date: ${dataValues.startDate}</br>
      End Date: ${dataValues.endDate}
      </br></br>
    `
      })
    });
    await dataValues.update({
      lastEmailSent: "welcome"
    });
    //await dataValues.save();
    res.status(200).send({});
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
