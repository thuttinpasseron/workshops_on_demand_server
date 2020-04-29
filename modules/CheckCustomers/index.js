import cron from "cron";
import models from "../../models";
import createEmailBody from "../Email/createEmailBody";
import sendEmail from "../Email";

const { CronJob } = cron;

const getDaysLeft = ends => {
  const oneDay = 24 * 60 * 60 * 1000;
  const endsDate = new Date(ends);
  const today = new Date();
  return Math.round((endsDate.getTime() - today.getTime()) / oneDay);
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const checkCustomer = () => {
  models.customer
    .findAll({ include: [{ all: true, nested: true }] })
    .then(customers =>
      customers.map(customer => {
        // eslint-disable-line array-callback-return
        const { dataValues } = customer;
        const customerStatus = dataValues.active;
        const endDate = new Date(dataValues.endDate);
        const daysLeft = getDaysLeft(dataValues.endDate);
        console.log("last email sent", dataValues.lastEmailSent);
        console.log("student id check", dataValues.studentId);

        // Send welcome email.
        if (!dataValues.lastEmailSent && dataValues.studentId != null) {
          console.log("send welcome email");
          return sendEmail({
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
          }).then(() => {
            customer.update({
              lastEmailSent: "welcome"
            });
          });
        }

        // Send workshop credentilas as soon as there are ready.
        if (customerStatus && dataValues.lastEmailSent === "welcome") {
          console.log("send workshops credentials email");
          return sendEmail({
            recipient: dataValues.email,
            subject: "Your HPE Workshops On Demand credentials",
            content: createEmailBody({
              heading: "Your HPE Workshops On Demand credentials",
              content: `Your access to the workshops will end on ${
                monthNames[endDate.getMonth()]
              } ${endDate.getDate()}, ${endDate.getFullYear()}.`,
              buttonLabel: "View HPE Workshops",
              buttonUrl: dataValues.student.url,
              userName: dataValues.student.username,
              password: dataValues.student.password
            })
          }).then(() => {
            customer.update({
              lastEmailSent: "credentials"
            });
          });
        }

        // Send expired email.
        if (daysLeft <= 0 && dataValues.lastEmailSent === "credentials") {
          console.log("send expired email");
          return sendEmail({
            recipient: dataValues.email,
            subject: "Your HPE Workshops On Demand trial has ended",
            content: createEmailBody({
              heading: "Thanks for trying HPE Workshops On Demand!",
              content:
                "We hope your enjoyed your HPE Workshops On Demand trial.",
              buttonLabel: "Click here to Provide the Feedback",
              buttonUrl:
                "https://forms.office.com/Pages/ResponsePage.aspx?id=YSBbEGm2MUuSrCTTBNGV3KiKnXK8thhKg7iBfJh46UlUQzFEUUVGMVVQMEowMElUMVY3WkVUU0pWVi4u"
            })
          }).then(() => {
            customer.update({
              lastEmailSent: "expired",
              active: false
            });
            customer.student.update({
              assigned: false
            });
          });
        }
        return undefined;
      })
    );
};

const runCronJobs = () => {
  const jobToCheckCustomers = new CronJob({
    // cronTime: '00 00 * * * *', // every hour
    cronTime: "*/20 * * * * *", // every 20 seconds
    // onTick: checkCustomer(),
    onTick: () => checkCustomer(),
    runOnInit: true
  });

  jobToCheckCustomers.start();
};

export default runCronJobs;
