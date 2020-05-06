var cors = require("cors"),
  router = express.Router(),
  dotenv = require("dotenv"),
  sgMail = require("@sendgrid/mail");

import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import workshopRoutes from "../routes/workshops";
import customerRoutes from "../routes/customers";
import studentRoutes from "../routes/students";
import runCronJobs from "../modules/CheckCustomers";

const app = express();
app.use(cors());
app.use(compression());
app.use(morgan("tiny"));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "20mb"
  })
);
app.use(bodyParser.json({ limit: "20mb" }));

dotenv.config();

const fromEmailAddress = process.env.FROM_EMAIL_ADDRESS;
const toEmailAddress = process.env.TO_EMAIL_ADDRESS;
const sendGridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

router.get("/", (req, res) => {
  res.json({
    hello: "hi"
  });
});

router.get("/test", (req, res) => {
  res.json({
    hello: "test"
  });
});

router.post("/api/sendmail", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var company = req.body.company;
  var notebookList = req.body.notebookList;
  var bookingPeriod = req.body.bookingPeriod;

  var content = ` Name: ${name}\n Email ID: ${email}\n Company: ${company}\n Notebook List: ${notebookList}\n Booking Period: ${bookingPeriod}\n `;

  var mail = {
    from: fromEmailAddress,
    to: toEmailAddress, // Change to email address that you want to receive messages on
    subject: `New notebooks booking request from ${name}`,
    text: content
  };

  sgMail.send(mail, (err, data) => {
    if (err) {
      res.send("fail");
    } else {
      res.send("success");
    }
  });
});

// Model routes
app.use("/api", workshopRoutes);
app.use("/api", studentRoutes);
app.use("/api", customerRoutes);

app.use(express.json());
app.use("", router);
app.listen(3002, () => {
  console.log("Example app listening on port 3002!"); // eslint-disable-line no-console
  runCronJobs();
});

module.exports = app;
