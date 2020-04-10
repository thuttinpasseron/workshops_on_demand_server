var express = require("express"),
  serverless = require("serverless-http"),
  router = express.Router(),
  app = express(),
  cors = require("cors"),
  dotenv = require("dotenv"),
  sgMail = require("@sendgrid/mail");

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

router.post("/sendmail", (req, res, next) => {
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

module.exports.handler = serverless(app);

app.use(cors());
app.use(express.json());
app.use("/.netlify/functions/api", router);
