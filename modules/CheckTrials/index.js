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

const checkTrial = () => {
  models.trial
    .findAll({ include: [{ all: true, nested: true }] })
    .then(trials =>
      trials.map(trial => {
        // eslint-disable-line array-callback-return
        const { dataValues } = trial;
        const daysLeft = getDaysLeft(dataValues.end);
        const endDate = new Date(dataValues.end);

        // Send welcome email.
        if (!dataValues.lastEmailSent) {
          return sendEmail({
            recipient: dataValues.customer.emailAddress,
            subject: "Welcome to HPE Workshops On Demand",
            content: createEmailBody({
              heading: "Welcome to HPE Workshops On Demand!",
              content: `
              Your trial will end on ${
                monthNames[endDate.getMonth()]
              } ${endDate.getDate()}, ${endDate.getFullYear()}.
              You can access your OneSphere trial by clicking the button bellow and using one of the following credentials:</br></br>
              User: <a style="color: #333333">rollie@hpeonesphere.net</a></br>
              Password: ${dataValues.sandbox.password}</br></br>
            `,
              buttonLabel: "View HPE OneSphere Trial",
              buttonUrl: dataValues.sandbox.url
            })
          }).then(() => {
            trial.update({
              lastEmailSent: "welcome"
            });
          });
        }

        // Send expiring soon email.
        if (daysLeft <= 2 && dataValues.lastEmailSent === "welcome") {
          return sendEmail({
            recipient: dataValues.customer.emailAddress,
            subject: "Your HPE OneSphere trial is ending soon",
            content: createEmailBody({
              heading: "Your HPE OneSphere trial is ending soon",
              content: `Your trial will end on ${
                monthNames[endDate.getMonth()]
              } ${endDate.getDate()}, ${endDate.getFullYear()}.`,
              buttonLabel: "View HPE OneSphere Trial",
              buttonUrl: dataValues.sandbox.url
            })
          }).then(() => {
            trial.update({
              lastEmailSent: "expiring"
            });
          });
        }

        // Send expired email.
        if (daysLeft <= 0 && dataValues.lastEmailSent === "expiring") {
          return sendEmail({
            recipient: dataValues.customer.emailAddress,
            subject: "Your HPE OneSphere trial has ended",
            content: createEmailBody({
              heading: "Thanks for trying HPE OneSphere!",
              content: "We hope your enjoyed your HPE OneSphere trial."
            })
          }).then(() => {
            trial.update({
              lastEmailSent: "expired"
            });
          });
        }
        return undefined;
      })
    );
};

const runCronJobs = () => {
  const jobToCheckTrials = new CronJob({
    // cronTime: '00 00 * * * *', // every hour
    cronTime: "*/20 * * * * *", // every 20 seconds
    // onTick: checkTrial(),
    onTick: () => checkTrial(),
    runOnInit: true
  });

  jobToCheckTrials.start();
};

export default runCronJobs;
