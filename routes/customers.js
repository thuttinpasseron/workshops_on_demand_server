import express from "express";
import models from "../models";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
import dotenv from "dotenv";

dotenv.config();
const session_type_workshops_on_demand =
  process.env.SESSION_TYPE_WORKSHOPS_ON_DEMAND;
const session_type_coding_challenge = process.env.SESSION_TYPE_CODING_CHALLENGE;

const router = express.Router();

// end customer workshop trail in process.env.WORKSHOP_DURATION hours
const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(
    parseFloat(endDate.getHours()) + parseFloat(process.env.DURATION)
  );
  return { startDate, endDate };
};

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * path:
 *  /customers:
 *    get:
 *      summary: Returns a list of  customers.
 *      tags: [Customers]
 *      responses:
 *        "200":
 *          description: A JSON array of customer objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer'
 */
// Get customers
router.get("/customers", (req, res) => {
  models.customer
    .findAll({
      raw: true,
      order: [["id", "ASC"]],
    })
    .then((entries) => res.send(entries));
});

/**
 * @swagger
 * path:
 *  /customers/{customerId}:
 *    get:
 *      summary: Get a customer by ID.
 *      tags: [Customers]
 *      parameters:
 *        - in: path
 *          name: customerId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the  customer
 *      responses:
 *        "200":
 *          description: An customer object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer'
 */
// Get customer by ID
router.get("/customers/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Customer Not Found");
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

// Create a Customer
/**
 * @swagger
 * path:
 *  /customer:
 *    post:
 *      summary: Create a new customer
 *      tags: [Customers]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      responses:
 *        "200":
 *          description: A customer schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer'
 */
// Create customer
router.post("/customer", async (req, res) => {
  try {
    // check whether customer is already registered for another workshop

    const exisitingCustomer = await models.customer.findAll({
      where: {
        email: req.body.email,
        [op.or]: {
          active: true,
          lastEmailSent: {
            [op.in]: ["welcome", "credentials", "expiring"],
          },
        },
      },
    });
    if (exisitingCustomer.length > 0) {
      return res
        .status(202)
        .send(
          `You can only register for one of the ${req.body.sessionType} at a time. Please finish the current one and try again.`
        );
    }
    // fetch the customer requested workshop/challenge from workshops table
    let workshop;
    let studentRange = [0, 0];
    let studentCount = process.env.NO_OF_STUDENT_ACCOUNTS;
    if (
      req.body.sessionType &&
      (req.body.sessionType === session_type_workshops_on_demand ||
        req.body.sessionType === session_type_coding_challenge)
    ) {
      workshop = await models.workshop.findOne({
        where: { name: req.body.title },
      });
      studentRange = workshop.range;
      if (req.body.location && req.body.location === "grenoble") {
        studentRange[0] = studentRange[0] + parseInt(studentCount);
        studentRange[1] = studentRange[1] + parseInt(studentCount);
      }
    }
    // commented as challenges are added in workshops table
    // else if (
    //   req.body.sessionType &&
    //   req.body.sessionType === session_type_coding_challenge
    // ) {
    //   challenge = await models.challenge.findOne({
    //     where: { name: req.body.title },
    //   });
    //   studentRange = challenge.range;
    //   if (req.body.location && req.body.location === "grenoble") {
    //     studentRange[0] = studentRange[0] + parseInt(studentCount);
    //     studentRange[1] = studentRange[1] + parseInt(studentCount);
    //   }
    // }

    console.log("student range", studentRange);

    // fetch the unassigned student account to assign to the requested customer
    const student = await models.student.findOne({
      where: {
        assigned: {
          [op.eq]: false,
        },
        id: {
          [op.between]: studentRange,
        },
        location: {
          [op.eq]: req.body.location,
        },
      },
    });
    // return error if student account is not available else assign it to the customer
    if (student === null) {
      console.log("Student Account Not Available!");
      return res.status(202).send("Registration full, Please try again later");
    } else {
      console.log("customer req", req.body);
      var name = req.body.name;
      name = name
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      const dataValues = await models.customer.create({
        ...req.body,
        name: name,
        sessionName: req.body.title,
        hours: 4,
        ...getDates(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (dataValues) {
        await student.update({
          assigned: true,
        });
        await dataValues.update({
          studentId: student.id,
        });
        if (
          req.body.sessionType &&
          (req.body.sessionType === session_type_workshops_on_demand ||
            req.body.sessionType === session_type_coding_challenge)
        ) {
          await workshop.decrement("capacity");
        }
        // commented as challenges are added in workshops table
        // else if (
        //   req.body.sessionType &&
        //   req.body.sessionType === session_type_coding_challenge
        // ) {
        //   await challenge.decrement("capacity");
        // }
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

/**
 * @swagger
 * path:
 *  /customer/{customerId}:
 *    put:
 *      summary: Update a customer by ID.
 *      tags: [Customers]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      parameters:
 *        - in: path
 *          name: customerId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the customer
 *      responses:
 *        "200":
 *          description: A Customer object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer'
 */
// Edit customer
router.put("/customer/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      console.log("req.body", req.body);
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

/**
 * @swagger
 * path:
 *  /customer/{customerId}:
 *    delete:
 *      summary: Delete a  customer by ID.
 *      tags: [Customers]
 *      parameters:
 *        - in: path
 *          name: customerId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the customer
 *      responses:
 *        "200":
 *          description: A Customer object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer'
 */
// Delete customer
router.delete("/customer/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      entry.destroy().then(() => res.status(200).send({}));
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

export default router;
